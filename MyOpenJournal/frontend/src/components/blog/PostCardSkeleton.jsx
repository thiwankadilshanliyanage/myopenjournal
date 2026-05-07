import { Card, Skeleton, Stack } from '@mui/material';

export default function PostCardSkeleton() {
  return (
    <Card sx={{ p: 2 }}>
      <Skeleton variant="rounded" height={220} />
      <Stack spacing={1} sx={{ mt: 2 }}>
        <Skeleton width="30%" />
        <Skeleton height={36} />
        <Skeleton />
        <Skeleton width="55%" />
      </Stack>
    </Card>
  );
}
