import { useEffect, useState } from 'react';
import { Grid2 as Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/common/PageContainer';
import AdminSidebar from '../../components/admin/AdminSidebar';
import PostForm from '../../components/admin/PostForm';
import { postApi } from '../../api/postApi';
import { useSnackbar } from '../../context/SnackbarContext';

export default function AdminCreatePostPage() {
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    postApi.getCategories().then((response) => {
      setCategories(response.data.data.categories);
    });
  }, []);

  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      let coverImage = '';

      if (values.image) {
        const imageData = new FormData();
        imageData.append('image', values.image);
        const uploadRes = await postApi.uploadImage(imageData);
        coverImage = uploadRes.data.data.imageUrl;
      }

      await postApi.createPost({
        ...values,
        coverImage
      });

      showSnackbar('Post created successfully', 'success');
      navigate('/admin');
    } catch (err) {
      showSnackbar(err.response?.data?.message || 'Post creation failed', 'error');
    } finally {
      setSaving(false);
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
            Create Post
          </Typography>
          <PostForm categories={categories} onSubmit={handleSubmit} loading={saving} />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
