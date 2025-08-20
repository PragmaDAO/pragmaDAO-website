import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from the backend!');
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
