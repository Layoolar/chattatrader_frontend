import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    const chattaTraderNewUser = localStorage.getItem('chattaTraderNewUser');
    if (chattaTraderNewUser) {
      return (
        <Navigate to='/sign-up' state={{ from: location.pathname }} replace />
      );
    }
    localStorage.setItem('chattaTraderNewUser', 'true');
    return <Navigate to='/' state={{ from: location.pathname }} replace />;
  }
  if (!user?.isVerified) {
    return (
      <Navigate
        to={`/verify-otp?email=${encodeURIComponent(user?.email ?? '')}`}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <>{children}</>;
};
