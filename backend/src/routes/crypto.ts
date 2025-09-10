import { Router, Request, Response } from 'express';
import { ethers } from "ethers";
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from './profile';

const prisma = new PrismaClient();
const router = Router();

router.post('/pay', authenticateToken, async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.id;
  const { transactionHash, amount, currency } = req.body;

  if (!transactionHash || !amount || !currency) {
    return res.status(400).json({ message: 'Transaction hash, amount, and currency are required' });
  }

  try {
    // Verify the transaction on the blockchain
    const provider = new ethers.providers.JsonRpcProvider(process.env.THIRDWEB_RPC_URL);
    const tx = await provider.getTransaction(transactionHash);

    if (!tx) {
      return res.status(400).json({ message: 'Transaction not found on blockchain' });
    }

    // Further verification: check recipient, amount, currency (USDC contract address)
    // This is a simplified example. In a real app, you'd verify against your contract.
    // For USDC on Goerli, the contract address is 0x07865c6E87B9F70255377e024ace66dc6afcD38A
    // You would also check the 'to' address of the transaction to ensure it's your contract/wallet.

    // Save crypto payment record
    const cryptoPayment = await prisma.cryptoPayment.create({
      data: {
        userId,
        transactionHash,
        amount,
        currency,
        status: 'COMPLETED', // Assuming verification passes for now
      },
    });

    // Update user's subscription status
    await prisma.user.update({
      where: { id: userId },
      data: { subscriptionStatus: 'ACTIVE' },
    });

    res.status(200).json({ message: 'Crypto payment processed successfully', cryptoPayment });
  } catch (error) {
    console.error('Error processing crypto payment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
