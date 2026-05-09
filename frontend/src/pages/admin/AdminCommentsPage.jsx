import { useEffect, useState } from 'react';
import { Grid2 as Grid, Typography } from '@mui/material';
import PageContainer from '../../components/common/PageContainer';
import AdminSidebar from '../../components/admin/AdminSidebar';
import CommentManagementTable from '../../components/admin/CommentManagementTable';
import { adminApi } from '../../api/adminApi';
import { useSnackbar } from '../../context/SnackbarContext';

export default function AdminCommentsPage() {
  const [comments, setComments] = useState([]);
  const { showSnackbar } = useSnackbar();

  const loadComments = async () => {
    try {
      const { data } = await adminApi.comments();
      setComments(data.data.comments);
    } catch (err) {
      showSnackbar(err.response?.data?.message || 'Failed to load comments', 'error');
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await adminApi.deleteComment(id);
      setComments((prev) => prev.filter((item) => item._id !== id));
      showSnackbar('Comment deleted', 'success');
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
          <Typography variant="h3" sx={{ mb: 3 }}>
            Comment Management
          </Typography>
          <CommentManagementTable comments={comments} onDelete={handleDelete} />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
