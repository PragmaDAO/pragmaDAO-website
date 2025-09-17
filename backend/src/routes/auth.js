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
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var prisma = new client_1.PrismaClient();
var router = express_1["default"].Router();
// Secret for JWT - In a real app, this should be in an environment variable
var JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
// Register Route
router.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, email, referrerId, existingUserByUsername, existingUserByEmail, hashedPassword, newReferralCode, user, referrer, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password, email = _a.email, referrerId = _a.referrerId;
                if (!username || !password || !email) {
                    return [2 /*return*/, res.status(400).json({ message: 'Username, password, and email are required' })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 9, , 10]);
                return [4 /*yield*/, prisma.user.findUnique({ where: { username: username } })];
            case 2:
                existingUserByUsername = _b.sent();
                if (existingUserByUsername) {
                    return [2 /*return*/, res.status(409).json({ message: 'Username already taken' })];
                }
                return [4 /*yield*/, prisma.user.findUnique({ where: { email: email } })];
            case 3:
                existingUserByEmail = _b.sent();
                if (existingUserByEmail) {
                    return [2 /*return*/, res.status(409).json({ message: 'Email already registered' })];
                }
                return [4 /*yield*/, bcryptjs_1["default"].hash(password, 10)];
            case 4:
                hashedPassword = _b.sent();
                newReferralCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            username: username,
                            email: email,
                            password: hashedPassword,
                            referrerId: referrerId || null,
                            referralCode: newReferralCode
                        }
                    })];
            case 5:
                user = _b.sent();
                if (!referrerId) return [3 /*break*/, 8];
                return [4 /*yield*/, prisma.user.findUnique({ where: { id: referrerId } })];
            case 6:
                referrer = _b.sent();
                if (!referrer) return [3 /*break*/, 8];
                return [4 /*yield*/, prisma.referral.create({
                        data: {
                            referrerId: referrer.id,
                            referredId: user.id,
                            referralCode: newReferralCode,
                            status: 'PENDING'
                        }
                    })];
            case 7:
                _b.sent();
                _b.label = 8;
            case 8:
                res.status(201).json({ message: 'User registered successfully', userId: user.id });
                return [3 /*break*/, 10];
            case 9:
                error_1 = _b.sent();
                console.error('Registration error:', error_1);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); });
// Login Route
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, identifier, password, user, isPasswordValid, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log('Login route hit');
                console.log('Request body:', req.body);
                _a = req.body, identifier = _a.identifier, password = _a.password;
                if (!identifier || !password) {
                    return [2 /*return*/, res.status(400).json({ message: 'Identifier and password are required' })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                user = void 0;
                if (!identifier.includes('@')) return [3 /*break*/, 3];
                return [4 /*yield*/, prisma.user.findUnique({ where: { email: identifier } })];
            case 2:
                user = _b.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, prisma.user.findUnique({ where: { username: identifier } })];
            case 4:
                user = _b.sent();
                _b.label = 5;
            case 5:
                if (!user) {
                    console.log('User not found');
                    return [2 /*return*/, res.status(401).json({ message: 'Invalid credentials' })];
                }
                // Compare password
                if (!user.password) {
                    console.log('User has no password');
                    return [2 /*return*/, res.status(401).json({ message: 'Invalid credentials' })];
                }
                return [4 /*yield*/, bcryptjs_1["default"].compare(password, user.password)];
            case 6:
                isPasswordValid = _b.sent();
                console.log("Password validation result for user ".concat(user.username, ": ").concat(isPasswordValid));
                if (!isPasswordValid) {
                    console.log('Password invalid');
                    return [2 /*return*/, res.status(401).json({ message: 'Invalid credentials' })];
                }
                token = jsonwebtoken_1["default"].sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ message: 'Logged in successfully', token: token });
                return [3 /*break*/, 8];
            case 7:
                error_2 = _b.sent();
                console.error('Login error:', error_2);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
