import { Button, Stack, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PageContainer from '../../components/common/PageContainer';
import AuthCard from '../../components/forms/AuthCard';
import { authApi } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';
import { useSnackbar } from '../../context/SnackbarContext';
import { useLanguage } from '../../context/LanguageContext';

export default function LoginPage() {
  const { t } = useLanguage();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await authApi.login(values);
      login(data.token, data.user);
      showSnackbar(t('loginSuccessful'), 'success');
      navigate(data.user.role === 'admin' ? '/admin' : '/profile');
    } catch (err) {
      showSnackbar(err.response?.data?.message || t('loginFailed'), 'error');
    }
  };

  return (
    <PageContainer maxWidth="sm" sx={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
      <AuthCard>
        <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1}>
            <Typography variant="h4">{t('login')}</Typography>
            <Typography color="text.secondary">{t('welcomeBack')}</Typography>
          </Stack>

          <TextField label={t('username')} {...register('username', { required: t('usernameRequired') })} error={!!errors.username} helperText={errors.username?.message} />
          <TextField label={t('password')} type="password" {...register('password', { required: t('passwordRequired') })} error={!!errors.password} helperText={errors.password?.message} />

          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {t('login')}
          </Button>

          <Button component={RouterLink} to="/forgot-password">
            {t('forgotPassword')}
          </Button>

          <Button component={RouterLink} to="/register">
            {t('noAccount')}
          </Button>
        </Stack>
      </AuthCard>
    </PageContainer>
  );
}