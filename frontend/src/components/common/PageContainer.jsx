import { Container } from '@mui/material';

export default function PageContainer({ children, maxWidth = 'lg', sx = {} }) {
  return (
    <Container maxWidth={maxWidth} sx={{ py: { xs: 4, md: 6 }, ...sx }}>
      {children}
    </Container>
  );
}
