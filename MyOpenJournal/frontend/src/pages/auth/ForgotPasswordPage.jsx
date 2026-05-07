import { Button, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import PageContainer from '../../components/common/PageContainer';
import AuthCard from '../../components/forms/AuthCard';
import { authApi } from '../../api/authApi';
import { useSnackbar } from '../../context/SnackbarContext';

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const { showSnackbar } = useSnackbar();

  const onSubmit = async (values) => {
    try {
      const { data } = await authApi.forgotPassword(values);
      showSnackbar(data.message, 'success');
    } catch (err) {
      showSnackbar(err.response?.data?.message || 'Request failed', 'error');
    }
  };

  return (
    <PageContainer maxWidth="sm" sx={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
      <AuthCard>
        <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4">パスワード再設定</Typography>
          <Typography color="text.secondary">
            Enter your email and we will prepare a password reset flow.
          </Typography>
          <TextField label="Email" {...register('email')} />
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Send reset link
          </Button>
        </Stack>
      </AuthCard>
    </PageContainer>
  );
}
