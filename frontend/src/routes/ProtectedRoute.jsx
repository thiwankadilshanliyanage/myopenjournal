import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSection from '../components/common/LoadingSection';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, authLoading } = useAuth();

  if (authLoading) return <LoadingSection minHeight={320} />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
