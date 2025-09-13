import React, { useState, useEffect } from 'react';

interface Payment {
  id: string;
  planId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  transactionHash?: string;
  userAddress?: string;
  status: string;
  paidAt: string;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  autoRenewal: boolean;
}

interface CourseAccess {
  planId: string;
  isActive: boolean;
  expiresAt: string;
}

const PaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [courseAccess, setCourseAccess] = useState<CourseAccess | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view payment history');
        setIsLoading(false);
        return;
      }

      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3003';

      // Fetch course access status
      const accessResponse = await fetch(`${backendUrl}/api/payments/course-access`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (accessResponse.ok) {
        const accessData = await accessResponse.json();
        setCourseAccess(accessData);
      }

      // Fetch payment history
      const paymentsResponse = await fetch(`${backendUrl}/api/payments/history`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (paymentsResponse.ok) {
        const paymentsData = await paymentsResponse.json();
        setPayments(paymentsData.payments || []);
      }

    } catch (error: any) {
      setError(error.message || 'Failed to fetch payment data');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAddress = (address: string) => {
    if (!address) return 'N/A';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const getPlanDisplayName = (planId: string) => {
    const plans = {
      'basic': 'Basic Plan',
      'premium': 'Premium Plan', 
      'enterprise': 'Enterprise Plan'
    };
    return plans[planId as keyof typeof plans] || planId;
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'completed': 'bg-green-100 text-green-800 border-green-200',
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'failed': 'bg-red-100 text-red-800 border-red-200'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const calculateDaysRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-white">Loading payment history...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Payment History</h1>
          <p className="text-gray-300">View your subscription details and payment records</p>
        </div>

        {error && (
          <div className="mb-8 p-6 bg-red-900/40 border border-red-400/50 rounded-lg backdrop-blur-md">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Current Subscription Status */}
        {courseAccess && (
          <div className="mb-8 p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50">
            <h2 className="text-2xl font-bold text-white mb-4">Current Subscription</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">Plan</p>
                <p className="text-white font-semibold text-lg">{getPlanDisplayName(courseAccess.planId)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Status</p>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${courseAccess.isActive ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className={`font-semibold ${courseAccess.isActive ? 'text-green-400' : 'text-red-400'}`}>
                    {courseAccess.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">
                  {courseAccess.planId === 'enterprise' ? 'Access Type' : 'Expires In'}
                </p>
                {courseAccess.planId === 'enterprise' ? (
                  <p className="text-white font-semibold text-lg">Lifetime Access</p>
                ) : (
                  <p className="text-white font-semibold text-lg">
                    {calculateDaysRemaining(courseAccess.expiresAt)} days
                  </p>
                )}
              </div>
            </div>
            
            {courseAccess.planId !== 'enterprise' && (
              <div className="mt-4 bg-gray-700/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Subscription Countdown</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(0, Math.min(100, (calculateDaysRemaining(courseAccess.expiresAt) / (courseAccess.planId === 'basic' ? 30 : 90)) * 100))}%` }}
                  ></div>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  Expires on {formatDate(courseAccess.expiresAt)}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Payment History Table */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Payment Records</h2>
            
            {payments.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-400">No payment history found</p>
                <p className="text-gray-500 text-sm mt-2">Your payment records will appear here after making a purchase</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Plan</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Method</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Address</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Transaction</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b border-gray-800/50 hover:bg-gray-700/20 transition-colors">
                        <td className="py-4 px-4 text-white text-sm">
                          {formatDate(payment.paidAt)}
                        </td>
                        <td className="py-4 px-4 text-white text-sm">
                          {getPlanDisplayName(payment.planId)}
                        </td>
                        <td className="py-4 px-4 text-white text-sm font-semibold">
                          ${payment.amount} {payment.currency}
                        </td>
                        <td className="py-4 px-4 text-white text-sm">
                          <div className="flex items-center space-x-2">
                            {payment.paymentMethod === 'crypto' ? (
                              <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 2L3 7l7 4 7-4-7-5zM3 13l7 4 7-4M3 9l7 4 7-4"/>
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                            )}
                            <span className="capitalize">{payment.paymentMethod}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-400 text-sm font-mono">
                          {payment.userAddress ? (
                            <a 
                              href={`https://basescan.org/address/${payment.userAddress}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-indigo-400 transition-colors"
                            >
                              {formatAddress(payment.userAddress)}
                            </a>
                          ) : 'N/A'}
                        </td>
                        <td className="py-4 px-4 text-gray-400 text-sm">
                          {payment.transactionHash ? (
                            <a 
                              href={`https://basescan.org/tx/${payment.transactionHash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-indigo-400 transition-colors font-mono"
                            >
                              {formatAddress(payment.transactionHash)}
                            </a>
                          ) : 'N/A'}
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge(payment.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Auto-renewal Settings */}
        {courseAccess && courseAccess.planId !== 'enterprise' && (
          <div className="mt-8 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Subscription Management</h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">Auto-Renewal</h3>
                <p className="text-gray-400 text-sm">Automatically renew your subscription before it expires</p>
              </div>
              <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors">
                Manage Subscription
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;