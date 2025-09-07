import express, { Express, Request, Response } from 'express';
import authRouter from './routes/auth';
import testSolidityRouter from './routes/test-solidity';
import lessonContentRouter from './routes/lesson-content';
import progressRouter from './routes/progress';
import oauthRouter from './routes/oauth'; // Import the new oauth router
import profileRouter from './routes/profile'; // Import the new profile router
import codeRouter from './routes/code'; // Import the new code router
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

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from the backend!');
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});