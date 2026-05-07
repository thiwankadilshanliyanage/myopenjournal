import { useEffect, useState } from 'react';
import { Grid2 as Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import PageContainer from '../../components/common/PageContainer';
import AdminSidebar from '../../components/admin/AdminSidebar';
import PostForm from '../../components/admin/PostForm';
import { adminApi } from '../../api/adminApi';
import { postApi } from '../../api/postApi';
import { useSnackbar } from '../../context/SnackbarContext';
import LoadingSection from '../../components/common/LoadingSection';

export default function AdminEditPostPage() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState(null);
  const [saving, setSaving] = useState(false);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoryRes, postsRes] = await Promise.all([
          postApi.getCategories(),
          adminApi.posts()
        ]);
        setCategories(categoryRes.data.data.categories);
        setPost(postsRes.data.data.posts.find((item) => item._id === id) || null);
      } catch (err) {
        showSnackbar(err.response?.data?.message || 'Failed to load post', 'error');
      }
    };
    loadData();
  }, [id]);

  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      let coverImage = post?.coverImage || '';

      if (values.image) {
        const imageData = new FormData();
        imageData.append('image', values.image);
        const uploadRes = await postApi.uploadImage(imageData);
        coverImage = uploadRes.data.data.imageUrl;
      }

      await postApi.updatePost(id, {
        ...values,
        coverImage
      });

      showSnackbar('Post updated successfully', 'success');
      navigate('/admin/posts');
    } catch (err) {
      showSnackbar(err.response?.data?.message || 'Update failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (!post) return <LoadingSection minHeight={320} />;

  return (
    <PageContainer>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <AdminSidebar />
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <Typography variant="h3" sx={{ mb: 3 }}>
            Edit Post
          </Typography>
          <PostForm initialValues={post} categories={categories} onSubmit={handleSubmit} loading={saving} />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
