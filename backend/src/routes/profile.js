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
exports.authenticateToken = void 0;
var express_1 = require("express");
var client_1 = require("@prisma/client");
var jsonwebtoken_1 = require("jsonwebtoken");
var bcryptjs_1 = require("bcryptjs"); // Import bcryptjs
var prisma = new client_1.PrismaClient();
var router = express_1["default"].Router();
var JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
// Middleware to verify JWT token
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
exports.authenticateToken = authenticateToken;
// GET user profile
router.get('/profile', exports.authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, hasPassword, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.user.id;
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { id: userId },
                        select: { id: true, username: true, email: true, createdAt: true, password: true, referralCode: true }
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                hasPassword = user.password !== null;
                console.log("User ".concat(user.username, " hasPassword: ").concat(hasPassword, ", password value: ").concat(user.password));
                // Return user data along with the hasPassword flag
                res.json(__assign(__assign({}, user), { hasPassword: hasPassword, password: undefined })); // Exclude password from response
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Error fetching user profile:', error_1);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// PUT update user profile
router.put('/profile', exports.authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, username, existingUser, updatedUser, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userId = req.user.id;
                username = req.body.username;
                if (!username) {
                    return [2 /*return*/, res.status(400).json({ message: 'Username is required' })];
                }
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { username: username }
                    })];
            case 1:
                existingUser = _a.sent();
                if (existingUser && existingUser.id !== userId) {
                    return [2 /*return*/, res.status(409).json({ message: 'Username already taken' })];
                }
                return [4 /*yield*/, prisma.user.update({
                        where: { id: userId },
                        data: { username: username },
                        select: { id: true, username: true, email: true, createdAt: true }
                    })];
            case 2:
                updatedUser = _a.sent();
                res.json(updatedUser);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error('Error updating user profile:', error_2);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// PUT update user password
router.put('/profile/password', exports.authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, currentPassword, newPassword, confirmNewPassword, user, isPasswordValid, hashedNewPassword, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                userId = req.user.id;
                _a = req.body, currentPassword = _a.currentPassword, newPassword = _a.newPassword, confirmNewPassword = _a.confirmNewPassword;
                if (!currentPassword || !newPassword || !confirmNewPassword) {
                    return [2 /*return*/, res.status(400).json({ message: 'All password fields are required' })];
                }
                if (newPassword !== confirmNewPassword) {
                    return [2 /*return*/, res.status(400).json({ message: 'New password and confirmation do not match' })];
                }
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { id: userId }
                    })];
            case 1:
                user = _b.sent();
                if (!user || !user.password) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found or no password set' })];
                }
                return [4 /*yield*/, bcryptjs_1["default"].compare(currentPassword, user.password)];
            case 2:
                isPasswordValid = _b.sent();
                if (!isPasswordValid) {
                    return [2 /*return*/, res.status(401).json({ message: 'Invalid current password' })];
                }
                return [4 /*yield*/, bcryptjs_1["default"].hash(newPassword, 10)];
            case 3:
                hashedNewPassword = _b.sent();
                // Update password in database
                return [4 /*yield*/, prisma.user.update({
                        where: { id: userId },
                        data: { password: hashedNewPassword }
                    })];
            case 4:
                // Update password in database
                _b.sent();
                res.status(200).json({ message: 'Password updated successfully' });
                return [3 /*break*/, 6];
            case 5:
                error_3 = _b.sent();
                console.error('Error updating password:', error_3);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
