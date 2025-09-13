import React, { useState, useEffect } from 'react';
import { 
  useAddress, 
  useContract, 
  useContractRead, 
  useContractWrite,
  ConnectWallet,
  useConnectionStatus
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';

// USDC contract address on Base
const USDC_CONTRACT_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
const RECIPIENT_ADDRESS = process.env.REACT_APP_PAYMENT_RECIPIENT || '0x742d35cc6635c0532925a3b8d709c6db3e90b0eb'; // Replace with your wallet

interface PricingPlan {
  id: 'basic' | 'premium' | 'enterprise';
  name: string;
  price: number;
  duration: string;
  popular?: boolean;
  features: string[];
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 50,
    duration: '30 days',
    features: [
      'Access to all Solidity lessons',
      'Basic coding challenges',
      'Community Discord access',
      'Certificate of completion'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 200,
    duration: '90 days',
    popular: true,
    features: [
      'Everything in Basic',
      'Advanced ZK-proof modules',
      'Smart contract security training',
      '1-on-1 mentor sessions',
      'Priority job placement support',
      'Lifetime Discord access'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 500,
    duration: 'Lifetime',
    features: [
      'Everything in Premium',
      'White-label course access',
      'Custom curriculum development',
      'Team training sessions',
      'Direct instructor access'
    ]
  }
];

interface PaymentProps {
  setCurrentPage?: (page: string) => void;
}

const Payment: React.FC<PaymentProps> = ({ setCurrentPage }) => {
  const address = useAddress();
  const connectionStatus = useConnectionStatus();
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleStripeCheckout = async (plan: PricingPlan) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Please log in to subscribe.');
        setIsLoading(false);
        return;
      }

      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3003';
      const response = await fetch(`${backendUrl}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          planId: plan.id,
          price: plan.price,
          duration: plan.duration
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create Stripe checkout session');
      }

      const { url } = await response.json();
      window.location.href = url; // Redirect to Stripe Checkout

    } catch (error: any) {
      console.error('Stripe checkout error:', error);
      setErrorMessage(error.message || 'Failed to initiate Stripe checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // USDC contract connection
  const { contract: usdcContract } = useContract(USDC_CONTRACT_ADDRESS);
  
  // Read USDC balance
  const { data: balance, refetch: refetchBalance } = useContractRead(
    usdcContract,
    'balanceOf',
    [address]
  );

  // Transfer function
  const { mutateAsync: transfer } = useContractWrite(usdcContract, 'transfer');

  // Update balance when it changes
  useEffect(() => {
    if (balance) {
      const formattedBalance = ethers.utils.formatUnits(balance, 6); // USDC has 6 decimals
      setUsdcBalance(parseFloat(formattedBalance).toFixed(2));
    }
  }, [balance]);

  const handlePayment = async (plan: PricingPlan) => {
    if (!address || !usdcContract) {
      setErrorMessage('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    setPaymentStatus('processing');
    setErrorMessage('');
    
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3003';

    try {
      // Check balance
      const balanceNum = parseFloat(usdcBalance);
      if (balanceNum < plan.price) {
        throw new Error(`Insufficient USDC balance. You need ${plan.price} USDC but only have ${balanceNum} USDC.`);
      }

      // Convert amount to wei (USDC has 6 decimals)
      const amountWei = ethers.utils.parseUnits(plan.price.toString(), 6);
      
      // Execute transfer
      const txResult = await transfer({
        args: [RECIPIENT_ADDRESS, amountWei]
      });

      // Wait for transaction confirmation
      const receipt = await txResult.receipt;
      
      if (receipt.status === 1) {
        // Record payment in backend
        const token = localStorage.getItem('token');
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3003';
        const response = await fetch(`${backendUrl}/api/payments/record`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            planId: plan.id,
            amount: plan.price,
            transactionHash: receipt.transactionHash,
            userAddress: address
          })
        });

        if (!response.ok) {
          throw new Error('Failed to record payment in backend');
        }

        setPaymentStatus('success');
        refetchBalance();
        
        // Redirect to lessons after successful payment
        setTimeout(() => {
          setCurrentPage?.('lessons');
        }, 2000);

      } else {
        throw new Error('Transaction failed');
      }

    } catch (error: any) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      setErrorMessage(error.reason || error.message || 'Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const PricingCard: React.FC<{ plan: PricingPlan }> = ({ plan }) => (
    <div className={`relative p-8 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
      plan.popular 
        ? 'bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-400/50 shadow-2xl shadow-indigo-500/25' 
        : 'bg-gray-900/40 border-gray-700/50 hover:border-gray-600/50'
    }`}>
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
        <div className="text-4xl font-bold text-white mb-2">
          ${plan.price} <span className="text-lg text-gray-400">USDC</span>
        </div>
        <p className="text-gray-400">{plan.duration}</p>
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          setSelectedPlan(plan);
          handlePayment(plan);
        }}
        disabled={isLoading || !address || connectionStatus !== 'connected'}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
          plan.popular
            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg'
            : 'bg-gray-700 hover:bg-gray-600 text-white'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isLoading && selectedPlan?.id === plan.id ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing...</span>
          </div>
        ) : (
          `Pay ${plan.price} USDC`
        )}
      </button>
      <button
        onClick={() => handleStripeCheckout(plan)}
        disabled={isLoading}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 mt-4
          ${plan.popular
            ? 'bg-white text-indigo-600 hover:bg-gray-100 shadow-lg'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Pay with Stripe <img src="https://brandfetch.com/stripe.com?library=default&collection=logos&asset=idS-LIMMyd" alt="Stripe Logo" className="h-4 ml-2 inline-block" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Choose Your Learning Path
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Master Solidity and blockchain development with our comprehensive courses
          </p>
          
          {/* Wallet Connection */}
          <div className="flex flex-col items-center space-y-4">
            <ConnectWallet 
              theme="dark"
              btnTitle="Connect Wallet"
              className="!bg-indigo-600 !hover:bg-indigo-700"
            />
            
            {address && (
              <div className="bg-gray-800/50 backdrop-blur-md rounded-lg p-4 border border-gray-700/50">
                <p className="text-gray-400 text-sm mb-2">Your USDC Balance</p>
                <p className="text-2xl font-bold text-white">{usdcBalance} USDC</p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Status */}
        {paymentStatus === 'success' && (
          <div className="mb-8 p-6 bg-green-900/40 border border-green-400/50 rounded-lg backdrop-blur-md">
            <div className="flex items-center space-x-3">
              <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-green-400 font-semibold text-lg">Payment Successful!</h3>
                <p className="text-green-300">Redirecting to your dashboard...</p>
              </div>
            </div>
          </div>
        )}

        {paymentStatus === 'error' && errorMessage && (
          <div className="mb-8 p-6 bg-red-900/40 border border-red-400/50 rounded-lg backdrop-blur-md">
            <div className="flex items-center space-x-3">
              <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-red-400 font-semibold text-lg">Payment Failed</h3>
                <p className="text-red-300">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Security Notice */}
        <div className="bg-gray-800/30 backdrop-blur-md rounded-xl p-8 border border-gray-700/50">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-3">
            <svg className="w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Secure Blockchain Payments</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h4 className="font-semibold text-white mb-2">Why USDC?</h4>
              <ul className="space-y-1 text-sm">
                <li>• Stable cryptocurrency pegged to USD</li>
                <li>• Fast, low-cost transactions on Base</li>
                <li>• Transparent blockchain verification</li>
                <li>• Credit card payments available via Stripe</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Security Features</h4>
              <ul className="space-y-1 text-sm">
                <li>• Direct wallet-to-wallet transfers</li>
                <li>• No personal data collection</li>
                <li>• Immutable payment records</li>
                <li>• Instant access upon confirmation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;