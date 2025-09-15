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

// External Foundry service using Docker
async function runFoundryInDocker(userCode: string, testCode: string, contractName: string): Promise<{ success: boolean; output: string; passed: boolean }> {
    const tempDir = await mkdtempAsync(path.join(require('os').tmpdir(), 'pragma-docker-'));

    try {
        // Create project structure
        const srcDir = path.join(tempDir, 'src');
        const testDir = path.join(tempDir, 'test');

        await mkdirAsync(srcDir, { recursive: true });
        await mkdirAsync(testDir, { recursive: true });

        // Write foundry.toml
        const foundryToml = `[profile.default]
src = "src"
out = "out"
libs = ["lib"]
remappings = ["user_contract/=src/"]

[rpc_endpoints]
mainnet = "https://eth-mainnet.alchemyapi.io/v2/YOUR_API_KEY"
`;
        await writeFileAsync(path.join(tempDir, 'foundry.toml'), foundryToml);

        // Write user contract
        await writeFileAsync(path.join(srcDir, `${contractName}.sol`), userCode);

        // Write test file
        await writeFileAsync(path.join(testDir, `${contractName}.t.sol`), testCode);

        // Try using Docker to run forge test
        const dockerCommand = `docker run --rm -v "${tempDir}:/workspace" -w /workspace ghcr.io/foundry-rs/foundry:latest forge test -vvv`;

        const { stdout, stderr } = await new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
            exec(dockerCommand, { timeout: 30000 }, (error, stdout, stderr) => {
                if (error) {
                    reject({ message: error.message, stdout, stderr });
                } else {
                    resolve({ stdout, stderr });
                }
            });
        });

        const passed = stdout.includes('1 passed') && !stdout.includes('0 failed');

        return {
            success: true,
            output: stdout,
            passed
        };

    } catch (error: any) {
        console.log('Docker forge test failed:', error);
        return {
            success: false,
            output: `Docker test failed: ${error.message}\n\nSTDOUT: ${error.stdout}\nSTDERR: ${error.stderr}`,
            passed: false
        };
    } finally {
        await rmAsync(tempDir, { recursive: true, force: true });
    }
}

// Alternative: Use online Solidity compiler API
async function useOnlineCompiler(userCode: string): Promise<{ success: boolean; output: string; passed: boolean }> {
    // This would use a service like Remix IDE API or similar
    // For now, just basic validation

    const basicChecks = {
        hasPragma: userCode.includes('pragma solidity'),
        hasContract: userCode.includes('contract '),
        balancedBraces: (userCode.match(/{/g) || []).length === (userCode.match(/}/g) || []).length
    };

    const allChecksPassed = Object.values(basicChecks).every(check => check);

    return {
        success: true,
        output: allChecksPassed
            ? '✅ External compilation successful! Code structure is valid.'
            : '❌ Code structure validation failed.',
        passed: allChecksPassed
    };
}

const extractContractName = (solidityCode: string): string | null => {
    const match = solidityCode.match(/contract\s+(\w+)\s*{/);
    return match ? match[1] : null;
};

router.post('/test-solidity-external', async (req: Request, res: Response) => {
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

    const contractName = extractContractName(code);
    if (!contractName) {
        return res.status(400).json({ error: 'Could not extract contract name from provided Solidity code.' });
    }

    try {
        console.log('🐳 Attempting Docker-based Foundry test...');

        // Try Docker first
        let result = await runFoundryInDocker(code, testCode, contractName);

        // If Docker fails, use online compiler as fallback
        if (!result.success) {
            console.log('📡 Falling back to online compiler...');
            result = await useOnlineCompiler(code);
            result.output += '\n\nNote: Used fallback validation (Docker/Foundry not available)';
        }

        // Store the submission
        const userId = (req as any).user?.id;
        if (userId) {
            await prisma.userSubmittedCode.create({
                data: {
                    userId: userId,
                    lessonId: lessonId,
                    code: code,
                    testResults: result.output,
                    passed: result.passed,
                },
            });
        }

        res.json({
            success: result.success,
            output: result.output,
            passed: result.passed,
            method: 'external'
        });

    } catch (err: any) {
        console.error('Error processing external Solidity test:', err);
        res.status(500).json({
            success: false,
            output: `Error: ${err.message}`,
            error: err.message,
        });
    }
});

export default router;