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
var jsonwebtoken_1 = require("jsonwebtoken");
var router = express_1["default"].Router();
var prisma = new client_1.PrismaClient();
// Middleware to verify JWT token
var authenticateToken = function (req, res, next) {
    var authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }
    jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};
// POST /api/payments/record - Record successful blockchain payment
router.post('/record', authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, planId, amount, transactionHash, userAddress, thirdwebPaymentId, userId, validPlans, existingPayment, expiresAt, billingPeriodStart, billingPeriodEnd, now, payment, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, planId = _a.planId, amount = _a.amount, transactionHash = _a.transactionHash, userAddress = _a.userAddress, thirdwebPaymentId = _a.thirdwebPaymentId;
                userId = req.user.userId;
                // Validate required fields
                if (!planId || !amount || !transactionHash) {
                    return [2 /*return*/, res.status(400).json({
                            error: 'Missing required fields: planId, amount, transactionHash'
                        })];
                }
                validPlans = {
                    'basic': 50,
                    'premium': 200,
                    'enterprise': 500
                };
                if (!validPlans[planId]) {
                    return [2 /*return*/, res.status(400).json({ error: 'Invalid plan ID' })];
                }
                if (amount !== validPlans[planId]) {
                    return [2 /*return*/, res.status(400).json({ error: 'Amount does not match plan price' })];
                }
                return [4 /*yield*/, prisma.payment.findUnique({
                        where: { transactionHash: transactionHash }
                    })];
            case 1:
                existingPayment = _b.sent();
                if (existingPayment) {
                    return [2 /*return*/, res.status(409).json({ error: 'Payment already recorded' })];
                }
                expiresAt = void 0;
                billingPeriodStart = void 0;
                billingPeriodEnd = void 0;
                now = new Date();
                billingPeriodStart = new Date(now);
                switch (planId) {
                    case 'basic':
                        expiresAt = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days
                        billingPeriodEnd = new Date(expiresAt);
                        break;
                    case 'premium':
                        expiresAt = new Date(now.getTime() + (90 * 24 * 60 * 60 * 1000)); // 90 days
                        billingPeriodEnd = new Date(expiresAt);
                        break;
                    case 'enterprise':
                        expiresAt = new Date(now.getTime() + (100 * 365 * 24 * 60 * 60 * 1000)); // Lifetime (100 years)
                        billingPeriodEnd = new Date(expiresAt);
                        break;
                    default:
                        expiresAt = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)); // Default to 30 days
                        billingPeriodEnd = new Date(expiresAt);
                }
                return [4 /*yield*/, prisma.payment.create({
                        data: {
                            userId: userId,
                            userAddress: userAddress,
                            planId: planId,
                            amount: amount,
                            currency: 'USDC',
                            paymentMethod: 'crypto',
                            transactionHash: transactionHash,
                            thirdwebPaymentId: thirdwebPaymentId,
                            status: 'completed',
                            billingPeriodStart: billingPeriodStart,
                            billingPeriodEnd: billingPeriodEnd,
                            autoRenewal: false
                        }
                    })];
            case 2:
                payment = _b.sent();
                // Create or update course access
                return [4 /*yield*/, prisma.courseAccess.upsert({
                        where: { userId: userId },
                        update: {
                            planId: planId,
                            isActive: true,
                            expiresAt: expiresAt
                        },
                        create: {
                            userId: userId,
                            planId: planId,
                            isActive: true,
                            expiresAt: expiresAt
                        }
                    })];
            case 3:
                // Create or update course access
                _b.sent();
                // Update user subscription fields
                return [4 /*yield*/, prisma.user.update({
                        where: { id: userId },
                        data: {
                            subscription: planId,
                            subscriptionExpiresAt: expiresAt,
                            walletAddress: userAddress,
                            firstSignupDate: new Date()
                        }
                    })];
            case 4:
                // Update user subscription fields
                _b.sent();
                res.status(201).json({
                    success: true,
                    payment: payment,
                    courseAccess: {
                        planId: planId,
                        expiresAt: expiresAt,
                        isActive: true
                    }
                });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.error('Payment recording error:', error_1);
                res.status(500).json({ error: 'Failed to record payment' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// GET /api/payments/history - Get user's payment history
router.get('/history', authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, payments, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.user.userId;
                return [4 /*yield*/, prisma.payment.findMany({
                        where: { userId: userId },
                        orderBy: { createdAt: 'desc' },
                        take: 50 // Limit to last 50 payments
                    })];
            case 1:
                payments = _a.sent();
                res.json({
                    success: true,
                    payments: payments
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Payment history error:', error_2);
                res.status(500).json({ error: 'Failed to fetch payment history' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET /api/course-access - Check user's current access level
router.get('/course-access', authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, courseAccess, now, hasValidAccess, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                userId = req.user.userId;
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { id: userId },
                        include: {
                            courseAccess: true,
                            payments: {
                                orderBy: { createdAt: 'desc' },
                                take: 1
                            }
                        }
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ error: 'User not found' })];
                }
                courseAccess = user.courseAccess;
                if (!courseAccess) {
                    return [2 /*return*/, res.json({
                            hasAccess: false,
                            planId: null,
                            expiresAt: null,
                            isActive: false
                        })];
                }
                now = new Date();
                hasValidAccess = courseAccess.isActive && courseAccess.expiresAt > now;
                if (!(!hasValidAccess && courseAccess.isActive)) return [3 /*break*/, 4];
                return [4 /*yield*/, prisma.courseAccess.update({
                        where: { userId: userId },
                        data: { isActive: false }
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, prisma.user.update({
                        where: { id: userId },
                        data: { subscription: null }
                    })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                res.json({
                    hasAccess: hasValidAccess,
                    planId: hasValidAccess ? courseAccess.planId : null,
                    expiresAt: courseAccess.expiresAt,
                    isActive: hasValidAccess,
                    lastPayment: user.payments[0] || null
                });
                return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                console.error('Course access check error:', error_3);
                res.status(500).json({ error: 'Failed to check course access' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
