import { Button, Stack, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PageContainer from '../../components/common/PageContainer';
import AuthCard from '../../components/forms/AuthCard';
import { authApi } from '../../api/authApi';
import { useSnackbar } from '../../context/SnackbarContext';

export default function RegisterPage() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await authApi.register({
        name: values.name,
        email: values.email,
        password: values.password
      });
      showSnackbar('Registration successful. Please log in.', 'success');
      navigate('/login');
    } catch (err) {
      showSnackbar(err.response?.data?.message || 'Registration failed', 'error');
    }
  };

  return (
    <PageContainer maxWidth="sm" sx={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
      <AuthCard>
        <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1}>
            <Typography variant="h4">新規登録</Typography>
            <Typography color="text.secondary">
              Create a new MyOpenJournal account.
            </Typography>
          </Stack>

          <TextField label="Name" {...register('name', { required: 'Name is required' })} error={!!errors.name} helperText={errors.name?.message} />
          <TextField label="Email" {...register('email', { required: 'Email is required' })} error={!!errors.email} helperText={errors.email?.message} />
          <TextField label="Password" type="password" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })} error={!!errors.password} helperText={errors.password?.message} />
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
            Register
          </Button>

          <Button component={RouterLink} to="/login">
            Already have an account?
          </Button>
        </Stack>
      </AuthCard>
    </PageContainer>
  );
}
