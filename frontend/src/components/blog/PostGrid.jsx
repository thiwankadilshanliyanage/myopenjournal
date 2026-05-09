import { Grid2 as Grid } from '@mui/material';
import PostCard from './PostCard';

export default function PostGrid({ posts = [] }) {
  return (
    <Grid container spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} size={{ xs: 12, sm: 6, md: 4 }}>
          <PostCard post={post} />
        </Grid>
      ))}
    </Grid>
  );
}
