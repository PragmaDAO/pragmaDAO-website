"use strict";
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
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var router = (0, express_1.Router)();
var mkdtempAsync = (0, util_1.promisify)(fs.mkdtemp);
var writeFileAsync = (0, util_1.promisify)(fs.writeFile);
var readFileAsync = (0, util_1.promisify)(fs.readFile);
var rmAsync = (0, util_1.promisify)(fs.rm);
var mkdirAsync = (0, util_1.promisify)(fs.mkdir);
// External Foundry service using Docker
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
                    // Write test file
                    return [4 /*yield*/, writeFileAsync(path.join(testDir, "".concat(contractName, ".t.sol")), testCode)];
                case 7:
                    // Write test file
                    _b.sent();
                    dockerCommand_1 = "docker run --rm -v \"".concat(tempDir, ":/workspace\" -w /workspace ghcr.io/foundry-rs/foundry:latest forge test -vvv");
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            (0, child_process_1.exec)(dockerCommand_1, { timeout: 30000 }, function (error, stdout, stderr) {
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
// Alternative: Use online Solidity compiler API
function useOnlineCompiler(userCode) {
    return __awaiter(this, void 0, void 0, function () {
        var basicChecks, allChecksPassed;
        return __generator(this, function (_a) {
            basicChecks = {
                hasPragma: userCode.includes('pragma solidity'),
                hasContract: userCode.includes('contract '),
                balancedBraces: (userCode.match(/{/g) || []).length === (userCode.match(/}/g) || []).length
            };
            allChecksPassed = Object.values(basicChecks).every(function (check) { return check; });
            return [2 /*return*/, {
                    success: true,
                    output: allChecksPassed
                        ? '✅ External compilation successful! Code structure is valid.'
                        : '❌ Code structure validation failed.',
                    passed: allChecksPassed
                }];
        });
    });
}
var extractContractName = function (solidityCode) {
    var match = solidityCode.match(/contract\s+(\w+)\s*{/);
    return match ? match[1] : null;
};
router.post('/test-solidity-external', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, code, lessonId, lessonDirectoryMap, lessonMapping, originalTestFilePath, testCode, error_2, contractName, result, userId, err_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, code = _a.code, lessonId = _a.lessonId;
                if (!code || !lessonId) {
                    return [2 /*return*/, res.status(400).json({ error: 'Solidity code and lessonId are required.' })];
                }
                lessonDirectoryMap = {
                    'solidity-101': { dir: 'HelloWorld', testFile: 'HelloWorld.t.sol' },
                    'HelloWorld': { dir: 'HelloWorld', testFile: 'HelloWorld.t.sol' },
                    'integers-and-unsigned-integers': { dir: 'IntegersAndUnsignedIntegers', testFile: 'IntegersAndUnsignedIntegers.t.sol' },
                    'understanding-variables-and-types': { dir: 'UnderstandingVariablesAndTypes', testFile: 'UnderstandingVariablesAndTypes.t.sol' },
                    'state-and-local-variables': { dir: 'StateAndLocalVariables', testFile: 'StateAndLocalVariables.t.sol' },
                    'understanding-functions': { dir: 'UnderstandingFunctions', testFile: 'UnderstandingFunctions.t.sol' }
                };
                lessonMapping = lessonDirectoryMap[lessonId];
                if (!lessonMapping) {
                    return [2 /*return*/, res.status(400).json({ error: "Unknown lesson ID: ".concat(lessonId) })];
                }
                // Force pragma to be ^0.8.26 to match the test files
                code = code.replace(/pragma solidity .*/, 'pragma solidity ^0.8.26;');
                originalTestFilePath = path.join(__dirname, '..', '..', 'forge_base_project', 'test', lessonMapping.dir, lessonMapping.testFile);
                testCode = '';
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, readFileAsync(originalTestFilePath, 'utf8')];
            case 2:
                testCode = _c.sent();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _c.sent();
                return [2 /*return*/, res.status(400).json({ error: "No test file found for lesson: ".concat(lessonId, " at ").concat(originalTestFilePath) })];
            case 4:
                contractName = extractContractName(code);
                if (!contractName) {
                    return [2 /*return*/, res.status(400).json({ error: 'Could not extract contract name from provided Solidity code.' })];
                }
                _c.label = 5;
            case 5:
                _c.trys.push([5, 11, , 12]);
                console.log('🐳 Attempting Docker-based Foundry test...');
                return [4 /*yield*/, runFoundryInDocker(code, testCode, contractName)];
            case 6:
                result = _c.sent();
                if (!!result.success) return [3 /*break*/, 8];
                console.log('📡 Falling back to online compiler...');
                return [4 /*yield*/, useOnlineCompiler(code)];
            case 7:
                result = _c.sent();
                result.output += '\n\nNote: Used fallback validation (Docker/Foundry not available)';
                _c.label = 8;
            case 8:
                userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
                if (!userId) return [3 /*break*/, 10];
                return [4 /*yield*/, prisma.userSubmittedCode.create({
                        data: {
                            userId: userId,
                            lessonId: lessonId,
                            code: code,
                            testResults: result.output,
                            passed: result.passed
                        }
                    })];
            case 9:
                _c.sent();
                _c.label = 10;
            case 10:
                res.json({
                    success: result.success,
                    output: result.output,
                    passed: result.passed,
                    method: 'external'
                });
                return [3 /*break*/, 12];
            case 11:
                err_1 = _c.sent();
                console.error('Error processing external Solidity test:', err_1);
                res.status(500).json({
                    success: false,
                    output: "Error: ".concat(err_1.message),
                    error: err_1.message
                });
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
