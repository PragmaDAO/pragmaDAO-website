import express, { Express, Request, Response } from 'express';
import authRouter from './routes/auth';

const app: Express = express();
const port = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// Use the authentication router
app.use('/api/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from the backend!');
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});