import { Paper, Stack, Typography } from '@mui/material';

export default function EmptySection({ title, description }) {
  return (
    <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', borderColor: 'divider' }}>
      <Stack spacing={1}>
        <Typography variant="h6">{title}</Typography>
        <Typography color="text.secondary">{description}</Typography>
      </Stack>
    </Paper>
  );
}
