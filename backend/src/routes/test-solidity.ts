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
    const { code, lessonId } = req.body; // 'code' is the user's contract code, 'lessonId' identifies the lesson

    if (!code || !lessonId) {
        return res.status(400).json({ error: 'Solidity code and lessonId are required.' });
    }

    const forgeProjectPath = path.join(__dirname, '..', '..', 'forge_base_project');
    const srcDir = path.join(forgeProjectPath, 'src');
    const testDir = path.join(forgeProjectPath, 'test');

    // Define paths for the user's contract file and the lesson's test file
    const userContractFileName = `${lessonId}.sol`; // e.g., HelloWorld.sol
    const userContractFilePath = path.join(srcDir, userContractFileName);
    const lessonTestFilePath = path.join(testDir, lessonId, `${lessonId}.t.sol`); // e.g., test/HelloWorld/HelloWorld.t.sol

    try {
        // 1. Write the user's contract code to the designated file in forge_base_project/src
        fs.writeFileSync(userContractFilePath, code);

        // 2. Check if the lesson's test file exists
        if (!fs.existsSync(lessonTestFilePath)) {
            return res.status(400).json({ error: `No test file found for lesson: ${lessonId} at ${lessonTestFilePath}` });
        }

        // 3. Run forge test, targeting the specific lesson's test file
        // The test file itself will need to import the user's contract (e.g., import "../../src/HelloWorld.sol";)
        const testOutput = await execCommand(
            `forge test -vvv --match-path ${path.join('test', lessonId, `${lessonId}.t.sol`)}`,
            forgeProjectPath
        );

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
        // Clean up the user's contract file
        if (fs.existsSync(userContractFilePath)) {
            fs.unlinkSync(userContractFilePath);
        }
    }
});

export default router;
