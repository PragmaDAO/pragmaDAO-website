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
    return new Promise(async (resolve, reject) => {
        // Try to find forge in common locations
        const possiblePaths = [
            `${process.env.HOME}/.foundry/bin`,
            '/tmp/.foundry/bin',
            '/opt/render/.foundry/bin',
            '/usr/local/bin',
            '/usr/bin',
            '/bin',
            '/app/.foundry/bin'  // Common in containerized environments
        ];

        // Also check for dynamic /tmp/foundry-* directories
        try {
            const tmpDirs = require('fs').readdirSync('/tmp').filter((dir: string) => dir.startsWith('foundry-'));
            for (const dir of tmpDirs) {
                possiblePaths.push(`/tmp/${dir}/bin`);
            }
        } catch (e) {
            // Ignore if we can't read /tmp
        }

        // If the command starts with 'forge', try to use the full path
        let finalCommand = command;
        if (command.startsWith('forge ')) {
            for (const path of possiblePaths) {
                const forgePath = `${path}/forge`;
                try {
                    require('fs').accessSync(forgePath, require('fs').constants.F_OK);
                    finalCommand = command.replace('forge ', `${forgePath} `);
                    console.log(`✅ Using forge at: ${forgePath}`);
                    break;
                } catch (e) {
                    // Continue to next path
                }
            }

            // If we couldn't find forge with absolute path, try installing it now
            if (finalCommand === command) {
                console.log('⚠️ Forge not found in any location, attempting installation...');
                try {
                    const { ensureFoundryAtRuntime } = require('../../ensure-foundry-runtime');
                    await ensureFoundryAtRuntime();

                    // Try again to find forge after installation
                    for (const path of possiblePaths) {
                        const forgePath = `${path}/forge`;
                        try {
                            require('fs').accessSync(forgePath, require('fs').constants.F_OK);
                            finalCommand = command.replace('forge ', `${forgePath} `);
                            console.log(`✅ Using newly installed forge at: ${forgePath}`);
                            break;
                        } catch (e) {
                            // Continue to next path
                        }
                    }
                } catch (installError) {
                    console.error('❌ Failed to install Foundry:', installError);
                }
            }
        }

        // Ensure Foundry is in the PATH
        const env = {
            ...process.env,
            PATH: possiblePaths.join(':') + ':' + process.env.PATH
        };

        console.log(`Executing: ${finalCommand}`);
        console.log(`CWD: ${cwd}`);
        console.log(`PATH: ${env.PATH}`);

        exec(finalCommand, { cwd, env }, (error, stdout, stderr) => {
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


// Debug route to check Foundry availability
router.get('/foundry-status', async (_req: Request, res: Response) => {
    const possiblePaths = [
        `${process.env.HOME}/.foundry/bin`,
        '/usr/local/bin',
        '/usr/bin',
        '/bin',
        '/app/.foundry/bin'
    ];

    const status: any = {
        environment: {
            HOME: process.env.HOME,
            PATH: process.env.PATH,
            NODE_ENV: process.env.NODE_ENV
        },
        foundryLocations: {}
    };

    // Check each possible location
    for (const path of possiblePaths) {
        const forgePath = `${path}/forge`;
        try {
            fs.accessSync(forgePath, fs.constants.F_OK);
            status.foundryLocations[path] = 'exists';

            // Try to get version
            try {
                const { stdout } = await execCommand(`${forgePath} --version`, process.cwd());
                status.foundryLocations[path] = { exists: true, version: stdout.trim() };
            } catch (e) {
                status.foundryLocations[path] = { exists: true, version: 'error getting version' };
            }
        } catch (e) {
            status.foundryLocations[path] = 'not found';
        }
    }

    // Try which command
    try {
        const { stdout } = await execCommand('which forge', process.cwd());
        status.whichForge = stdout.trim();
    } catch (e) {
        status.whichForge = 'not found';
    }

    res.json(status);
});

router.post('/test-solidity', async (req: Request, res: Response) => {
    let { code, lessonId } = req.body;

    if (!code || !lessonId) {
        return res.status(400).json({ error: 'Solidity code and lessonId are required.' });
    }

    // Map lesson IDs to the new directory structure
    const lessonDirectoryMap: { [key: string]: { dir: string; testFile: string } } = {
        'solidity-101': { dir: 'HelloWorld', testFile: 'HelloWorld.t.sol' },
        'HelloWorld': { dir: 'HelloWorld', testFile: 'HelloWorld.t.sol' },
        'integers-and-unsigned-integers': { dir: 'IntegersAndUnsignedIntegers', testFile: 'IntegersAndUnsignedIntegers.t.sol' },
        'understanding-variables-and-types': { dir: 'UnderstandingVariablesAndTypes', testFile: 'UnderstandingVariablesAndTypes.t.sol' },
        'state-and-local-variables': { dir: 'StateAndLocalVariables', testFile: 'StateAndLocalVariables.t.sol' },
        'understanding-functions': { dir: 'UnderstandingFunctions', testFile: 'UnderstandingFunctions.t.sol' }
    };

    const lessonMapping = lessonDirectoryMap[lessonId];
    if (!lessonMapping) {
        return res.status(400).json({ error: `Unknown lesson ID: ${lessonId}` });
    }

    // Force pragma to be ^0.8.26 to match the test files
    code = code.replace(/pragma solidity .*/, 'pragma solidity ^0.8.26;');

    const originalTestFilePath = path.join(__dirname, '..', '..', 'forge_base_project', 'test', lessonMapping.dir, lessonMapping.testFile);

    if (!fs.existsSync(originalTestFilePath)) {
        return res.status(400).json({ error: `No test file found for lesson: ${lessonId} at ${originalTestFilePath}` });
    }

    let tempDir: string | undefined;
    try {
        const tempDirPrefix = path.join(require('os').tmpdir(), 'pragma-forge-');
        tempDir = await mkdtempAsync(tempDirPrefix);

        // Ensure forge is available before proceeding
        try {
            // Try to install Foundry if not available
            const { ensureFoundryAtRuntime } = require('../../ensure-foundry-runtime');
            await ensureFoundryAtRuntime();
        } catch (foundryError) {
            console.warn('Could not ensure Foundry installation:', foundryError);
        }

        try {
            await execCommand('forge init --no-git', tempDir);
        } catch (error: any) {
            console.log('Error caught during forge init:', {
                message: error.message,
                stderr: error.stderr,
                stdout: error.stdout
            });

            // If forge is not found, this is a critical error
            if (error.message.includes('forge: not found') ||
                error.stderr?.includes('forge: not found') ||
                error.message.includes('forge: command not found') ||
                error.message.includes('/bin/sh: 1: forge: not found')) {

                console.error('❌ CRITICAL: Foundry/forge is not available on the server');

                return res.status(500).json({
                    success: false,
                    error: 'Foundry is not properly installed on the server. Please contact support.',
                    details: 'The Solidity testing environment requires Foundry to be installed and accessible.',
                    output: error.message
                });
            }

            throw error;
        }

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
        // Replace any import path that references the contract with user_contract/ remapping
        const importRegex = new RegExp(`import "([^"]*${contractName}\\.sol)";`, 'g');
        const updatedTestCode = normalizedOriginalTestCode.replace(importRegex, `import "user_contract/${contractName}.sol";`);

        console.log('\n--- Updated Test Code Content (after replace) ---');
        console.log(updatedTestCode);
        console.log(`--- End Updated Test Code Content (after replace)---\n`);

        const tempTestPath = path.join(tempTestDir, lessonMapping.testFile);
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

        const { stdout: testOutput } = await execCommand(`forge test --match-path "*${lessonMapping.testFile}" -vvv`, tempDir);

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

        console.log('Forge Test Output (backend):', testOutput);
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
