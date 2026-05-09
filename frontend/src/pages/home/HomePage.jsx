import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Grid2 as Grid,
  Stack,
  Typography
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { postApi } from '../../api/postApi';
import PageContainer from '../../components/common/PageContainer';
import SectionHeader from '../../components/common/SectionHeader';
import EmptySection from '../../components/common/EmptySection';
import ErrorState from '../../components/common/ErrorState';
import PostGrid from '../../components/blog/PostGrid';
import PostCardSkeleton from '../../components/blog/PostCardSkeleton';
import HeroImageSlider from '../../pages/home/HeroImageSlider';
import { useLanguage } from '../../context/LanguageContext';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [postRes, categoryRes] = await Promise.all([
          postApi.getPosts({ page: 1, limit: 6 }),
          postApi.getCategories()
        ]);

        setPosts(postRes.data.data.posts);
        setCategories(categoryRes.data.data.categories);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load home page');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <Box
        sx={{
          background:
            'linear-gradient(180deg, rgba(247,198,217,0.18) 0%, rgba(247,198,217,0.04) 55%, transparent 100%)'
        }}
      >
        <PageContainer>
          <Grid container spacing={4} alignItems="center" sx={{ py: { xs: 4, md: 8 } }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={3}>
                <Typography variant="h1" sx={{ fontSize: { xs: '2.2rem', md: '3.4rem' } }}>
                  {t('heroTitle')}
                </Typography>

                <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
                  {t('heroSubtitle')}
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button component={RouterLink} to="/blogs" variant="contained" size="large">
                    {t('browseBlogs')}
                  </Button>
                  <Button component={RouterLink} to="/register" variant="outlined" size="large">
                    {t('register')}
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <HeroImageSlider />
            </Grid>
          </Grid>
        </PageContainer>
      </Box>

      <PageContainer>
        <SectionHeader
          title={t('latestPosts')}
          subtitle="Carefully presented recent articles for a refined first impression."
        />

        {error ? (
          <ErrorState message={error} />
        ) : loading ? (
          <Grid container spacing={3}>
            {[...Array(6)].map((_, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                <PostCardSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : posts.length ? (
          <PostGrid posts={posts} />
        ) : (
          <EmptySection
            title={t('noPosts')}
            description="Please add your first article from the admin dashboard."
          />
        )}
      </PageContainer>

      <PageContainer>
        <SectionHeader title={t('categories')} subtitle="Discover posts by topic." />

        <Stack direction="row" flexWrap="wrap" gap={1.5}>
          {categories.map((category) => (
            <Chip
              key={category._id}
              label={category.name}
              component={RouterLink}
              to={`/blogs?category=${category._id}`}
              clickable
            />
          ))}
        </Stack>
      </PageContainer>
    </>
  );
}