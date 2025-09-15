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
        // Try to find forge in common locations (including Docker container paths)
        const possiblePaths = [
            '/root/.foundry/bin',           // Docker container default
            `${process.env.HOME}/.foundry/bin`,
            '/tmp/.foundry/bin',
            '/opt/render/.foundry/bin',
            '/usr/local/bin',
            '/usr/bin',
            '/bin',
            '/app/.foundry/bin'
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


// Simple test route
router.get('/test', (_req: Request, res: Response) => {
    res.json({ message: 'Test route working', timestamp: new Date().toISOString() });
});

// Debug route to check Docker availability
router.get('/docker-status', async (_req: Request, res: Response) => {
    const status: any = {
        environment: {
            NODE_ENV: process.env.NODE_ENV,
            platform: process.platform,
            arch: process.arch
        },
        docker: {}
    };

    // Check if docker command exists
    try {
        const { stdout } = await new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
            exec('which docker', (error, stdout, stderr) => {
                if (error) {
                    reject({ message: error.message, stdout, stderr });
                } else {
                    resolve({ stdout, stderr });
                }
            });
        });
        status.docker.path = stdout.trim();
        status.docker.available = true;
    } catch (e: any) {
        status.docker.available = false;
        status.docker.error = e.message;
    }

    // Try to get docker version
    if (status.docker.available) {
        try {
            const { stdout } = await new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
                exec('docker --version', (error, stdout, stderr) => {
                    if (error) {
                        reject({ message: error.message, stdout, stderr });
                    } else {
                        resolve({ stdout, stderr });
                    }
                });
            });
            status.docker.version = stdout.trim();
        } catch (e: any) {
            status.docker.versionError = e.message;
        }
    }

    // Test if we can run a simple docker command
    if (status.docker.available) {
        try {
            const { stdout } = await new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
                exec('docker run --rm hello-world', { timeout: 10000 }, (error, stdout, stderr) => {
                    if (error) {
                        reject({ message: error.message, stdout, stderr });
                    } else {
                        resolve({ stdout, stderr });
                    }
                });
            });
            status.docker.canRun = true;
            status.docker.testOutput = stdout.substring(0, 200) + '...';
        } catch (e: any) {
            status.docker.canRun = false;
            status.docker.runError = e.message;
        }
    }

    res.json(status);
});

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

// Import the external Docker-based testing function
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

    try {
        // Extract contract name from user's code
        const contractName = extractContractName(code);
        if (!contractName) {
            return res.status(400).json({ error: 'Could not extract contract name from provided Solidity code.' });
        }

        // Read the original test file
        const originalTestCode = await readFileAsync(originalTestFilePath, 'utf8');
        const normalizedOriginalTestCode = originalTestCode.replace(/\r\n/g, '\n');

        // Replace import paths with user_contract/ remapping
        const importRegex = new RegExp(`import "([^"]*${contractName}\\.sol)";`, 'g');
        const updatedTestCode = normalizedOriginalTestCode.replace(importRegex, `import "user_contract/${contractName}.sol";`);

        console.log('🔨 Using pre-installed Foundry in container...');

        // Create temporary directory for test execution
        const tempDir = await mkdtempAsync(path.join(require('os').tmpdir(), 'pragma-forge-'));
        let result;

        try {
            // Initialize forge project
            await execCommand('forge init --no-git', tempDir);

            const tempSrcDir = path.join(tempDir, 'src');
            const tempTestDir = path.join(tempDir, 'test');

            // Write user contract
            await writeFileAsync(path.join(tempSrcDir, `${contractName}.sol`), code);

            // Write test file
            await writeFileAsync(path.join(tempTestDir, `${contractName}.t.sol`), updatedTestCode);

            // Configure foundry.toml with user_contract remapping
            const foundryTomlContent = `[profile.default]
src = "src"
out = "out"
libs = ["lib"]
remappings = ["user_contract/=src/"]`;
            await writeFileAsync(path.join(tempDir, 'foundry.toml'), foundryTomlContent);

            // Run tests
            const { stdout: testOutput } = await execCommand(`forge test --match-path "*${contractName}.t.sol" -vvv`, tempDir);
            const passed = testOutput.includes('1 passed') || (testOutput.includes('passed') && !testOutput.includes('0 passed'));

            result = {
                success: true,
                output: testOutput,
                passed,
                method: 'forge-native'
            };

            // Clean up
            await rmAsync(tempDir, { recursive: true, force: true });
        } catch (error: any) {
            // Clean up on error
            if (tempDir) {
                await rmAsync(tempDir, { recursive: true, force: true });
            }
            throw error;
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
        } else {
            console.warn('User ID not found in request. Code submission not saved.');
        }

        console.log('Docker Forge Test Output (backend):', result.output);
        res.json({
            success: result.success,
            output: result.output,
            passed: result.passed,
            method: 'docker'
        });

    } catch (err: any) {
        console.error('Error processing Solidity test:', err);
        res.status(500).json({
            success: false,
            output: `Error: ${err.message}`,
            error: err.message,
        });
    }
});

export default router;
