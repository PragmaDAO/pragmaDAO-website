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
var passport_1 = require("passport");
var jsonwebtoken_1 = require("jsonwebtoken");
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var router = express_1["default"].Router();
var JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
var FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
router.get('/github', passport_1["default"].authenticate('github', { scope: ['user:email'] }));
router.get('/google', passport_1["default"].authenticate('google', { scope: ['profile', 'email'] }));
router.get('/github/callback', passport_1["default"].authenticate('github', { failureRedirect: "".concat(process.env.FRONTEND_URL || 'http://localhost:3000', "/login") }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var githubUser, user, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                githubUser = req.user;
                if (!githubUser) {
                    return [2 /*return*/, res.redirect("".concat(FRONTEND_URL, "/login?error=oauth_failed"))];
                }
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { email: githubUser.emails[0].value }
                    })];
            case 1:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 3];
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            username: githubUser.username || githubUser.displayName,
                            email: githubUser.emails[0].value
                        }
                    })];
            case 2:
                user = _a.sent();
                _a.label = 3;
            case 3:
                token = jsonwebtoken_1["default"].sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
                res.redirect("".concat(FRONTEND_URL, "/?token=").concat(token, "&user=").concat(encodeURIComponent(JSON.stringify({ id: user.id, username: user.username, email: user.email }))));
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error('OAuth callback error:', error_1);
                res.redirect("".concat(FRONTEND_URL, "/login?error=oauth_callback_failed"));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get('/google/callback', passport_1["default"].authenticate('google', { failureRedirect: "".concat(process.env.FRONTEND_URL || 'http://localhost:3000', "/login") }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var googleUser, email, username, user, token, error_2;
    var _a, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 4, , 5]);
                console.log('Google OAuth callback - full request user:', JSON.stringify(req.user, null, 2));
                googleUser = req.user;
                if (!googleUser) {
                    console.log('No Google user found in request');
                    return [2 /*return*/, res.redirect("".concat(FRONTEND_URL, "/login?error=oauth_failed"))];
                }
                email = ((_b = (_a = googleUser.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value) || googleUser.email || ((_c = googleUser._json) === null || _c === void 0 ? void 0 : _c.email);
                username = googleUser.displayName || ((_d = googleUser.name) === null || _d === void 0 ? void 0 : _d.givenName) || ((_e = googleUser._json) === null || _e === void 0 ? void 0 : _e.name) || (email === null || email === void 0 ? void 0 : email.split('@')[0]);
                console.log('Extracted email:', email, 'username:', username);
                if (!email) {
                    console.error('No email found in Google profile:', googleUser);
                    return [2 /*return*/, res.redirect("".concat(FRONTEND_URL, "/login?error=oauth_no_email"))];
                }
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { email: email }
                    })];
            case 1:
                user = _f.sent();
                if (!!user) return [3 /*break*/, 3];
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            username: username,
                            email: email
                        }
                    })];
            case 2:
                user = _f.sent();
                _f.label = 3;
            case 3:
                token = jsonwebtoken_1["default"].sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
                res.redirect("".concat(FRONTEND_URL, "/?token=").concat(token, "&user=").concat(encodeURIComponent(JSON.stringify({ id: user.id, username: user.username, email: user.email }))));
                return [3 /*break*/, 5];
            case 4:
                error_2 = _f.sent();
                console.error('Google OAuth callback error:', error_2);
                res.redirect("".concat(FRONTEND_URL, "/login?error=oauth_callback_failed"));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get('/session-to-jwt', function (req, res) {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    var user = req.user;
    var token = jsonwebtoken_1["default"].sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token: token, user: { id: user.id, username: user.username, email: user.email } });
});
exports["default"] = router;
