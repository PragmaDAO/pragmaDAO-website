import { Router, Request, Response } from 'express';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

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

router.post('/test-solidity', async (req: Request, res: Response) => {
    const { code, lessonId } = req.body;

    if (!code || !lessonId) {
        return res.status(400).json({ error: 'Solidity code and lessonId are required.' });
    }

    const originalTestFilePath = path.join(__dirname, '..', '..', 'forge_base_project', 'test', lessonId, `${lessonId}.t.sol`);

    if (!fs.existsSync(originalTestFilePath)) {
        return res.status(400).json({ error: `No test file found for lesson: ${lessonId} at ${originalTestFilePath}` });
    }

    let tempDir: string | undefined;
    try {
        const tempDirPrefix = path.join(require('os').tmpdir(), 'pragma-forge-');
        tempDir = await mkdtempAsync(tempDirPrefix);

        await execCommand('forge init --no-git', tempDir);

        // Explicitly set src and test paths in foundry.toml
        const foundryTomlPath = path.join(tempDir, 'foundry.toml');
        let foundryTomlContent = await readFileAsync(foundryTomlPath, 'utf8');
        foundryTomlContent = foundryTomlContent.replace(
            /src = ".*"/g, 'src = "src"'
        );
        // Ensure 'test = "test"' is present in the [profile.default] section
        if (!foundryTomlContent.includes('test = "test"')) {
            foundryTomlContent = foundryTomlContent.replace(
                /(\[profile\.default\]\n)/,
                '$1test = "test"\n'
            );
        }
        await writeFileAsync(foundryTomlPath, foundryTomlContent);

        const tempSrcDir = path.join(tempDir, 'src');
        const tempTestDir = path.join(tempDir, 'test');

        const tempContractPath = path.join(tempSrcDir, `${lessonId}.sol`);
        await writeFileAsync(tempContractPath, code);

        const originalTestCode = await readFileAsync(originalTestFilePath, 'utf8');
        const updatedTestCode = originalTestCode;

        const tempTestLessonDir = path.join(tempTestDir, lessonId);
        await mkdirAsync(tempTestLessonDir, { recursive: true });

        const tempTestPath = path.join(tempTestLessonDir, `${lessonId}.t.sol`);
        await writeFileAsync(tempTestPath, updatedTestCode);

        // --- DEEPER DEBUGGING LOGS ---
        console.log(`--- Debugging Test Run for lessonId: ${lessonId} ---`);
        console.log(`Temporary directory: ${tempDir}`);
        console.log('\n--- Temporary Contract File Content ---');
        console.log(fs.readFileSync(tempContractPath, 'utf8'));
        console.log('\n--- Temporary Test File Content ---');
        console.log(fs.readFileSync(tempTestPath, 'utf8'));
        console.log('\n--- Temporary foundry.toml Content (Modified) ---');
        console.log(fs.readFileSync(path.join(tempDir, 'foundry.toml'), 'utf8'));
        console.log('\n--- Running Forge Test... ---');
        // --- END DEEPER DEBUGGING LOGS ---

        const { stdout: testOutput } = await execCommand('forge test -vvv', tempDir);

        res.json({
            success: true,
            output: testOutput,
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