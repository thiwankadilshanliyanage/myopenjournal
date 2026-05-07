import { Box, CircularProgress } from '@mui/material';

export default function LoadingSection({ minHeight = 160 }) {
  return (
    <Box
      sx={{
        minHeight,
        display: 'grid',
        placeItems: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  );
}
