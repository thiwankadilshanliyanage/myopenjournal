import { Box, Container, Stack, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 8 }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={1}>
          <Typography fontWeight={700}>MyOpenJournal</Typography>
          <Typography color="text.secondary">
            A calm, premium reading platform designed for Japanese and English audiences.
          </Typography>
          <Typography color="text.secondary" variant="body2">
            © {new Date().getFullYear()} MyOpenJournal
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
