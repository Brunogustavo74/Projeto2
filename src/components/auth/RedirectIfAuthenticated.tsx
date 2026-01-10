import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface RedirectIfAuthenticatedProps {
  children: ReactNode;
}

export function RedirectIfAuthenticated({ children }: RedirectIfAuthenticatedProps) {
  const { user, roles, isLoading } = useAuth();

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Redirect authenticated users to appropriate dashboard
  if (user) {
    if (roles.includes('admin')) {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (roles.includes('seller')) {
      return <Navigate to="/seller/dashboard" replace />;
    } else {
      return <Navigate to="/buyer/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
