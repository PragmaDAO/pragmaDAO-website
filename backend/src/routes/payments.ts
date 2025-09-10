import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();

// Middleware to verify JWT token
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// POST /api/payments/record - Record successful blockchain payment
router.post('/record', authenticateToken, async (req: any, res: any) => {
  try {
    const { planId, amount, transactionHash, userAddress, thirdwebPaymentId } = req.body;
    const userId = req.user.userId;

    // Validate required fields
    if (!planId || !amount || !transactionHash) {
      return res.status(400).json({ 
        error: 'Missing required fields: planId, amount, transactionHash' 
      });
    }

    // Validate plan and amount
    const validPlans = {
      'basic': 50,
      'premium': 200,
      'enterprise': 500
    };

    if (!validPlans[planId as keyof typeof validPlans]) {
      return res.status(400).json({ error: 'Invalid plan ID' });
    }

    if (amount !== validPlans[planId as keyof typeof validPlans]) {
      return res.status(400).json({ error: 'Amount does not match plan price' });
    }

    // Check if transaction hash already exists
    const existingPayment = await prisma.payment.findUnique({
      where: { transactionHash }
    });

    if (existingPayment) {
      return res.status(409).json({ error: 'Payment already recorded' });
    }

    // Calculate expiration date based on plan
    let expiresAt: Date;
    let billingPeriodStart: Date;
    let billingPeriodEnd: Date;
    const now = new Date();
    billingPeriodStart = new Date(now);
    
    switch (planId) {
      case 'basic':
        expiresAt = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days
        billingPeriodEnd = new Date(expiresAt);
        break;
      case 'premium':
        expiresAt = new Date(now.getTime() + (90 * 24 * 60 * 60 * 1000)); // 90 days
        billingPeriodEnd = new Date(expiresAt);
        break;
      case 'enterprise':
        expiresAt = new Date(now.getTime() + (100 * 365 * 24 * 60 * 60 * 1000)); // Lifetime (100 years)
        billingPeriodEnd = new Date(expiresAt);
        break;
      default:
        expiresAt = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)); // Default to 30 days
        billingPeriodEnd = new Date(expiresAt);
    }

    // Record the payment
    const payment = await prisma.payment.create({
      data: {
        userId,
        userAddress,
        planId,
        amount,
        currency: 'USDC',
        paymentMethod: 'crypto',
        transactionHash,
        thirdwebPaymentId,
        status: 'completed',
        billingPeriodStart,
        billingPeriodEnd,
        autoRenewal: false
      }
    });

    // Create or update course access
    await prisma.courseAccess.upsert({
      where: { userId },
      update: {
        planId,
        isActive: true,
        expiresAt
      },
      create: {
        userId,
        planId,
        isActive: true,
        expiresAt
      }
    });

    // Update user subscription fields
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscription: planId,
        subscriptionExpiresAt: expiresAt,
        walletAddress: userAddress,
        firstSignupDate: new Date()
      }
    });

    res.status(201).json({
      success: true,
      payment,
      courseAccess: {
        planId,
        expiresAt,
        isActive: true
      }
    });

  } catch (error) {
    console.error('Payment recording error:', error);
    res.status(500).json({ error: 'Failed to record payment' });
  }
});

// GET /api/payments/history - Get user's payment history
router.get('/history', authenticateToken, async (req: any, res: any) => {
  try {
    const userId = req.user.userId;

    const payments = await prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50 // Limit to last 50 payments
    });

    res.json({
      success: true,
      payments
    });

  } catch (error) {
    console.error('Payment history error:', error);
    res.status(500).json({ error: 'Failed to fetch payment history' });
  }
});

// GET /api/course-access - Check user's current access level
router.get('/course-access', authenticateToken, async (req: any, res: any) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        courseAccess: true,
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const courseAccess = user.courseAccess;
    
    if (!courseAccess) {
      return res.json({
        hasAccess: false,
        planId: null,
        expiresAt: null,
        isActive: false
      });
    }

    // Check if access has expired
    const now = new Date();
    const hasValidAccess = courseAccess.isActive && courseAccess.expiresAt > now;

    // If access expired, update the database
    if (!hasValidAccess && courseAccess.isActive) {
      await prisma.courseAccess.update({
        where: { userId },
        data: { isActive: false }
      });
      
      await prisma.user.update({
        where: { id: userId },
        data: { subscription: null }
      });
    }

    res.json({
      hasAccess: hasValidAccess,
      planId: hasValidAccess ? courseAccess.planId : null,
      expiresAt: courseAccess.expiresAt,
      isActive: hasValidAccess,
      lastPayment: user.payments[0] || null
    });

  } catch (error) {
    console.error('Course access check error:', error);
    res.status(500).json({ error: 'Failed to check course access' });
  }
});

export default router;