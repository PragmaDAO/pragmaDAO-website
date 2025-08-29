import { Router, Request, Response } from 'express';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const router = Router();

// Helper function to execute shell commands with Promise
const execCommand = (command: string, cwd: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        exec(command, { cwd }, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(`Command failed: ${command}\n${stderr || stdout}`));
            } else {
                resolve(stdout);
            }
        });
    });
};

router.post('/test-solidity', async (req: Request, res: Response) => {
    const { code, lessonId } = req.body;

    if (!code || !lessonId) {
        return res.status(400).json({ error: 'Solidity code and lessonId are required.' });
    }

    const tempDir = path.join(__dirname, '..', '..', 'temp', `test-${Date.now()}`);
    const projectInTempDir = path.join(tempDir, 'forge_project');

    try {
        fs.mkdirSync(projectInTempDir, { recursive: true });

        const baseProjectPath = path.join(__dirname, '..', '..', 'forge_base_project');
        await execCommand(`cp -r ${baseProjectPath}/* ${projectInTempDir}/`, tempDir);

        const srcDir = path.join(projectInTempDir, 'src');
        const testDir = path.join(projectInTempDir, 'test');

        // Define file paths
        const userCodeFilePath = path.join(srcDir, 'HelloWorld.sol');
        const testFilePath = path.join(testDir, 'test.t.sol');

        // Write user's code
        fs.writeFileSync(userCodeFilePath, code);

        // Construct the path to the lesson's test file
        const lessonTestFilePath = path.join(__dirname, '..', '..', 'tests', lessonId, 'test.t.sol');

        // Check if the test file exists
        if (!fs.existsSync(lessonTestFilePath)) {
            return res.status(400).json({ error: `No test file found for lesson: ${lessonId}` });
        }

        // Read the lesson's test file and write it to the temp directory
        const testContent = fs.readFileSync(lessonTestFilePath, 'utf-8');
        fs.writeFileSync(testFilePath, testContent);

        // Run forge test
        const testOutput = await execCommand(`forge test -vvv`, projectInTempDir);

        res.json({
            success: true,
            output: testOutput,
        });
    } catch (err: any) {
        console.error('Error processing Solidity test:', err);
        res.status(500).json({
            success: false,
            output: err.message,
            error: err.message,
        });
    } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
});

export default router;
