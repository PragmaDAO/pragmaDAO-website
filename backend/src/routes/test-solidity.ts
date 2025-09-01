import { Router, Request, Response } from 'express';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const router = Router();

// Promisify fs functions for async/await usage
const mkdtempAsync = promisify(fs.mkdtemp);
const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);
const rmAsync = promisify(fs.rm);

// Custom Promise wrapper for exec to correctly capture stdout/stderr on error
const execCommand = (command: string, cwd: string): Promise<{ stdout: string; stderr: string }> => {
    return new Promise((resolve, reject) => {
        exec(command, { cwd }, (error, stdout, stderr) => {
            if (error) {
                // On error, reject with an object containing all details
                reject({ message: error.message, stdout, stderr });
            } else {
                // On success, resolve with stdout and stderr
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

        const tempSrcDir = path.join(tempDir, 'src');
        const tempTestDir = path.join(tempDir, 'test');

        const tempContractPath = path.join(tempSrcDir, `${lessonId}.sol`);
        await writeFileAsync(tempContractPath, code);

        const originalTestCode = await readFileAsync(originalTestFilePath, 'utf8');
        const updatedTestCode = originalTestCode.replace('../../src/', '../src/');
        const tempTestPath = path.join(tempTestDir, `${lessonId}.t.sol`);
        await writeFileAsync(tempTestPath, updatedTestCode);

        const { stdout: testOutput } = await execCommand('forge test -vvv', tempDir);

        res.json({
            success: true,
            output: testOutput,
        });

    } catch (err: any) {
        console.error('Error processing Solidity test:', err);
        // Combine all parts of the error into one comprehensive message.
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
