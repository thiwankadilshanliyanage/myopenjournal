import { useEffect, useMemo, useState } from 'react';
import { Grid2 as Grid, Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { postApi } from '../../api/postApi';
import PageContainer from '../../components/common/PageContainer';
import SectionHeader from '../../components/common/SectionHeader';
import SearchBar from '../../components/blog/SearchBar';
import CategoryFilter from '../../components/blog/CategoryFilter';
import PostGrid from '../../components/blog/PostGrid';
import PaginationSection from '../../components/blog/PaginationSection';
import EmptySection from '../../components/common/EmptySection';
import ErrorState from '../../components/common/ErrorState';
import PostCardSkeleton from '../../components/blog/PostCardSkeleton';
import { useLanguage } from '../../context/LanguageContext';

export default function BlogListPage() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState(searchParams.get('search') || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const page = Number(searchParams.get('page') || 1);
  const category = searchParams.get('category') || '';

  useEffect(() => {
    const timeout = setTimeout(() => {
      const next = new URLSearchParams(searchParams);
      if (searchText) next.set('search', searchText);
      else next.delete('search');
      next.set('page', '1');
      setSearchParams(next, { replace: true });
    }, 450);

    return () => clearTimeout(timeout);
  }, [searchText]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError('');
      try {
        const [postRes, categoryRes] = await Promise.all([
          postApi.getPosts({
            page,
            search: searchParams.get('search') || '',
            category
          }),
          postApi.getCategories()
        ]);

        setPosts(postRes.data.data.posts);
        setPagination(postRes.data.data.pagination);
        setCategories(categoryRes.data.data.categories);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page, category, searchParams]);

  return (
    <PageContainer>
      <SectionHeader
        title={t('blogListTitle')}
        subtitle="A premium browsing layout with search, filtering, and clean pagination."
      />

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <SearchBar value={searchText} onChange={setSearchText} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CategoryFilter
            categories={categories}
            value={category}
            onChange={(value) => {
              const next = new URLSearchParams(searchParams);
              if (value) next.set('category', value);
              else next.delete('category');
              next.set('page', '1');
              setSearchParams(next);
            }}
          />
        </Grid>
      </Grid>

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
        <>
          <PostGrid posts={posts} />
          <PaginationSection
            page={pagination.page}
            count={pagination.pages}
            onChange={(nextPage) => {
              const next = new URLSearchParams(searchParams);
              next.set('page', String(nextPage));
              setSearchParams(next);
            }}
          />
        </>
      ) : (
        <EmptySection title={t('noPosts')} description="Try changing the search term or category filter." />
      )}
    </PageContainer>
  );
}
