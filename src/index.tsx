import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Base } from "@thirdweb-dev/chains";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create QueryClient with React Query v4 configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider activeChain={Base} clientId={process.env.REACT_APP_THIRDWEB_CLIENT_ID || "YOUR_THIRDWEB_CLIENT_ID"}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThirdwebProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
