import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { formatDate } from '../../utils/date';

export default function PostCard({ post }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea
        component={RouterLink}
        to={`/blogs/${post.slug}`}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch'
        }}
      >
        <CardMedia
          component="img"
          image={post.coverImage || 'https://placehold.co/800x500?text=Sakura+Note'}
          alt={post.title}
          sx={{ height: 220, objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Stack spacing={1.5} sx={{ height: '100%' }}>
            <Box>
              <Chip
                label={post.category?.name || 'Category'}
                size="small"
                sx={{ bgcolor: 'primary.main', color: '#111' }}
              />
            </Box>
            <Typography variant="h6">{post.title}</Typography>
            <Typography color="text.secondary" sx={{ flexGrow: 1 }}>
              {post.excerpt}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.author?.name} ・ {formatDate(post.createdAt)}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
