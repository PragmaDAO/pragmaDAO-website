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
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'Solidity code is required.' });
    }

    // Create a temporary directory for the test
    const tempDir = path.join(__dirname, '..', '..', 'temp', `test-${Date.now()}`);
    const baseProjectPath = path.join(__dirname, '..', '..', 'forge_base_project');
    const projectInTempDir = path.join(tempDir, 'forge_project'); // New path for the copied project

    try {
        // Create the temporary directory
        fs.mkdirSync(tempDir, { recursive: true });

        // Copy the base Foundry project into the temporary directory
        // This copies the entire forge_base_project folder into tempDir
        await execCommand(`cp -r ${baseProjectPath} ${projectInTempDir}`, tempDir);

        // Adjust srcDir and testDir to point inside the copied project
        const srcDir = path.join(projectInTempDir, 'src');
        const testDir = path.join(projectInTempDir, 'test');

        // Write the user's Solidity code to a temporary file
        const contractFileName = 'UserContract.sol';
        const contractFilePath = path.join(srcDir, contractFileName);
        fs.writeFileSync(contractFilePath, code);

        // Create a basic test file for the user's contract
        const testFileName = 'UserContract.t.sol';
        const testFilePath = path.join(testDir, testFileName);
        const testContent = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26; // Changed pragma to match user's code

import "forge-std/Test.sol";
import "../src/${contractFileName}";

contract UserContractTest is Test {
    // You can add a constructor or setUp function here if needed

    function test_Example() public {
        // This is a placeholder test. Users will need to provide their own tests.
        // For now, we just ensure the contract compiles and a basic test runs.
        assertTrue(true, "Example test passed");
    }
}
`;
        fs.writeFileSync(testFilePath, testContent);

        // Run forge test in the copied project directory
        console.log(`Running: forge test --root ${projectInTempDir} -vvvv in ${projectInTempDir}`);
        const testOutput = await execCommand(`forge test --root ${projectInTempDir} -vvvv`, projectInTempDir);
        console.log('forge test output:', testOutput);


        res.json({
            success: true,
            output: testOutput
        });

    } catch (err: any) {
        console.error('Error processing Solidity test:', err);
        res.status(500).json({
            success: false,
            output: err.message, // Send the detailed error message
            error: err.message
        });
    } finally {
        // Clean up temporary directory
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
});

export default router;