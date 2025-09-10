
import React from 'react';
import { useSubscription } from '../hooks/useSubscription';
import SimplePayment from '../components/SimplePayment';

interface PricingPageProps {
  setCurrentPage?: (page: string) => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ setCurrentPage }) => {
  const { courseAccess, isLoading } = useSubscription();

  // Show existing subscription status if user already has access
  if (!isLoading && courseAccess?.hasAccess && courseAccess?.isActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-8">You're All Set!</h1>
          
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50 p-8 mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Active Subscription</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <p className="text-gray-400 text-sm mb-1">Current Plan</p>
                <p className="text-white font-semibold text-lg capitalize">
                  {courseAccess.planId} Plan
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">
                  {courseAccess.planId === 'enterprise' ? 'Access Type' : 'Expires'}
                </p>
                <p className="text-white font-semibold text-lg">
                  {courseAccess.planId === 'enterprise' 
                    ? 'Lifetime Access' 
                    : new Date(courseAccess.expiresAt!).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setCurrentPage?.('lessons')}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg"
            >
              Continue Learning
            </button>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentPage?.('profile')}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
              >
                View Profile
              </button>
              
              {courseAccess.planId !== 'enterprise' && (
                <button
                  onClick={() => setCurrentPage?.('pricing')}
                  className="px-6 py-2 border border-indigo-500 hover:bg-indigo-500 text-indigo-400 hover:text-white rounded-lg font-medium transition-all duration-300"
                >
                  Upgrade Plan
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show pricing page for users without active subscription
  return <SimplePayment setCurrentPage={setCurrentPage} />;
};

export default PricingPage;
