import { Paper, Stack, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function AdminSidebar() {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={1}>
        <Button component={RouterLink} to="/admin" color="inherit">
          Dashboard
        </Button>
        <Button component={RouterLink} to="/admin/posts" color="inherit">
          Manage Posts
        </Button>
        <Button component={RouterLink} to="/admin/posts/new" color="inherit">
          Create Post
        </Button>
        <Button component={RouterLink} to="/admin/comments" color="inherit">
          Manage Comments
        </Button>
      </Stack>
    </Paper>
  );
}
