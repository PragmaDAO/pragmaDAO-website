"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var child_process_1 = require("child_process");
var fs = require("fs");
var path = require("path");
var util_1 = require("util");
var client_1 = require("@prisma/client"); // Import PrismaClient
var prisma = new client_1.PrismaClient(); // Instantiate PrismaClient
var router = (0, express_1.Router)();
var mkdtempAsync = (0, util_1.promisify)(fs.mkdtemp);
var writeFileAsync = (0, util_1.promisify)(fs.writeFile);
var readFileAsync = (0, util_1.promisify)(fs.readFile);
var rmAsync = (0, util_1.promisify)(fs.rm);
var mkdirAsync = (0, util_1.promisify)(fs.mkdir);
// This command now works because the Dockerfile installs forge to /usr/local/bin,
// which is in the PATH for all users.
var execCommand = function (command, cwd) {
    return new Promise(function (resolve, reject) {
        // Ensure Foundry binaries are in PATH for production environments
        var env = __assign(__assign({}, process.env), { PATH: "/usr/local/bin:".concat(process.env.HOME, "/.foundry/bin:").concat(process.env.PATH) });
        (0, child_process_1.exec)(command, { cwd: cwd, env: env }, function (error, stdout, stderr) {
            if (error) {
                reject({ message: error.message, stdout: stdout, stderr: stderr });
            }
            else {
                resolve({ stdout: stdout, stderr: stderr });
            }
        });
    });
};
// Function to extract contract name from Solidity code
var extractContractName = function (solidityCode) {
    var match = solidityCode.match(/contract\s+(\w+)\s*{/);
    return match ? match[1] : null;
};
// Simple test route
router.get('/test', function (_req, res) {
    res.json({ message: 'Test route working', timestamp: new Date().toISOString() });
});
// Debug route to check Docker availability
router.get('/docker-status', function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var status, stdout, e_1, stdout, e_2, stdout, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = {
                    environment: {
                        NODE_ENV: process.env.NODE_ENV,
                        platform: process.platform,
                        arch: process.arch
                    },
                    docker: {}
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var env = __assign(__assign({}, process.env), { PATH: "/usr/local/bin:".concat(process.env.HOME, "/.foundry/bin:").concat(process.env.PATH) });
                        (0, child_process_1.exec)('which docker', { env: env }, function (error, stdout, stderr) {
                            if (error) {
                                reject({ message: error.message, stdout: stdout, stderr: stderr });
                            }
                            else {
                                resolve({ stdout: stdout, stderr: stderr });
                            }
                        });
                    })];
            case 2:
                stdout = (_a.sent()).stdout;
                status.docker.path = stdout.trim();
                status.docker.available = true;
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                status.docker.available = false;
                status.docker.error = e_1.message;
                return [3 /*break*/, 4];
            case 4:
                if (!status.docker.available) return [3 /*break*/, 8];
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var env = __assign(__assign({}, process.env), { PATH: "/usr/local/bin:".concat(process.env.HOME, "/.foundry/bin:").concat(process.env.PATH) });
                        (0, child_process_1.exec)('docker --version', { env: env }, function (error, stdout, stderr) {
                            if (error) {
                                reject({ message: error.message, stdout: stdout, stderr: stderr });
                            }
                            else {
                                resolve({ stdout: stdout, stderr: stderr });
                            }
                        });
                    })];
            case 6:
                stdout = (_a.sent()).stdout;
                status.docker.version = stdout.trim();
                return [3 /*break*/, 8];
            case 7:
                e_2 = _a.sent();
                status.docker.versionError = e_2.message;
                return [3 /*break*/, 8];
            case 8:
                if (!status.docker.available) return [3 /*break*/, 12];
                _a.label = 9;
            case 9:
                _a.trys.push([9, 11, , 12]);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var env = __assign(__assign({}, process.env), { PATH: "/usr/local/bin:".concat(process.env.HOME, "/.foundry/bin:").concat(process.env.PATH) });
                        (0, child_process_1.exec)('docker run --rm hello-world', { timeout: 10000, env: env }, function (error, stdout, stderr) {
                            if (error) {
                                reject({ message: error.message, stdout: stdout, stderr: stderr });
                            }
                            else {
                                resolve({ stdout: stdout, stderr: stderr });
                            }
                        });
                    })];
            case 10:
                stdout = (_a.sent()).stdout;
                status.docker.canRun = true;
                status.docker.testOutput = stdout.substring(0, 200) + '...';
                return [3 /*break*/, 12];
            case 11:
                e_3 = _a.sent();
                status.docker.canRun = false;
                status.docker.runError = e_3.message;
                return [3 /*break*/, 12];
            case 12:
                res.json(status);
                return [2 /*return*/];
        }
    });
}); });
// Debug route to check Foundry availability
router.get('/foundry-status', function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var possiblePaths, status, _i, possiblePaths_1, path_1, forgePath, stdout, e_4, e_5, stdout, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                possiblePaths = [
                    "".concat(process.env.HOME, "/.foundry/bin"),
                    '/usr/local/bin',
                    '/usr/bin',
                    '/bin',
                    '/app/.foundry/bin'
                ];
                status = {
                    environment: {
                        HOME: process.env.HOME,
                        PATH: process.env.PATH,
                        NODE_ENV: process.env.NODE_ENV
                    },
                    foundryLocations: {}
                };
                _i = 0, possiblePaths_1 = possiblePaths;
                _a.label = 1;
            case 1:
                if (!(_i < possiblePaths_1.length)) return [3 /*break*/, 9];
                path_1 = possiblePaths_1[_i];
                forgePath = "".concat(path_1, "/forge");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 7, , 8]);
                fs.accessSync(forgePath, fs.constants.F_OK);
                status.foundryLocations[path_1] = 'exists';
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, execCommand("".concat(forgePath, " --version"), process.cwd())];
            case 4:
                stdout = (_a.sent()).stdout;
                status.foundryLocations[path_1] = { exists: true, version: stdout.trim() };
                return [3 /*break*/, 6];
            case 5:
                e_4 = _a.sent();
                status.foundryLocations[path_1] = { exists: true, version: 'error getting version' };
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 8];
            case 7:
                e_5 = _a.sent();
                status.foundryLocations[path_1] = 'not found';
                return [3 /*break*/, 8];
            case 8:
                _i++;
                return [3 /*break*/, 1];
            case 9:
                _a.trys.push([9, 11, , 12]);
                return [4 /*yield*/, execCommand('which forge', process.cwd())];
            case 10:
                stdout = (_a.sent()).stdout;
                status.whichForge = stdout.trim();
                return [3 /*break*/, 12];
            case 11:
                e_6 = _a.sent();
                status.whichForge = 'not found';
                return [3 /*break*/, 12];
            case 12:
                res.json(status);
                return [2 /*return*/];
        }
    });
}); });
// Import the external Docker-based testing function
function runFoundryInDocker(userCode, testCode, contractName) {
    return __awaiter(this, void 0, void 0, function () {
        var tempDir, srcDir, testDir, foundryToml, dockerCommand_1, _a, stdout, stderr, passed, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mkdtempAsync(path.join(require('os').tmpdir(), 'pragma-docker-'))];
                case 1:
                    tempDir = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 9, 10, 12]);
                    srcDir = path.join(tempDir, 'src');
                    testDir = path.join(tempDir, 'test');
                    return [4 /*yield*/, mkdirAsync(srcDir, { recursive: true })];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, mkdirAsync(testDir, { recursive: true })];
                case 4:
                    _b.sent();
                    foundryToml = "[profile.default]\nsrc = \"src\"\nout = \"out\"\nlibs = [\"lib\"]\nremappings = [\"user_contract/=src/\"]\n\n[rpc_endpoints]\nmainnet = \"https://eth-mainnet.alchemyapi.io/v2/YOUR_API_KEY\"\n";
                    return [4 /*yield*/, writeFileAsync(path.join(tempDir, 'foundry.toml'), foundryToml)];
                case 5:
                    _b.sent();
                    // Write user contract
                    return [4 /*yield*/, writeFileAsync(path.join(srcDir, "".concat(contractName, ".sol")), userCode)];
                case 6:
                    // Write user contract
                    _b.sent();
                    // Write test file (Note: This function should receive proper lesson info)
                    return [4 /*yield*/, writeFileAsync(path.join(testDir, "".concat(contractName, ".t.sol")), testCode)];
                case 7:
                    // Write test file (Note: This function should receive proper lesson info)
                    _b.sent();
                    dockerCommand_1 = "docker run --rm -v \"".concat(tempDir, ":/workspace\" -w /workspace ghcr.io/foundry-rs/foundry:latest forge test -vvv");
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            // Ensure Foundry binaries are in PATH for Docker commands too
                            var env = __assign(__assign({}, process.env), { PATH: "/usr/local/bin:".concat(process.env.HOME, "/.foundry/bin:").concat(process.env.PATH) });
                            (0, child_process_1.exec)(dockerCommand_1, { timeout: 30000, env: env }, function (error, stdout, stderr) {
                                if (error) {
                                    reject({ message: error.message, stdout: stdout, stderr: stderr });
                                }
                                else {
                                    resolve({ stdout: stdout, stderr: stderr });
                                }
                            });
                        })];
                case 8:
                    _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr;
                    passed = stdout.includes('1 passed') && !stdout.includes('0 failed');
                    return [2 /*return*/, {
                            success: true,
                            output: stdout,
                            passed: passed
                        }];
                case 9:
                    error_1 = _b.sent();
                    console.log('Docker forge test failed:', error_1);
                    return [2 /*return*/, {
                            success: false,
                            output: "Docker test failed: ".concat(error_1.message, "\n\nSTDOUT: ").concat(error_1.stdout, "\nSTDERR: ").concat(error_1.stderr),
                            passed: false
                        }];
                case 10: return [4 /*yield*/, rmAsync(tempDir, { recursive: true, force: true })];
                case 11:
                    _b.sent();
                    return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
router.post('/test-solidity', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, code, lessonId, lessonDirectoryMap, lessonMapping, originalTestFilePath, expectedContractName, userContractName, codeWithCorrectContractName, originalTestCode, normalizedOriginalTestCode, importRegex, updatedTestCode, tempDir, result, tempSrcDir, tempTestDir, foundryTomlContent, testOutput, passed, error_2, userId, err_1, output;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, code = _a.code, lessonId = _a.lessonId;
                if (!code || !lessonId) {
                    return [2 /*return*/, res.status(400).json({ error: 'Solidity code and lessonId are required.' })];
                }
                lessonDirectoryMap = {
                    'solidity-101': { dir: 'HelloWorld', testFile: 'HelloWorld.t.sol', expectedContractName: 'HelloWorld' },
                    'HelloWorld': { dir: 'HelloWorld', testFile: 'HelloWorld.t.sol', expectedContractName: 'HelloWorld' },
                    'HomePage': { dir: 'HelloWorld', testFile: 'HelloWorld.t.sol', expectedContractName: 'HelloWorld' },
                    'integers-and-unsigned-integers': { dir: 'IntegersAndUnsignedIntegers', testFile: 'IntegersAndUnsignedIntegers.t.sol', expectedContractName: 'IntegerBasics' },
                    'understanding-variables-and-types': { dir: 'UnderstandingVariablesAndTypes', testFile: 'UnderstandingVariablesAndTypes.t.sol', expectedContractName: 'VariableTypes' },
                    'state-and-local-variables': { dir: 'StateAndLocalVariables', testFile: 'StateAndLocalVariables.t.sol', expectedContractName: 'StateAndLocalVariables' },
                    'understanding-functions': { dir: 'UnderstandingFunctions', testFile: 'UnderstandingFunctions.t.sol', expectedContractName: 'SimpleFunctions' },
                    'global-variables': { dir: 'StateAndLocalVariables', testFile: 'StateAndLocalVariables.t.sol', expectedContractName: 'StateAndLocalVariables' }
                };
                lessonMapping = lessonDirectoryMap[lessonId];
                if (!lessonMapping) {
                    return [2 /*return*/, res.status(400).json({ error: "Unknown lesson ID: ".concat(lessonId) })];
                }
                // Force pragma to be ^0.8.26 to match the test files
                code = code.replace(/pragma solidity .*/, 'pragma solidity ^0.8.26;');
                originalTestFilePath = path.join(__dirname, '..', '..', 'forge_base_project', 'test', lessonMapping.dir, lessonMapping.testFile);
                if (!fs.existsSync(originalTestFilePath)) {
                    return [2 /*return*/, res.status(400).json({ error: "No test file found for lesson: ".concat(lessonId, " at ").concat(originalTestFilePath) })];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 18, , 19]);
                expectedContractName = lessonMapping.expectedContractName;
                userContractName = extractContractName(code);
                if (!userContractName) {
                    return [2 /*return*/, res.status(400).json({ error: 'Could not extract contract name from provided Solidity code.' })];
                }
                codeWithCorrectContractName = code.replace(new RegExp("contracts+".concat(userContractName), 'g'), "contract ".concat(expectedContractName));
                return [4 /*yield*/, readFileAsync(originalTestFilePath, 'utf8')];
            case 2:
                originalTestCode = _c.sent();
                normalizedOriginalTestCode = originalTestCode.replace(/\r\n/g, '\n');
                importRegex = new RegExp("import \"([^\"]*".concat(expectedContractName, "\\.sol)\";"), 'g');
                updatedTestCode = normalizedOriginalTestCode.replace(importRegex, "import \"user_contract/".concat(expectedContractName, ".sol\";"));
                console.log('🔨 Using pre-installed Foundry in container...');
                return [4 /*yield*/, mkdtempAsync(path.join(require('os').tmpdir(), 'pragma-forge-'))];
            case 3:
                tempDir = _c.sent();
                result = void 0;
                _c.label = 4;
            case 4:
                _c.trys.push([4, 11, , 14]);
                // Initialize forge project
                return [4 /*yield*/, execCommand('forge init --no-git', tempDir)];
            case 5:
                // Initialize forge project
                _c.sent();
                tempSrcDir = path.join(tempDir, 'src');
                tempTestDir = path.join(tempDir, 'test');
                // Write user contract with correct contract name
                return [4 /*yield*/, writeFileAsync(path.join(tempSrcDir, "".concat(expectedContractName, ".sol")), codeWithCorrectContractName)];
            case 6:
                // Write user contract with correct contract name
                _c.sent();
                // Write test file
                return [4 /*yield*/, writeFileAsync(path.join(tempTestDir, lessonMapping.testFile), updatedTestCode)];
            case 7:
                // Write test file
                _c.sent();
                foundryTomlContent = "[profile.default]\nsrc = \"src\"\nout = \"out\"\nlibs = [\"lib\"]\nremappings = [\"user_contract/=src/\"]";
                return [4 /*yield*/, writeFileAsync(path.join(tempDir, 'foundry.toml'), foundryTomlContent)];
            case 8:
                _c.sent();
                return [4 /*yield*/, execCommand("forge test --match-path \"*".concat(lessonMapping.testFile, "\" -vvv"), tempDir)];
            case 9:
                testOutput = (_c.sent()).stdout;
                passed = testOutput.includes('1 passed') || (testOutput.includes('passed') && !testOutput.includes('0 passed'));
                result = {
                    success: true,
                    output: testOutput,
                    passed: passed,
                    method: 'forge-native'
                };
                // Clean up
                return [4 /*yield*/, rmAsync(tempDir, { recursive: true, force: true })];
            case 10:
                // Clean up
                _c.sent();
                return [3 /*break*/, 14];
            case 11:
                error_2 = _c.sent();
                if (!tempDir) return [3 /*break*/, 13];
                return [4 /*yield*/, rmAsync(tempDir, { recursive: true, force: true })];
            case 12:
                _c.sent();
                _c.label = 13;
            case 13: throw error_2;
            case 14:
                userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
                if (!userId) return [3 /*break*/, 16];
                return [4 /*yield*/, prisma.userSubmittedCode.create({
                        data: {
                            userId: userId,
                            lessonId: lessonId,
                            code: code,
                            testResults: result.output,
                            passed: result.passed
                        }
                    })];
            case 15:
                _c.sent();
                return [3 /*break*/, 17];
            case 16:
                console.warn('User ID not found in request. Code submission not saved.');
                _c.label = 17;
            case 17:
                console.log('Docker Forge Test Output (backend):', result.output);
                res.json({
                    success: result.success,
                    output: result.output,
                    passed: result.passed,
                    method: 'docker',
                    backend: 'LOCAL_FIXED_BACKEND',
                    timestamp: new Date().toISOString()
                });
                return [3 /*break*/, 19];
            case 18:
                err_1 = _c.sent();
                console.error('Error processing Solidity test:', err_1);
                output = "Error: ".concat(err_1.message);
                if (err_1.stdout || err_1.stderr) {
                    output = err_1.stdout ? err_1.stdout : err_1.stderr;
                }
                res.status(500).json({
                    success: false,
                    output: output,
                    error: err_1.message,
                    passed: false,
                    backend: 'LOCAL_FIXED_BACKEND',
                    timestamp: new Date().toISOString()
                });
                return [3 /*break*/, 19];
            case 19: return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
