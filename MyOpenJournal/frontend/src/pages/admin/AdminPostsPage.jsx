import { useEffect, useState } from 'react';
import {
  Button,
  Grid2 as Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PageContainer from '../../components/common/PageContainer';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { adminApi } from '../../api/adminApi';
import { postApi } from '../../api/postApi';
import { useSnackbar } from '../../context/SnackbarContext';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const loadPosts = async () => {
    try {
      const { data } = await adminApi.posts();
      setPosts(data.data.posts);
    } catch (err) {
      showSnackbar(err.response?.data?.message || 'Failed to load posts', 'error');
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await postApi.deletePost(id);
      setPosts((prev) => prev.filter((post) => post._id !== id));
      showSnackbar('Post deleted', 'success');
    } catch (err) {
      showSnackbar(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  return (
    <PageContainer>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <AdminSidebar />
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h3">Post Management</Typography>
            <Button component={RouterLink} to="/admin/posts/new" variant="contained">
              Create Post
            </Button>
          </Stack>
          <Paper variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post._id}>
                    <TableCell>{post.title}</TableCell>
                    <TableCell>{post.author?.name}</TableCell>
                    <TableCell>{post.status}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => navigate(`/admin/posts/${post._id}/edit`)}>Edit</Button>
                      <Button color="error" onClick={() => handleDelete(post._id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
