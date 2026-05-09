import { Button, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/common/PageContainer';
import AuthCard from '../../components/forms/AuthCard';
import { authApi } from '../../api/authApi';
import { useSnackbar } from '../../context/SnackbarContext';
import { useLanguage } from '../../context/LanguageContext';

export default function ForgotPasswordPage() {
  const { t } = useLanguage();
  const { register, handleSubmit } = useForm();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await authApi.forgotPassword(values);
      navigate('/reset-password', { state: data });
    } catch (err) {
      showSnackbar(err.response?.data?.message || t('requestFailed'), 'error');
    }
  };

  return (
    <PageContainer maxWidth="sm" sx={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
      <AuthCard>
        <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4">{t('forgotPassword')}</Typography>
          <Typography color="text.secondary">{t('resetPasswordSubtitle')}</Typography>

          <TextField label={t('username')} {...register('username', { required: true })} />

          <Button type="submit" variant="contained">
            {t('continue')}
          </Button>
        </Stack>
      </AuthCard>
    </PageContainer>
  );
}