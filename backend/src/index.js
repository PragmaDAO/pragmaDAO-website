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
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var express_1 = require("express");
var auth_1 = require("./routes/auth");
var test_solidity_1 = require("./routes/test-solidity");
var test_solidity_external_1 = require("./routes/test-solidity-external");
var lesson_content_1 = require("./routes/lesson-content");
var progress_1 = require("./routes/progress");
var oauth_1 = require("./routes/oauth"); // Import the new oauth router
var profile_1 = require("./routes/profile"); // Import the new profile router
var code_1 = require("./routes/code"); // Import the new code router
var admin_1 = require("./routes/admin"); // Import the new admin router
var stripe_1 = require("./routes/stripe"); // Import the new stripe router
var crypto_1 = require("./routes/crypto"); // Import the new crypto router
var payments_1 = require("./routes/payments"); // Import the new payments router
var cors_1 = require("cors");
var passport_1 = require("passport"); // Import passport
var express_session_1 = require("express-session"); // Import express-session
require("./config/passport"); // Import passport configuration
var app = (0, express_1["default"])();
var port = process.env.PORT || 3003;
// Middleware to parse JSON request bodies
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
// Configure express-session middleware
app.use((0, express_session_1["default"])({
    secret: 'a_very_strong_and_unique_secret_here',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Use secure cookies in production
}));
// Initialize Passport.js
app.use(passport_1["default"].initialize());
app.use(passport_1["default"].session());
// Use the authentication router
app.use('/api/auth', auth_1["default"]);
app.use('/api', test_solidity_1["default"]);
app.use('/api', test_solidity_external_1["default"]);
app.use('/api', lesson_content_1["default"]);
app.use('/api', progress_1["default"]);
app.use('/api/auth', oauth_1["default"]); // Use the new oauth router
app.use('/api', profile_1["default"]); // Use the new profile router
app.use('/api/code', code_1["default"]); // Use the new code router
app.use('/api/admin', admin_1["default"]); // Use the new admin router
app.use('/api/stripe', stripe_1["default"]); // Use the new stripe router
app.use('/api/crypto', crypto_1["default"]); // Use the new crypto router
app.use('/api/payments', payments_1["default"]); // Use the new payments router
// Serve soljson.js for Solidity compilation
app.get('/soljson.js', function (req, res) {
    var path = require('path');
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, '../public/soljson.js'));
});
app.get('/', function (req, res) {
    res.send('Hello World from the backend!');
});
// Start the server directly since we're using Docker-based Foundry testing
function startServer() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('🚀 Starting server with Docker-based Foundry testing...');
            app.listen(port, function () {
                console.log("Backend server is running at http://localhost:".concat(port));
                console.log('🐳 Solidity testing will use Docker-based Foundry execution');
            });
            return [2 /*return*/];
        });
    });
}
startServer()["catch"](function (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
});
