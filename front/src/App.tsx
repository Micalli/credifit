import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './app/contexts/AuthContext';
import { Router } from "./router";
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 2_000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster  />
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
