import React, { useState, useEffect, useContext, createContext } from 'react';

interface CourseAccess {
  hasAccess: boolean;
  planId: string | null;
  expiresAt: string | null;
  isActive: boolean;
  lastPayment: any | null;
}

interface SubscriptionContextType {
  courseAccess: CourseAccess | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
  const [courseAccess, setCourseAccess] = useState<CourseAccess | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourseAccess = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        setCourseAccess({
          hasAccess: false,
          planId: null,
          expiresAt: null,
          isActive: false,
          lastPayment: null
        });
        return;
      }

      const response = await fetch('/api/payments/course-access', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch course access');
      }

      const data = await response.json();
      setCourseAccess(data);

    } catch (err: any) {
      setError(err.message || 'Failed to check subscription status');
      setCourseAccess({
        hasAccess: false,
        planId: null,
        expiresAt: null,
        isActive: false,
        lastPayment: null
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseAccess();
  }, []);

  const value = {
    courseAccess,
    isLoading,
    error,
    refetch: fetchCourseAccess
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

