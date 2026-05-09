import { Grid2 as Grid, Paper, Stack, Typography } from '@mui/material';

export default function AdminStatsCards({ stats }) {
  const items = [
    { label: 'Users', value: stats.users || 0 },
    { label: 'Posts', value: stats.posts || 0 },
    { label: 'Comments', value: stats.comments || 0 }
  ];

  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid key={item.label} size={{ xs: 12, md: 4 }}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Stack spacing={1}>
              <Typography color="text.secondary">{item.label}</Typography>
              <Typography variant="h4">{item.value}</Typography>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
