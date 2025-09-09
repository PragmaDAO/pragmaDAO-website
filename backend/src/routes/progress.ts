import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const router = Router();

// Secret for JWT - In a real app, this should be in an environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Extend the Request type to include a user property
declare global {
    namespace Express {
        interface Request {
            user?: { id: string };
        }
    }
}

// Middleware to protect routes and verify JWT
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: 'Authentication token required' });
    }

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user as { id: string };
        next();
    });
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
