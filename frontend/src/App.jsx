import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/home/HomePage';
import BlogListPage from './pages/blogs/BlogListPage';
import BlogDetailPage from './pages/blogs/BlogDetailPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import ProfilePage from './pages/profile/ProfilePage';
import PrivacyPage from './pages/legal/PrivacyPage';
import TermsPage from './pages/legal/TermsPage';
import ContactPage from './pages/legal/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminCreatePostPage from './pages/admin/AdminCreatePostPage';
import AdminCommentsPage from './pages/admin/AdminCommentsPage';
import AdminPostsPage from './pages/admin/AdminPostsPage';
import AdminEditPostPage from './pages/admin/AdminEditPostPage';

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogListPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/posts/new"
            element={
              <AdminRoute>
                <AdminCreatePostPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/posts"
            element={
              <AdminRoute>
                <AdminPostsPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/posts/:id/edit"
            element={
              <AdminRoute>
                <AdminEditPostPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/comments"
            element={
              <AdminRoute>
                <AdminCommentsPage />
              </AdminRoute>
            }
          />

          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}