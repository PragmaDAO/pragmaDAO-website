import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from './profile'; // Assuming authenticateToken is exported from profile.ts

const prisma = new PrismaClient();
const router = Router();

// GET all users (Admin only - for demonstration purposes)
router.get('/users', authenticateToken, async (req: Request, res: Response) => {
  // In a real application, you would add authorization logic here
  // to ensure only actual administrators can access this endpoint.
  // For example, checking a 'role' field on the authenticated user.

  try {
    const users = await prisma.user.findMany({
      select: { // Select only necessary fields, avoid sending sensitive data like hashed passwords
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
