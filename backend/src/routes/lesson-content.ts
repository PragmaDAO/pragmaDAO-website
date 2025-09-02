import { Router } from 'express';

const router = Router();

router.get('/progress', (req, res) => {
  res.json({ message: 'Lesson progress endpoint (GET)' });
});

router.post('/progress', (req, res) => {
  res.json({ message: 'Lesson progress endpoint (POST)' });
});

export default router;