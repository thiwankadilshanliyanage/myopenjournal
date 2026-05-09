import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSection from '../components/common/LoadingSection';

export default function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, authLoading } = useAuth();

  if (authLoading) return <LoadingSection minHeight={320} />;
  if (!isAuthenticated || !isAdmin) return <Navigate to="/" replace />;

  return children;
}
