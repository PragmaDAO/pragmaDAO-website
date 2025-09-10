
import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from './profile';

const prisma = new PrismaClient();
const router = Router();

router.post('/apply-discount', authenticateToken, async (req: Request, res: Response) => {
  const { code } = req.body;
  // @ts-ignore
  const userId = req.user.id;

  try {
    const discountCode = await prisma.discountCode.findUnique({
      where: { code },
    });

    if (!discountCode) {
      return res.status(404).json({ message: 'Discount code not found' });
    }

    if (discountCode.expiresAt && new Date(discountCode.expiresAt) < new Date()) {
      return res.status(400).json({ message: 'Discount code has expired' });
    }

    if (discountCode.maxUses && discountCode.uses >= discountCode.maxUses) {
      return res.status(400).json({ message: 'Discount code has reached its maximum uses' });
    }

    // Here you would typically apply the discount to a subscription or a checkout session.
    // For now, we will just return the discount code information.

    res.json(discountCode);

  } catch (error) {
    console.error('Error applying discount code:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
