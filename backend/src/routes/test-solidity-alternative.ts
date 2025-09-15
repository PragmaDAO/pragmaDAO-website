import { Router, Request, Response } from 'express';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
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

// Simple Solidity compiler using solc directly
async function compileSolidity(contractCode: string, contractName: string): Promise<any> {
    // Try to use solc if available
    try {
        const tempDir = await mkdtempAsync(path.join(require('os').tmpdir(), 'solc-'));
        const contractPath = path.join(tempDir, `${contractName}.sol`);

        await writeFileAsync(contractPath, contractCode);

        // Try to compile with solc
        const { stdout } = await execCommand(`npx solc --bin --abi ${contractPath}`, tempDir);

        await rmAsync(tempDir, { recursive: true });

        return { success: true, output: stdout };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Basic syntax checking without forge
function basicSolidityValidation(code: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check for basic Solidity syntax
    if (!code.includes('pragma solidity')) {
        errors.push('Missing pragma solidity directive');
    }

    if (!code.includes('contract ')) {
        errors.push('No contract definition found');
    }

    // Check for balanced braces
    const openBraces = (code.match(/{/g) || []).length;
    const closeBraces = (code.match(/}/g) || []).length;
    if (openBraces !== closeBraces) {
        errors.push('Unbalanced braces in contract');
    }

    // Check for balanced parentheses
    const openParens = (code.match(/\(/g) || []).length;
    const closeParens = (code.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
        errors.push('Unbalanced parentheses in contract');
    }

    return { valid: errors.length === 0, errors };
}

// Simple test runner without forge
async function runBasicTests(userCode: string, testCode: string, lessonId: string): Promise<any> {
    const validation = basicSolidityValidation(userCode);

    if (!validation.valid) {
        return {
            success: false,
            output: `Solidity validation failed:\n${validation.errors.join('\n')}`,
            passed: false
        };
    }

    // Try compilation
    const contractName = extractContractName(userCode);
    if (!contractName) {
        return {
            success: false,
            output: 'Could not extract contract name from code',
            passed: false
        };
    }

    const compilationResult = await compileSolidity(userCode, contractName);

    if (compilationResult.success) {
        return {
            success: true,
            output: `✅ Contract compilation successful!\n\n${compilationResult.output}\n\nBasic validation passed for lesson: ${lessonId}`,
            passed: true
        };
    } else {
        return {
            success: false,
            output: `❌ Contract compilation failed:\n${compilationResult.error}`,
            passed: false
        };
    }
}

const extractContractName = (solidityCode: string): string | null => {
    const match = solidityCode.match(/contract\s+(\w+)\s*{/);
    return match ? match[1] : null;
};

router.post('/test-solidity-alternative', async (req: Request, res: Response) => {
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

    let testCode = '';
    try {
        testCode = await readFileAsync(originalTestFilePath, 'utf8');
    } catch (error) {
        return res.status(400).json({ error: `No test file found for lesson: ${lessonId} at ${originalTestFilePath}` });
    }

    try {
        const testResult = await runBasicTests(code, testCode, lessonId);

        // Store the submission in the database
        const userId = (req as any).user?.id;
        if (userId) {
            await prisma.userSubmittedCode.create({
                data: {
                    userId: userId,
                    lessonId: lessonId,
                    code: code,
                    testResults: testResult.output,
                    passed: testResult.passed,
                },
            });
        }

        res.json({
            success: testResult.success,
            output: testResult.output,
            passed: testResult.passed,
            note: 'Using alternative testing method (compilation + validation)'
        });

    } catch (err: any) {
        console.error('Error processing Solidity test (alternative):', err);
        res.status(500).json({
            success: false,
            output: `Error: ${err.message}`,
            error: err.message,
        });
    }
});

export default router;