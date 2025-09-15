import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response } from 'express';
import authRouter from './routes/auth';
import testSolidityRouter from './routes/test-solidity';
import lessonContentRouter from './routes/lesson-content';
import progressRouter from './routes/progress';
import oauthRouter from './routes/oauth'; // Import the new oauth router
import profileRouter from './routes/profile'; // Import the new profile router
import codeRouter from './routes/code'; // Import the new code router
import adminRouter from './routes/admin'; // Import the new admin router
import stripeRouter from './routes/stripe'; // Import the new stripe router
import cryptoRouter from './routes/crypto'; // Import the new crypto router
import paymentsRouter from './routes/payments'; // Import the new payments router
import cors from 'cors';
import passport from 'passport'; // Import passport
import session from 'express-session'; // Import express-session
import './config/passport'; // Import passport configuration

const app: Express = express();
const port = process.env.PORT || 3003;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// Configure express-session middleware
app.use(session({
  secret: 'a_very_strong_and_unique_secret_here', // Replace with a strong, unique secret
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' } // Use secure cookies in production
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Use the authentication router
app.use('/api/auth', authRouter);
app.use('/api', testSolidityRouter);
app.use('/api', lessonContentRouter);
app.use('/api', progressRouter);
app.use('/api/auth', oauthRouter); // Use the new oauth router
app.use('/api', profileRouter); // Use the new profile router
app.use('/api/code', codeRouter); // Use the new code router
app.use('/api/admin', adminRouter); // Use the new admin router
app.use('/api/stripe', stripeRouter); // Use the new stripe router
app.use('/api/crypto', cryptoRouter); // Use the new crypto router
app.use('/api/payments', paymentsRouter); // Use the new payments router

// Serve soljson.js for Solidity compilation
app.get('/soljson.js', (req: Request, res: Response) => {
  const path = require('path');
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, '../public/soljson.js'));
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from the backend!');
});

// Ensure Foundry is installed before starting the server
async function startServer() {
  console.log('🔧 Ensuring Foundry is available...');

  const { ensureFoundryAtRuntime } = require('../ensure-foundry-runtime');
  const foundryAvailable = await ensureFoundryAtRuntime();

  if (foundryAvailable) {
    console.log('✅ Foundry is ready for Solidity testing');
  } else {
    console.log('⚠️ Warning: Foundry installation failed, some features may not work');
  }

  app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
  });
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});