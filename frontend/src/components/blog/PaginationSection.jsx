import { Box, Pagination } from '@mui/material';

export default function PaginationSection({ page, count, onChange }) {
  if (count <= 1) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Pagination page={page} count={count} onChange={(e, value) => onChange(value)} />
    </Box>
  );
}
