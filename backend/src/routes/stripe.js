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
var stripe_1 = require("stripe");
var client_1 = require("@prisma/client");
var profile_1 = require("./profile"); // Assuming authenticateToken is exported from profile.ts
var prisma = new client_1.PrismaClient();
var router = express_1["default"].Router();
// Initialize Stripe with your secret key
var stripe = new stripe_1["default"](process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20'
});
// Endpoint to create a new Stripe checkout session
router.post('/create-subscription', profile_1.authenticateToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, priceId, customerId, user, customer, session, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                priceId = req.body.priceId;
                customerId = void 0;
                return [4 /*yield*/, prisma.user.findUnique({ where: { id: userId } })];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ error: 'User not found' })];
                }
                if (!user.stripeCustomerId) return [3 /*break*/, 3];
                customerId = user.stripeCustomerId;
                return [3 /*break*/, 6];
            case 3: return [4 /*yield*/, stripe.customers.create({
                    email: user.email,
                    metadata: { userId: user.id }
                })];
            case 4:
                customer = _a.sent();
                customerId = customer.id;
                return [4 /*yield*/, prisma.user.update({
                        where: { id: userId },
                        data: { stripeCustomerId: customer.id }
                    })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [4 /*yield*/, stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: [
                        {
                            price: priceId,
                            quantity: 1
                        },
                    ],
                    mode: 'subscription',
                    customer: customerId,
                    client_reference_id: userId,
                    success_url: "".concat(process.env.FRONTEND_URL, "/profile"),
                    cancel_url: "".concat(process.env.FRONTEND_URL, "/")
                })];
            case 7:
                session = _a.sent();
                res.json({ id: session.id });
                return [3 /*break*/, 9];
            case 8:
                error_1 = _a.sent();
                console.error('Error creating Stripe session:', error_1);
                res.status(500).json({ error: 'Failed to create Stripe session' });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
// Endpoint to handle incoming webhooks from Stripe
router.post('/webhook', express_1["default"].raw({ type: 'application/json' }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sig, webhookSecret, event, _a, session, userId, customerId, subscriptionId, priceId, user, price, product, invoice, subscriptionId, subscription;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                sig = req.headers['stripe-signature'];
                webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
                try {
                    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
                }
                catch (err) {
                    console.error("Webhook signature verification failed: ".concat(err.message));
                    return [2 /*return*/, res.sendStatus(400)];
                }
                _a = event.type;
                switch (_a) {
                    case 'checkout.session.completed': return [3 /*break*/, 1];
                    case 'invoice.payment_succeeded': return [3 /*break*/, 9];
                    case 'customer.subscription.deleted': return [3 /*break*/, 11];
                }
                return [3 /*break*/, 14];
            case 1:
                session = event.data.object;
                userId = session.client_reference_id;
                customerId = session.customer;
                subscriptionId = session.subscription;
                priceId = (_d = (_c = (_b = session.line_items) === null || _b === void 0 ? void 0 : _b.data[0]) === null || _c === void 0 ? void 0 : _c.price) === null || _d === void 0 ? void 0 : _d.id;
                if (!userId) return [3 /*break*/, 8];
                return [4 /*yield*/, prisma.user.findUnique({ where: { id: userId } })];
            case 2:
                user = _e.sent();
                if (!user) {
                    console.error("User with ID ".concat(userId, " not found for checkout session completed event."));
                    return [2 /*return*/];
                }
                return [4 /*yield*/, prisma.user.update({
                        where: { id: userId },
                        data: {
                            stripeCustomerId: customerId,
                            subscriptionStatus: 'ACTIVE'
                        }
                    })];
            case 3:
                _e.sent();
                return [4 /*yield*/, stripe.prices.retrieve(priceId)];
            case 4:
                price = _e.sent();
                return [4 /*yield*/, stripe.products.retrieve(price.product)];
            case 5:
                product = _e.sent();
                return [4 /*yield*/, prisma.subscription.create({
                        data: {
                            userId: userId,
                            stripeSubscriptionId: subscriptionId,
                            planId: product.name,
                            status: 'ACTIVE',
                            startDate: new Date(),
                            currentPeriodEnd: new Date(session.expires_at * 1000),
                            amount: price.unit_amount ? price.unit_amount / 100 : 0,
                            currency: price.currency || 'usd'
                        }
                    })];
            case 6:
                _e.sent();
                if (!user.referrerId) return [3 /*break*/, 8];
                return [4 /*yield*/, prisma.referral.updateMany({
                        where: {
                            referredId: userId,
                            referrerId: user.referrerId,
                            status: 'PENDING'
                        },
                        data: { status: 'COMPLETED' }
                    })];
            case 7:
                _e.sent();
                _e.label = 8;
            case 8: return [3 /*break*/, 15];
            case 9:
                invoice = event.data.object;
                subscriptionId = null;
                // Temporarily cast to any to bypass TypeScript error due to type definition mismatch
                if (typeof invoice.subscription === 'string') {
                    subscriptionId = invoice.subscription;
                }
                else if (invoice.subscription && typeof invoice.subscription === 'object') {
                    subscriptionId = invoice.subscription.id;
                }
                if (!subscriptionId) {
                    console.error('Subscription ID not found in invoice.payment_succeeded event');
                    return [2 /*return*/, res.sendStatus(400)];
                }
                return [4 /*yield*/, prisma.subscription.updateMany({
                        where: { stripeSubscriptionId: subscriptionId },
                        data: {
                            currentPeriodEnd: new Date(invoice.period_end * 1000),
                            status: 'ACTIVE'
                        }
                    })];
            case 10:
                _e.sent();
                return [3 /*break*/, 15];
            case 11:
                subscription = event.data.object;
                return [4 /*yield*/, prisma.subscription.updateMany({
                        where: { stripeSubscriptionId: subscription.id },
                        data: { status: 'CANCELED' }
                    })];
            case 12:
                _e.sent();
                return [4 /*yield*/, prisma.user.updateMany({
                        where: { stripeCustomerId: subscription.customer },
                        data: { subscriptionStatus: 'CANCELED' }
                    })];
            case 13:
                _e.sent();
                return [3 /*break*/, 15];
            case 14:
                console.log("Unhandled event type ".concat(event.type));
                _e.label = 15;
            case 15:
                res.json({ received: true });
                return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
