import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// Middleware to protect routes (assuming you have one)
// This is a placeholder. You'll need to implement actual JWT verification.
const authenticateToken = (req: Request, res: Response, next: Function) => {
    // In a real app, you'd verify the JWT here and attach the user to req.user
    // For now, we'll mock a user ID for testing purposes.
    (req as any).user = { id: 'mock-user-id-123' }; // Replace with actual user ID from JWT
    next();
};

// GET /api/progress - Fetch user's lesson progress
router.get('/progress', authenticateToken, async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const progress = await prisma.userLessonProgress.findMany({
            where: { userId: userId },
        });
        res.json(progress);
    } catch (error) {
        console.error('Error fetching user progress:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST /api/progress - Mark a lesson as completed
router.post('/progress', authenticateToken, async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    const { lessonId, completed } = req.body;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!lessonId || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'lessonId and completed status are required.' });
    }

    try {
        const updatedProgress = await prisma.userLessonProgress.upsert({
            where: { userId_lessonId: { userId, lessonId } },
            update: { completed: completed },
            create: { userId, lessonId, completed: completed },
        });
        res.json(updatedProgress);
    } catch (error) {
        console.error('Error updating user progress:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
