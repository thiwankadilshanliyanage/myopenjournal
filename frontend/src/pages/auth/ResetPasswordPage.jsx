import { Button, Stack, TextField, Typography } from '@mui/material';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PageContainer from '../../components/common/PageContainer';
import AuthCard from '../../components/forms/AuthCard';
import { authApi } from '../../api/authApi';
import { useSnackbar } from '../../context/SnackbarContext';
import { useLanguage } from '../../context/LanguageContext';

export default function ResetPasswordPage() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const data = location.state;

  if (!data) {
    return <Navigate to="/forgot-password" replace />;
  }

  const onSubmit = async (values) => {
    try {
      await authApi.resetPassword({
        username: data.username,
        secretAnswer1: values.secretAnswer1,
        secretAnswer2: values.secretAnswer2,
        password: values.password
      });

      showSnackbar(t('passwordResetSuccessful'), 'success');
      navigate('/login');
    } catch (err) {
      showSnackbar(err.response?.data?.message || t('resetFailed'), 'error');
    }
  };

  return (
    <PageContainer maxWidth="sm" sx={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
      <AuthCard>
        <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1}>
            <Typography variant="h4">{t('resetPassword')}</Typography>
            <Typography color="text.secondary">{t('secretResetSubtitle')}</Typography>
          </Stack>

          <Typography fontWeight={700}>{data.secretQuestion1}</Typography>
          <TextField label={t('answer1')} {...register('secretAnswer1', { required: true })} />

          <Typography fontWeight={700}>{data.secretQuestion2}</Typography>
          <TextField label={t('answer2')} {...register('secretAnswer2', { required: true })} />

          <TextField label={t('newPassword')} type="password" {...register('password', { required: true })} />

          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {t('resetPassword')}
          </Button>
        </Stack>
      </AuthCard>
    </PageContainer>
  );
}