import express, { Express, Request, Response } from 'express';
import authRouter from './routes/auth';
import testSolidityRouter from './routes/test-solidity';
import lessonContentRouter from './routes/lesson-content'; // Import the new router
import cors from 'cors';

const app: Express = express();
const port = 3003; // Changed port to 3003

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Use the authentication router
app.use('/api/auth', authRouter);
app.use('/api', testSolidityRouter); // Use the new test solidity router
app.use('/api', lessonContentRouter); // Use the new lesson content router

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from the backend!');
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});