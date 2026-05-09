import { Stack, Typography } from '@mui/material';

export default function SectionHeader({ title, subtitle, align = 'left' }) {
  return (
    <Stack spacing={1} sx={{ mb: 3, textAlign: align }}>
      <Typography variant="h3">{title}</Typography>
      {subtitle ? (
        <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
          {subtitle}
        </Typography>
      ) : null}
    </Stack>
  );
}
