import { Button, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import PageContainer from '../../components/common/PageContainer';
import AuthCard from '../../components/forms/AuthCard';
import { authApi } from '../../api/authApi';
import { useSnackbar } from '../../context/SnackbarContext';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await authApi.resetPassword(token, {
        password: values.password
      });
      showSnackbar(data.message, 'success');
      navigate('/login');
    } catch (err) {
      showSnackbar(err.response?.data?.message || 'Reset failed', 'error');
    }
  };

  return (
    <PageContainer maxWidth="sm" sx={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
      <AuthCard>
        <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4">新しいパスワード</Typography>
          <TextField
            label="New Password"
            type="password"
            {...register('password', { minLength: { value: 6, message: 'Minimum 6 characters' } })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            label="Confirm Password"
            type="password"
            {...register('confirmPassword', {
              validate: (value) => value === watch('password') || 'Passwords do not match'
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Reset Password
          </Button>
        </Stack>
      </AuthCard>
    </PageContainer>
  );
}
