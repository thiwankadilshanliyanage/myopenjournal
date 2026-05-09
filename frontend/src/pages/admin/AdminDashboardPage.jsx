import { useEffect, useState } from 'react';
import { Grid2 as Grid, Paper, Stack, Typography } from '@mui/material';
import PageContainer from '../../components/common/PageContainer';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminStatsCards from '../../components/admin/AdminStatsCards';
import { adminApi } from '../../api/adminApi';
import LoadingSection from '../../components/common/LoadingSection';
import ErrorState from '../../components/common/ErrorState';

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await adminApi.stats();
        setData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load admin dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) return <LoadingSection minHeight={320} />;
  if (error) return <PageContainer><ErrorState message={error} /></PageContainer>;

  return (
    <PageContainer>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <AdminSidebar />
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <Stack spacing={3}>
            <Typography variant="h3">Admin Dashboard</Typography>
            <AdminStatsCards stats={data.stats} />

            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Recent Posts
              </Typography>
              <Stack spacing={1.5}>
                {data.latestPosts.map((post) => (
                  <Typography key={post._id}>
                    {post.title} — {post.author?.name}
                  </Typography>
                ))}
              </Stack>
            </Paper>

            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Recent Comments
              </Typography>
              <Stack spacing={1.5}>
                {data.latestComments.map((comment) => (
                  <Typography key={comment._id}>
                    {comment.user?.name}: {comment.content}
                  </Typography>
                ))}
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
