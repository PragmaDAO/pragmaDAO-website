import { Router, Request, Response } from 'express';
import { exec, spawn } from 'child_process';
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

// Helper function to ensure Docker image is available
async function ensureFoundryImageExists(): Promise<string | null> {
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);

    // First check if Docker is available
    try {
        await execAsync('docker --version', { timeout: 5000, env: process.env });
        console.log('🐳 Docker is available');
    } catch (dockerCheckError: any) {
        console.log('❌ Docker not available on this system:', dockerCheckError.message);
        console.log('⚠️  Solidity testing requires Docker installation');
        return null; // Signal Docker unavailable
    }

    console.log('🔍 Checking for pragma-foundry:latest...');

    try {
        // First try to run a simple command with the image to test if it exists and works
        await execAsync('docker run --rm pragma-foundry:latest echo "test"', {
            timeout: 10000,
            env: process.env
        });
        console.log('✅ Using local pragma-foundry:latest image - FAST MODE');
        return 'pragma-foundry:latest';
    } catch (error: any) {
        console.log('❌ pragma-foundry:latest not available, trying to build it...');

        try {
            // Try to build the image
            console.log('🔨 Building pragma-foundry:latest...');
            await execAsync('docker build -f Dockerfile.foundry -t pragma-foundry:latest .', {
                timeout: 300000,
                env: process.env
            });

            // Test if the newly built image works
            await execAsync('docker run --rm pragma-foundry:latest echo "test"', {
                timeout: 10000,
                env: process.env
            });
            console.log('✅ Built and using pragma-foundry:latest - FAST MODE');
            return 'pragma-foundry:latest';
        } catch (buildError: any) {
            console.log('❌ Failed to build pragma-foundry:latest, falling back to Ubuntu + install - SLOW MODE');
            console.log('Build error:', buildError.message);
            return 'ubuntu:22.04';
        }
    }
}

// External Foundry service using Docker
async function runFoundryInDocker(userCode: string, testCode: string, contractName: string, lessonMapping?: any): Promise<{ success: boolean; output: string; passed: boolean }> {
    const tempDir = await mkdtempAsync(path.join(require('os').tmpdir(), 'pragma-docker-'));

    try {
        // Create project structure
        const srcDir = path.join(tempDir, 'src');
        const testDir = path.join(tempDir, 'test');

        await mkdirAsync(srcDir, { recursive: true });
        await mkdirAsync(testDir, { recursive: true });

        // Write foundry.toml with simpler config
        const foundryToml = `[profile.default]
src = "src"
out = "out"
libs = ["lib"]
remappings = ["user_contract/=src/", "forge-std/=lib/forge-std/src/"]
`;
        await writeFileAsync(path.join(tempDir, 'foundry.toml'), foundryToml);

        // Create lib directory and minimal forge-std setup
        const libDir = path.join(tempDir, 'lib', 'forge-std', 'src');
        await mkdirAsync(libDir, { recursive: true });

        // Create a comprehensive Test.sol file to avoid import errors
        const minimalTest = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Test {
    // Use only the most general types to avoid overload ambiguity
    function assertEq(uint256 a, uint256 b) internal pure {
        require(a == b, "assertion failed");
    }

    function assertEq(int256 a, int256 b) internal pure {
        require(a == b, "assertion failed");
    }

    function assertEq(string memory a, string memory b, string memory message) internal pure {
        require(keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b)), message);
    }

    function assertEq(string memory a, string memory b) internal pure {
        require(keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b)), "assertion failed");
    }

    function assertEq(bool a, bool b) internal pure {
        require(a == b, "assertion failed");
    }

    function assertTrue(bool condition) internal pure {
        require(condition, "assertion failed");
    }

    function assertFalse(bool condition) internal pure {
        require(!condition, "assertion failed");
    }
}
`;
        await writeFileAsync(path.join(libDir, 'Test.sol'), minimalTest);

        // Write user contract with expected contract name
        const expectedContractName = lessonMapping ? lessonMapping.expectedContractName : contractName;
        await writeFileAsync(path.join(srcDir, `${expectedContractName}.sol`), userCode);

        // Write test file with lesson-specific naming
        const testFileName = lessonMapping ? lessonMapping.testFile : `${contractName}.t.sol`;
        await writeFileAsync(path.join(testDir, testFileName), testCode);

        // Determine which Docker image to use
        const dockerImage = await ensureFoundryImageExists();

        // If Docker is not available, return an error
        if (dockerImage === null) {
            console.log('❌ Docker is required for Solidity testing but not available');
            return {
                success: false,
                output: 'Docker is required for Solidity testing but is not installed or available on this server. Please install Docker to enable Solidity testing.',
                passed: false
            };
        }

        // Prepare Docker command based on available image
        let dockerCommand: string;
        if (dockerImage === 'pragma-foundry:latest') {
            dockerCommand = 'forge test --root . -vvv 2>&1 || echo "Test completed with exit code: $?"';
        } else {
            dockerCommand = 'apt-get update -qq && apt-get install -y curl git -qq && curl -L https://foundry.paradigm.xyz | bash && export PATH="$PATH:/root/.foundry/bin" && foundryup && forge test --root . -vvv 2>&1 || echo "Test completed with exit code: $?"';
        }

        console.log(`🐳 Using Docker image: ${dockerImage}`);
        console.log(`📋 Docker command: ${dockerCommand.substring(0, 100)}...`);

        const { stdout, stderr } = await new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
            // Use spawn for better output handling
            const env = {
                ...process.env
            };

            const dockerArgs = [
                'run', '--rm',
                '-v', `${tempDir}:/workspace`,
                '-w', '/workspace',
                dockerImage,
                'bash', '-c',
                dockerCommand
            ];

            const child = spawn('docker', dockerArgs, {
                env,
                stdio: ['pipe', 'pipe', 'pipe']
            });

            // Set a manual timeout
            const timeoutHandle = setTimeout(() => {
                child.kill('SIGTERM');
                reject({ message: 'Docker command timed out after 120 seconds', stdout: '', stderr: '' });
            }, 120000);

            let stdoutData = '';
            let stderrData = '';

            child.stdout?.on('data', (data) => {
                stdoutData += data.toString();
            });

            child.stderr?.on('data', (data) => {
                stderrData += data.toString();
            });

            child.on('close', (code) => {
                clearTimeout(timeoutHandle);
                if (code !== 0) {
                    console.error('Docker spawn error, exit code:', code);
                    console.error('Docker stdout:', stdoutData);
                    console.error('Docker stderr:', stderrData);
                    reject({ message: `Docker exited with code ${code}`, stdout: stdoutData, stderr: stderrData });
                } else {
                    resolve({ stdout: stdoutData, stderr: stderrData });
                }
            });

            child.on('error', (error) => {
                clearTimeout(timeoutHandle);
                console.error('Docker spawn error:', error);
                reject({ message: error.message, stdout: stdoutData, stderr: stderrData });
            });
        });

        console.log('Docker stdout:', stdout || 'NO STDOUT');
        console.log('Docker stderr:', stderr || 'NO STDERR');
        console.log('Docker stdout length:', stdout ? stdout.length : 0);
        console.log('Docker stderr length:', stderr ? stderr.length : 0);

        const passed = stdout.includes('Test result: ok') || stdout.includes('1 passed') || (stdout.includes('passed') && !stdout.includes('0 passed') && !stdout.includes('FAILED'));

        return {
            success: true,
            output: stdout,
            passed
        };

    } catch (error: any) {
        console.error('runFoundryInDocker failed:', error);
        return {
            success: false,
            output: `Docker test failed: ${error.message}\n\nSTDOUT: ${error.stdout}\nSTDERR: ${error.stderr}`,
            passed: false
        };
    } finally {
        await rmAsync(tempDir, { recursive: true, force: true });
    }
}

// Docker is required for proper Solidity testing

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
    const lessonDirectoryMap: { [key: string]: { dir: string; testFile: string; expectedContractName: string } } = {
        'solidity-101': { dir: 'HelloWorld', testFile: 'HelloWorld.t.sol', expectedContractName: 'HelloWorld' },
        'HelloWorld': { dir: 'HelloWorld', testFile: 'HelloWorld.t.sol', expectedContractName: 'HelloWorld' },
        'HomePage': { dir: 'HelloWorld', testFile: 'HelloWorld.t.sol', expectedContractName: 'HelloWorld' },
        'integers-and-unsigned-integers': { dir: 'IntegersAndUnsignedIntegers', testFile: 'IntegersAndUnsignedIntegers.t.sol', expectedContractName: 'IntegerBasics' },
        'understanding-variables-and-types': { dir: 'UnderstandingVariablesAndTypes', testFile: 'UnderstandingVariablesAndTypes.t.sol', expectedContractName: 'VariableTypes' },
        'state-and-local-variables': { dir: 'StateAndLocalVariables', testFile: 'StateAndLocalVariables.t.sol', expectedContractName: 'StateAndLocalVariables' },
        'understanding-functions': { dir: 'UnderstandingFunctions', testFile: 'UnderstandingFunctions.t.sol', expectedContractName: 'SimpleFunctions' },
        'global-variables': { dir: 'StateAndLocalVariables', testFile: 'StateAndLocalVariables.t.sol', expectedContractName: 'StateAndLocalVariables' }
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

    const userContractName = extractContractName(code);
    if (!userContractName) {
        return res.status(400).json({ error: 'Could not extract contract name from provided Solidity code.' });
    }

    // Use the expected contract name for this lesson
    const expectedContractName = lessonMapping.expectedContractName;

    // Replace the user's contract name with the expected contract name
    const codeWithCorrectContractName = code.replace(
        new RegExp(`contract\\s+${userContractName}`, 'g'),
        `contract ${expectedContractName}`
    );

    // Update test code import paths
    const normalizedTestCode = testCode.replace(/\r\n/g, '\n');
    const importRegex = new RegExp(`import \"[^\"]*/${expectedContractName}\\.sol\";`, 'g');
    const updatedTestCode = normalizedTestCode.replace(importRegex, `import \"user_contract/${expectedContractName}.sol\";`);

    try {
        console.log('🐳 Attempting Docker-based Foundry test...');

        const result = await runFoundryInDocker(codeWithCorrectContractName, updatedTestCode, expectedContractName, lessonMapping);

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
