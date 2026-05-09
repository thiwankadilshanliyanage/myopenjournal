import { Paper } from '@mui/material';

export default function AuthCard({ children }) {
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        p: { xs: 3, md: 4 },
        maxWidth: 480,
        mx: 'auto',
        borderColor: 'divider'
      }}
    >
      {children}
    </Paper>
  );
}
