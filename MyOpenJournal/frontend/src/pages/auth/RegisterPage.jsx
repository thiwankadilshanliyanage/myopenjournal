import {
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PageContainer from '../../components/common/PageContainer';
import AuthCard from '../../components/forms/AuthCard';
import { authApi } from '../../api/authApi';
import { useSnackbar } from '../../context/SnackbarContext';
import { useLanguage } from '../../context/LanguageContext';

export default function RegisterPage() {
  const { t } = useLanguage();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const questions = [
    t('favoriteFood'),
    t('childhoodNickname'),
    t('favoriteMovie'),
    t('birthCity'),
    t('dreamJob')
  ];

  const onSubmit = async (values) => {
    try {
      await authApi.register(values);
      showSnackbar(t('registrationSuccessful'), 'success');
      navigate('/login');
    } catch (err) {
      showSnackbar(err.response?.data?.message || t('registrationFailed'), 'error');
    }
  };

  return (
    <PageContainer maxWidth="sm" sx={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
      <AuthCard>
        <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1}>
            <Typography variant="h4">{t('createAccount')}</Typography>
            <Typography color="text.secondary">{t('createAccountSubtitle')}</Typography>
          </Stack>

          <TextField label={t('username')} {...register('username', { required: t('usernameRequired') })} error={!!errors.username} helperText={errors.username?.message} />
          <TextField label={t('name')} {...register('name', { required: t('nameRequired') })} error={!!errors.name} helperText={errors.name?.message} />

          <TextField
            label={t('password')}
            type="password"
            {...register('password', {
              required: t('passwordRequired'),
              minLength: { value: 6, message: t('minPassword') }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            label={t('confirmPassword')}
            type="password"
            {...register('confirmPassword', {
              validate: (value) => value === watch('password') || t('passwordsDoNotMatch')
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <TextField select label={t('secretQuestion1')} defaultValue="" {...register('secretQuestion1', { required: true })}>
            {questions.map((q) => (
              <MenuItem key={q} value={q}>{q}</MenuItem>
            ))}
          </TextField>

          <TextField label={t('secretAnswer1')} {...register('secretAnswer1', { required: true })} />

          <TextField select label={t('secretQuestion2')} defaultValue="" {...register('secretQuestion2', { required: true })}>
            {questions.map((q) => (
              <MenuItem key={q} value={q}>{q}</MenuItem>
            ))}
          </TextField>

          <TextField label={t('secretAnswer2')} {...register('secretAnswer2', { required: true })} />

          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {t('register')}
          </Button>

          <Button component={RouterLink} to="/login">
            {t('alreadyHaveAccount')}
          </Button>
        </Stack>
      </AuthCard>
    </PageContainer>
  );
}