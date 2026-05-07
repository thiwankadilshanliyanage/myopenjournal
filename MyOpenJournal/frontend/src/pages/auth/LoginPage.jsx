import { Button, Stack, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PageContainer from '../../components/common/PageContainer';
import AuthCard from '../../components/forms/AuthCard';
import { authApi } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';
import { useSnackbar } from '../../context/SnackbarContext';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await authApi.login(values);

      // ✅ FIX HERE
      login(data.token, data.user);

      showSnackbar("Login successful", "success");

      navigate(data.user.role === 'admin' ? '/admin' : '/profile');
    } catch (err) {
      showSnackbar(err.response?.data?.message || 'Login failed', 'error');
    }
  };

  return (
    <PageContainer maxWidth="sm" sx={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
      <AuthCard>
        <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1}>
            <Typography variant="h4">ログイン</Typography>
            <Typography color="text.secondary">
              Welcome back to MyOpenJournal.
            </Typography>
          </Stack>

          <TextField
            label="Email"
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type="password"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Login
          </Button>

          <Button component={RouterLink} to="/forgot-password">
            Forgot password?
          </Button>

          <Button component={RouterLink} to="/register">
            Create account
          </Button>
        </Stack>
      </AuthCard>
    </PageContainer>
  );
}