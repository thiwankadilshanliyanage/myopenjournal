import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid2 as Grid,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import PageContainer from '../../components/common/PageContainer';
import { userApi } from '../../api/userApi';
import { useAuth } from '../../context/AuthContext';
import { useSnackbar } from '../../context/SnackbarContext';

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const { showSnackbar } = useSnackbar();
  const [form, setForm] = useState({ name: '', email: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleProfileSave = async () => {
    setSaving(true);
    try {
      const { data } = await userApi.updateProfile(form);
      setUser(data.data.user);
      showSnackbar(data.message, 'success');
    } catch (err) {
      showSnackbar(err.response?.data?.message || 'Profile update failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await userApi.updateAvatar(formData);
      setUser(data.data.user);
      showSnackbar(data.message, 'success');
    } catch (err) {
      showSnackbar(err.response?.data?.message || 'Avatar upload failed', 'error');
    }
  };

  return (
    <PageContainer>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Stack spacing={2} alignItems="center">
              <Avatar src={user?.avatar} sx={{ width: 112, height: 112 }}>
                {user?.name?.[0]}
              </Avatar>
              <Typography variant="h5">{user?.name}</Typography>
              <Typography color="text.secondary">{user?.email}</Typography>
              <Button variant="outlined" component="label">
                Upload Avatar
                <input hidden type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleAvatarUpload(e.target.files[0])} />
              </Button>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h4">プロフィール</Typography>
              <TextField label="Name" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} />
              <TextField label="Email" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} />
              <Button variant="contained" onClick={handleProfileSave} disabled={saving}>
                Save Changes
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
