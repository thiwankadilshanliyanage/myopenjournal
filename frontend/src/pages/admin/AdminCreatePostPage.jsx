import { useEffect, useState } from 'react';
import { Alert, Grid2 as Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import PageContainer from '../../components/common/PageContainer';
import AdminSidebar from '../../components/admin/AdminSidebar';
import PostForm from '../../components/admin/PostForm';
import { postApi } from '../../api/postApi';
import { useSnackbar } from '../../context/SnackbarContext';

export default function AdminCreatePostPage() {
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    postApi.getCategories().then((response) => {
      setCategories(response.data.data.categories);
    });
  }, []);

  const handleSubmit = async (values) => {
    setSaving(true);
    setStatusMessage('');

    try {
      let coverImage = '';

      if (values.image) {
        setUploadingImage(true);
        setStatusMessage('Uploading cover image...');

        const imageData = new FormData();
        imageData.append('image', values.image);

        const uploadRes = await postApi.uploadImage(imageData);
        coverImage = uploadRes.data.data.imageUrl;

        setUploadingImage(false);
        setStatusMessage('Image uploaded. Creating post...');
      } else {
        setStatusMessage('Creating post...');
      }

      const payload = {
        ...values,
        slug: values.slug?.trim() || undefined,
        coverImage
      };

      delete payload.image;

      await postApi.createPost(payload);

      showSnackbar('Post created successfully', 'success');
      navigate('/admin');
    } catch (err) {
      setUploadingImage(false);
      showSnackbar(err.response?.data?.message || 'Post creation failed', 'error');
    } finally {
      setSaving(false);
      setStatusMessage('');
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

          {statusMessage && (
            <Alert severity="info" sx={{ mb: 2 }}>
              {statusMessage}
            </Alert>
          )}

          <PostForm
            categories={categories}
            onSubmit={handleSubmit}
            loading={saving}
            uploadingImage={uploadingImage}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
}