import React, { useState } from 'react';

interface PricingPlan {
  id: 'monthly' | 'yearly' | 'enterprise';
  name: string;
  price: number;
  duration: string;
  popular?: boolean;
  features: string[];
  isContactUs?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 35,
    duration: 'per month',
    features: [
      'Access to all Solidity lessons',
      'Interactive coding challenges',
      'Community Discord access',
      'Progress tracking',
      'Certificate of completion'
    ]
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 420,
    duration: 'per year',
    popular: true,
    features: [
      'Everything in Monthly',
      'Advanced ZK-proof modules',
      'Smart contract security training',
      'Save $0 annually'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 0, // Not used for contact us button
    duration: 'Custom',
    isContactUs: true,
    features: [
      'Everything in Yearly',
      'White-label course access',
      'Custom curriculum development',
      'Team training sessions',
      'Direct instructor access',
      'Custom pricing & billing'
    ]
  }
];

interface SimplePaymentProps {
  setCurrentPage?: (page: string) => void;
}

const SimplePayment: React.FC<SimplePaymentProps> = ({ setCurrentPage }) => {
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'stripe' | 'usdc'>('stripe');
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  const handlePayment = async (plan: PricingPlan, paymentMethod: 'stripe' | 'usdc') => {
    setPaymentStatus('processing');
    setErrorMessage('');
    setSelectedPlan(plan);

    try {
      if (paymentMethod === 'stripe') {
        // Simulate Stripe payment process
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real implementation, you would:
        // 1. Create a Stripe checkout session
        // 2. Redirect to Stripe checkout
        // 3. Handle webhook confirmation
        
        setPaymentStatus('success');
        
        // Record Stripe payment in backend
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('/api/payments/record', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              planId: plan.id,
              amount: plan.price,
              paymentMethod: 'stripe',
              transactionHash: `stripe_${Date.now()}`, // Stripe payment ID
              userAddress: null // Not needed for Stripe
            })
          });

          if (!response.ok) {
            throw new Error('Failed to record payment in backend');
          }
        }
        
      } else if (paymentMethod === 'usdc') {
        // Simulate USDC payment process
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real implementation, you would:
        // 1. Use Thirdweb to connect wallet
        // 2. Check USDC balance
        // 3. Execute USDC transfer
        // 4. Wait for transaction confirmation
        
        setPaymentStatus('success');
        
        // Record USDC payment in backend
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('/api/payments/record', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              planId: plan.id,
              amount: plan.price,
              paymentMethod: 'usdc',
              transactionHash: `0x${Date.now().toString(16)}`, // Blockchain transaction hash
              userAddress: '0x742d35cc6635c0532925a3b8d709c6db3e90b0eb'
            })
          });

          if (!response.ok) {
            throw new Error('Failed to record payment in backend');
          }
        }
      }
      
      // Redirect to lessons after successful payment
      setTimeout(() => {
        setCurrentPage?.('lessons');
      }, 2000);

    } catch (error: any) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      setErrorMessage(error.message || 'Payment failed. Please try again.');
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
          {plan.isContactUs ? (
            <span className="text-3xl">Contact Us</span>
          ) : (
            <div className="flex flex-col items-center">
              <div className="mb-1">
                ${plan.price} <span className="text-lg text-gray-400">USD</span>
              </div>
              <div className="text-lg text-gray-300">
                or ${plan.price} <span className="text-sm text-gray-400">USDC</span>
              </div>
            </div>
          )}
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

      {plan.isContactUs ? (
        <button
          onClick={() => {
            window.location.href = 'mailto:PragmaDAO@proton.me?subject=Enterprise%20Plan%20Inquiry';
          }}
          className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg"
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span>Contact Us</span>
          </div>
        </button>
      ) : (
        <div className="space-y-3">
          {/* Stripe Payment Button */}
          <button
            onClick={() => handlePayment(plan, 'stripe')}
            disabled={paymentStatus === 'processing'}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
              plan.popular
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {paymentStatus === 'processing' && selectedPlan?.id === plan.id ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>Pay ${plan.price} with Stripe</span>
                <svg className="w-8 h-4" fill="currentColor" viewBox="0 0 60 25">
                  <path d="M59.5 12.6c0-1.3-.9-2.2-2.4-2.2s-2.4.9-2.4 2.2.9 2.2 2.4 2.2 2.4-.9 2.4-2.2zm-5.3 0c0-1.6 1.3-2.9 2.9-2.9s2.9 1.3 2.9 2.9-1.3 2.9-2.9 2.9-2.9-1.3-2.9-2.9zm-6.9-2.8h1.6v.6h.1c.3-.5.9-.7 1.6-.7 1.2 0 1.9.8 1.9 2.1v3.1h-1.6v-2.7c0-.7-.3-1.1-.9-1.1s-1 .4-1 1.1v2.7h-1.6v-5.1zm-7.1 0h1.6v.6h.1c.3-.5.9-.7 1.6-.7 1.2 0 1.9.8 1.9 2.1v3.1h-1.6v-2.7c0-.7-.3-1.1-.9-1.1s-1 .4-1 1.1v2.7h-1.6v-5.1zm-6.3 0h1.6v5.1h-1.6v-.6h-.1c-.3.5-.9.7-1.6.7-1.6 0-2.8-1.3-2.8-2.9s1.2-2.9 2.8-2.9c.7 0 1.3.2 1.6.7h.1v-.1zm-2.4 2.6c0-.9.6-1.5 1.4-1.5s1.4.6 1.4 1.5-.6 1.5-1.4 1.5-1.4-.6-1.4-1.5zm-3.8-2.6v5.1h-1.6v-.6h-.1c-.3.5-.9.7-1.6.7-1.6 0-2.8-1.3-2.8-2.9s1.2-2.9 2.8-2.9c.7 0 1.3.2 1.6.7h.1v-.1h1.6zm-4 2.6c0-.9.6-1.5 1.4-1.5s1.4.6 1.4 1.5-.6 1.5-1.4 1.5-1.4-.6-1.4-1.5zm-3.4-2.6h1.6v5.1h-1.6v-5.1zm.8-2c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm-3.3 2v5.1h-1.6v-5.1h-1v-1.2h1v-.9c0-1.3.8-2 2.1-2h1.2v1.2h-.9c-.4 0-.7.3-.7.7v1h1.4v1.2h-1.5zm-8.4 5.1h-1.6v-3.5h-2.4v3.5h-1.6v-8.4h1.6v3.7h2.4v-3.7h1.6v8.4z"/>
                </svg>
              </div>
            )}
          </button>

          {/* USDC Payment Button */}
          <button
            onClick={() => handlePayment(plan, 'usdc')}
            disabled={paymentStatus === 'processing'}
            className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 bg-gray-700 hover:bg-gray-600 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {paymentStatus === 'processing' && selectedPlan?.id === plan.id ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <span>Pay ${plan.price} USDC</span>
              </div>
            )}
          </button>
        </div>
      )}
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
          
          {/* Simple connection status */}
          <div className="bg-yellow-900/40 border border-yellow-400/50 rounded-lg p-4 mb-8">
            <p className="text-yellow-300">
              📝 <strong>Note:</strong> This is a simplified payment demo. In production, wallet connection and USDC payments would be handled through Thirdweb.
            </p>
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
                <li>• No credit card required</li>
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

export default SimplePayment;