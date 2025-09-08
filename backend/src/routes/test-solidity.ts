import { Router, Request, Response } from 'express';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { PrismaClient } from '@prisma/client'; // Import PrismaClient

const prisma = new PrismaClient(); // Instantiate PrismaClient

const router = Router();

const mkdtempAsync = promisify(fs.mkdtemp);
const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);
const rmAsync = promisify(fs.rm);
const mkdirAsync = promisify(fs.mkdir);

const execCommand = (command: string, cwd: string): Promise<{ stdout: string; stderr: string }> => {
    return new Promise((resolve, reject) => {
        exec(command, { cwd }, (error, stdout, stderr) => {
            if (error) {
                reject({ message: error.message, stdout, stderr });
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
};

// Function to extract contract name from Solidity code
const extractContractName = (solidityCode: string): string | null => {
    const match = solidityCode.match(/contract\s+(\w+)\s*{/);
    return match ? match[1] : null;
};

router.post('/test-solidity', async (req: Request, res: Response) => {
    let { code, lessonId } = req.body;

    if (!code || !lessonId) {
        return res.status(400).json({ error: 'Solidity code and lessonId are required.' });
    }

    // Force pragma to be ^0.8.26 to match the test files
    code = code.replace(/pragma solidity .*/, 'pragma solidity ^0.8.26;');

    const originalTestFilePath = path.join(__dirname, '..', '..', 'forge_base_project', 'test', lessonId, `${lessonId}.t.sol`);

    if (!fs.existsSync(originalTestFilePath)) {
        return res.status(400).json({ error: `No test file found for lesson: ${lessonId} at ${originalTestFilePath}` });
    }

    let tempDir: string | undefined;
    try {
        const tempDirPrefix = path.join(require('os').tmpdir(), 'pragma-forge-');
        tempDir = await mkdtempAsync(tempDirPrefix);

        await execCommand('forge init --no-git', tempDir);

        const tempSrcDir = path.join(tempDir, 'src');
        const tempTestDir = path.join(tempDir, 'test');

        // Explicitly set src and test paths in foundry.toml
        const foundryTomlPath = path.join(tempDir, 'foundry.toml');
        let foundryTomlContent = await readFileAsync(foundryTomlPath, 'utf8');
        foundryTomlContent = foundryTomlContent.replace(
            /src = ".*"/g, 'src = "src"'
        );
        // Ensure 'test = "test"' is present in the [profile.default] section
        if (!foundryTomlContent.includes('test = "test"')) {
            foundryTomlContent = foundryTomlContent.replace(
                /(\n\[profile.default\]\n)/,
                '$1test = "test"\n'
            );
        }
        // Add remapping for user contract with trailing slash
        foundryTomlContent += `\nremappings = ["user_contract/=${tempSrcDir}/"]`;
        await writeFileAsync(foundryTomlPath, foundryTomlContent);

        // Ensure src and test directories exist
        await mkdirAsync(tempSrcDir, { recursive: true });
        await mkdirAsync(tempTestDir, { recursive: true });

        console.log('tempSrcDir exists: ' + fs.existsSync(tempSrcDir));
        console.log('tempTestDir exists: ' + fs.existsSync(tempTestDir));

        // Extract contract name from user's code
        const contractName = extractContractName(code);
        if (!contractName) {
            return res.status(400).json({ error: 'Could not extract contract name from provided Solidity code.' });
        }
        console.log('Extracted contract name:', contractName);

        const tempContractPath = path.join(tempSrcDir, `${contractName}.sol`);
        await writeFileAsync(tempContractPath, code);

        // Log forge config to debug src path
        console.log('\n--- Forge Config Output ---');
        try {
            const { stdout: forgeConfigOutput } = await execCommand('forge config', tempDir);
            console.log(forgeConfigOutput);
        } catch (configErr: any) {
            console.error('Error running forge config:', configErr.message);
        }
        console.log('--- End Forge Config Output ---\n');

        const originalTestCode = await readFileAsync(originalTestFilePath, 'utf8');
        // Normalize line endings to Unix style to ensure consistent regex matching
        const normalizedOriginalTestCode = originalTestCode.replace(/\r\n/g, '\n');

        console.log('\n--- Original Test Code Content ---');
        console.log(normalizedOriginalTestCode);
        console.log('--- End Original Test Code Content ---\n');

        // This regex finds the import statement for the contract under test
        // and replaces it with the path to the user's temporary contract file.
        const importRegex = new RegExp(`import \"user_contract/${lessonId}.sol\";`, 'g');
        const updatedTestCode = normalizedOriginalTestCode.replace(importRegex, `import "user_contract/${contractName}.sol"`);

        console.log('\n--- Updated Test Code Content (after replace) ---');
        console.log(updatedTestCode);
        console.log(`--- End Updated Test Code Content (after replace) ---
`);

        const tempTestPath = path.join(tempTestDir, `${lessonId}.t.sol`);
        console.log('Updated Test Code (before writing to file): ' + updatedTestCode);
        await writeFileAsync(tempTestPath, updatedTestCode);

        // --- DEEPER DEBUGGING LOGS ---
        console.log('--- Debugging Test Run for lessonId: ' + lessonId + ' ---');
        console.log('Temporary directory: ' + tempDir);
        console.log('\n--- Temporary Contract File Content ---');
        console.log(fs.readFileSync(tempContractPath, 'utf8'));
        console.log('\n--- Temporary Test File Content ---');
        console.log(fs.readFileSync(tempTestPath, 'utf8'));
        console.log('\n--- Temporary foundry.toml Content (Modified) ---');
        console.log(fs.readFileSync(path.join(tempDir, 'foundry.toml'), 'utf8'));
        console.log('\n--- Running Forge Test... ---');
        // --- END DEEPER DEBUGGING LOGS ---

        const { stdout: testOutput } = await execCommand(`forge test --match-path "*${lessonId}.t.sol" -vvv`, tempDir);

        // Determine if tests passed based on output (simple check for now)
        const passed = testOutput.includes('1 passed') && !testOutput.includes('0 failed');

        // Assuming userId is available from authentication middleware
        const userId = (req as any).user?.id; // Cast req to any to access req.user

        if (userId) {
            await prisma.userSubmittedCode.create({
                data: {
                    userId: userId,
                    lessonId: lessonId,
                    code: code,
                    testResults: testOutput, // Store the full output
                    passed: passed,
                },
            });
        } else {
            console.warn('User ID not found in request. Code submission not saved.');
        }

        res.json({
            success: true,
            output: testOutput,
            passed: passed, // Include passed status in response
        });

    } catch (err: any) {
        console.error('Error processing Solidity test:', err);
        const fullError = `Message: ${err.message}\n\nSTDOUT:\n${err.stdout}\n\nSTDERR:\n${err.stderr}`;
        res.status(500).json({
            success: false,
            output: fullError,
            error: fullError,
        });
    } finally {
        if (tempDir) {
            try {
                await rmAsync(tempDir, { recursive: true, force: true });
            } catch (cleanupError) {
                console.error(`Failed to clean up temporary directory ${tempDir}:`, cleanupError);
            }
        }
    }
});

export default router;
