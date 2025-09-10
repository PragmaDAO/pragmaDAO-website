import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSubscription } from '../hooks/useSubscription';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresPaid?: boolean;
  redirectTo?: string;
  planRequired?: 'basic' | 'premium' | 'enterprise';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiresPaid = false, 
  redirectTo = '/payment',
  planRequired
}) => {
  const { courseAccess, isLoading } = useSubscription();
  const location = useLocation();
  const token = localStorage.getItem('token');

  // Show loading spinner while checking subscription
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white">Checking access...</span>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If paid access is required but user doesn't have it
  if (requiresPaid && (!courseAccess?.hasAccess || !courseAccess?.isActive)) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check if specific plan is required
  if (planRequired && courseAccess?.planId !== planRequired) {
    const planHierarchy = { basic: 1, premium: 2, enterprise: 3 };
    const userPlanLevel = courseAccess?.planId ? planHierarchy[courseAccess.planId as keyof typeof planHierarchy] : 0;
    const requiredPlanLevel = planHierarchy[planRequired];

    // If user's plan is lower than required, redirect to upgrade
    if (userPlanLevel < requiredPlanLevel) {
      return <Navigate to={`/payment?upgrade=${planRequired}`} replace />;
    }
  }

  // Render children if all checks pass
  return <>{children}</>;
};

export default ProtectedRoute;