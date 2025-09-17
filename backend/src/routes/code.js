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
var client_1 = require("@prisma/client");
var archiver_1 = require("archiver");
var jsonwebtoken_1 = require("jsonwebtoken"); // Added
var JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Added
// Middleware to verify JWT token (Copied from profile.ts)
var authenticateToken = function (req, res, next) {
    var authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401); // No token
    jsonwebtoken_1["default"].verify(token, JWT_SECRET, function (err, user) {
        if (err)
            return res.sendStatus(403); // Invalid token
        req.user = user; // Attach user payload to request
        next();
    });
};
var router = (0, express_1.Router)();
var prisma = new client_1.PrismaClient();
// POST /api/code - Save or update user code for a lesson
router.post('/', authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, lessonId, code, userId, userCode, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, lessonId = _a.lessonId, code = _a.code;
                userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
                if (!userId) {
                    return [2 /*return*/, res.status(401).json({ message: 'Unauthorized' })];
                }
                if (!lessonId || code === undefined) {
                    return [2 /*return*/, res.status(400).json({ message: 'lessonId and code are required' })];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.userCode.upsert({
                        where: {
                            userId_lessonId: {
                                userId: userId,
                                lessonId: lessonId
                            }
                        },
                        update: {
                            code: code
                        },
                        create: {
                            userId: userId,
                            lessonId: lessonId,
                            code: code
                        }
                    })];
            case 2:
                userCode = _c.sent();
                res.status(200).json(userCode);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _c.sent();
                console.error('Error saving user code:', error_1);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// GET /api/code/:lessonId - Retrieve user code for a lesson
router.get('/:lessonId', authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lessonId, userId, userCode, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                lessonId = req.params.lessonId;
                userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return [2 /*return*/, res.status(401).json({ message: 'Unauthorized' })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.userCode.findUnique({
                        where: {
                            userId_lessonId: {
                                userId: userId,
                                lessonId: lessonId
                            }
                        }
                    })];
            case 2:
                userCode = _b.sent();
                if (userCode) {
                    res.status(200).json({ code: userCode.code });
                }
                else {
                    res.status(404).json({ message: 'Code not found for this lesson and user' });
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error('Error retrieving user code:', error_2);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/download', authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userCodeSnippets, archive_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.id;
                if (!userId) {
                    return [2 /*return*/, res.status(401).json({ message: 'Unauthorized: User ID not found.' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.userSubmittedCode.findMany({
                        where: { userId: userId },
                        select: { code: true, lessonId: true, submissionTime: true }
                    })];
            case 2:
                userCodeSnippets = _a.sent();
                if (userCodeSnippets.length === 0) {
                    return [2 /*return*/, res.status(404).json({ message: 'No code snippets found for this user.' })];
                }
                archive_1 = (0, archiver_1["default"])('zip', {
                    zlib: { level: 9 } // Sets the compression level.
                });
                // Set the archive name
                res.attachment('user_code.zip');
                // Pipe the archive data to the response
                archive_1.pipe(res);
                // Append code snippets to the archive
                userCodeSnippets.forEach(function (snippet, index) {
                    var _a;
                    var filename = "lesson_".concat(snippet.lessonId, "_").concat(((_a = snippet.submissionTime) === null || _a === void 0 ? void 0 : _a.toISOString().replace(/[:.]/g, '-')) || index, ".sol");
                    archive_1.append(snippet.code, { name: filename });
                });
                // Finalize the archive (this step finishes the archive process and closes the stream)
                archive_1.finalize();
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error('Error downloading user code:', error_3);
                res.status(500).json({ message: 'Internal server error.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// POST /api/code/batch - Save multiple lessons in one request
router.post('/batch', authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var saves, userId, results, _i, saves_1, save, lessonId, code, userCode, error_4, successCount, error_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                saves = req.body.saves;
                userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return [2 /*return*/, res.status(401).json({ message: 'Unauthorized' })];
                }
                if (!Array.isArray(saves) || saves.length === 0) {
                    return [2 /*return*/, res.status(400).json({ message: 'saves array is required and must not be empty' })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                console.log("Processing batch save for user ".concat(userId, ": ").concat(saves.length, " lessons"));
                results = [];
                _i = 0, saves_1 = saves;
                _b.label = 2;
            case 2:
                if (!(_i < saves_1.length)) return [3 /*break*/, 7];
                save = saves_1[_i];
                lessonId = save.lessonId, code = save.code;
                if (!lessonId || code === undefined) {
                    results.push({ lessonId: lessonId, error: 'lessonId and code are required' });
                    return [3 /*break*/, 6];
                }
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, prisma.userCode.upsert({
                        where: {
                            userId_lessonId: {
                                userId: userId,
                                lessonId: lessonId
                            }
                        },
                        update: {
                            code: code
                        },
                        create: {
                            userId: userId,
                            lessonId: lessonId,
                            code: code
                        }
                    })];
            case 4:
                userCode = _b.sent();
                results.push({ lessonId: lessonId, success: true, id: userCode.id });
                console.log("Batch saved lesson ".concat(lessonId, " for user ").concat(userId));
                return [3 /*break*/, 6];
            case 5:
                error_4 = _b.sent();
                console.error("Error saving lesson ".concat(lessonId, " for user ").concat(userId, ":"), error_4);
                results.push({ lessonId: lessonId, error: 'Database error' });
                return [3 /*break*/, 6];
            case 6:
                _i++;
                return [3 /*break*/, 2];
            case 7:
                successCount = results.filter(function (r) { return r.success; }).length;
                console.log("Batch save completed: ".concat(successCount, "/").concat(saves.length, " successful"));
                res.status(200).json({
                    message: "Batch save completed: ".concat(successCount, "/").concat(saves.length, " successful"),
                    results: results
                });
                return [3 /*break*/, 9];
            case 8:
                error_5 = _b.sent();
                console.error('Error in batch save:', error_5);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
