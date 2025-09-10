
import express from 'express';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from './profile'; // Assuming authenticateToken is exported from profile.ts

const prisma = new PrismaClient();
const router = express.Router();

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// Endpoint to create a new Stripe checkout session
router.post('/create-subscription', authenticateToken, async (req, res) => {
  // @ts-ignore
  const userId = req.user.id;
  try {
    const { priceId } = req.body;

    let customerId;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.stripeCustomerId) {
      customerId = user.stripeCustomerId;
    } else {
      const customer = await stripe.customers.create({
        email: user.email, // Use user's email for Stripe customer
        metadata: { userId: user.id },
      });
      customerId = customer.id;
      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customer.id },
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      customer: customerId,
      client_reference_id: userId, // Link to our user ID
      success_url: `${process.env.FRONTEND_URL}/profile`,
      cancel_url: `${process.env.FRONTEND_URL}/`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: 'Failed to create Stripe session' });
  }
});

// Endpoint to handle incoming webhooks from Stripe
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.sendStatus(400);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;
      const priceId = session.line_items?.data[0]?.price?.id as string;

      if (userId) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
          console.error(`User with ID ${userId} not found for checkout session completed event.`);
          return;
        }

        await prisma.user.update({
          where: { id: userId },
          data: {
            stripeCustomerId: customerId,
            subscriptionStatus: 'ACTIVE',
          },
        });

        const price = await stripe.prices.retrieve(priceId);
        const product = await stripe.products.retrieve(price.product as string);

        await prisma.subscription.create({
          data: {
            userId,
            stripeSubscriptionId: subscriptionId,
            planId: product.name, // Or use price.id if you prefer
            status: 'ACTIVE',
            startDate: new Date(),
            currentPeriodEnd: new Date(session.expires_at * 1000), // Use expires_at for initial period end
            amount: price.unit_amount ? price.unit_amount / 100 : 0,
            currency: price.currency || 'usd',
          },
        });

        // Check if this user was referred and update referral status
        if (user.referrerId) {
          await prisma.referral.updateMany({
            where: {
              referredId: userId,
              referrerId: user.referrerId,
              status: 'PENDING',
            },
            data: { status: 'COMPLETED' },
          });
        }
      }
      break;
    }
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;
      let subscriptionId: string | null = null;
      // Temporarily cast to any to bypass TypeScript error due to type definition mismatch
      if (typeof (invoice as any).subscription === 'string') {
        subscriptionId = (invoice as any).subscription;
      } else if ((invoice as any).subscription && typeof (invoice as any).subscription === 'object') {
        subscriptionId = (invoice as any).subscription.id;
      }

      if (!subscriptionId) {
        console.error('Subscription ID not found in invoice.payment_succeeded event');
        return res.sendStatus(400);
      }

      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: subscriptionId },
        data: {
          currentPeriodEnd: new Date(invoice.period_end * 1000),
          status: 'ACTIVE',
        },
      });
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;

      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: { status: 'CANCELED' },
      });

      await prisma.user.updateMany({
        where: { stripeCustomerId: subscription.customer as string },
        data: { subscriptionStatus: 'CANCELED' },
      });
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

export default router;
