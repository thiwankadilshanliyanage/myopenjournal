import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { useParams } from 'react-router-dom';

import { postApi } from '../../api/postApi';
import { commentApi } from '../../api/commentApi';
import { likeApi } from '../../api/likeApi';

import PageContainer from '../../components/common/PageContainer';
import LoadingSection from '../../components/common/LoadingSection';
import ErrorState from '../../components/common/ErrorState';
import EmptySection from '../../components/common/EmptySection';

import LikeButton from '../../components/blog/LikeButton';
import CommentForm from '../../components/blog/CommentForm';
import CommentList from '../../components/blog/CommentList';

import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useSnackbar } from '../../context/SnackbarContext';

import { formatDate } from '../../utils/date';
import {
  insertReplyIntoTree,
  removeCommentFromTree
} from '../../utils/commentTree';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const { showSnackbar } = useSnackbar();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(true);
  const [error, setError] = useState('');

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const { data } = await postApi.getPost(slug);
        setPost(data.data.post);
        setLikeCount(data.data.post.likeCount || 0);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load post');
      } finally {
        setPostLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  useEffect(() => {
    if (!post?._id) return;

    const loadComments = async () => {
      setCommentLoading(true);

      try {
        const { data } = await commentApi.getComments(post._id);
        setComments(data.data.comments || []);
      } catch {
        showSnackbar('Comments could not be loaded.', 'warning');
      } finally {
        setCommentLoading(false);
      }
    };

    loadComments();
  }, [post?._id, showSnackbar]);

  useEffect(() => {
    if (!post?._id || !isAuthenticated) {
      setLiked(false);
      return;
    }

    const loadLikeStatus = async () => {
      try {
        const { data } = await likeApi.status(post._id);
        setLiked(data.data.liked);
        setLikeCount(data.data.likeCount);
      } catch {
        setLiked(false);
      }
    };

    loadLikeStatus();
  }, [post?._id, isAuthenticated]);

  const updateCommentInTree = (items, commentId, updatedContent) =>
    items.map((item) => {
      if (item._id === commentId) {
        return {
          ...item,
          content: updatedContent
        };
      }

      if (item.replies?.length) {
        return {
          ...item,
          replies: updateCommentInTree(
            item.replies,
            commentId,
            updatedContent
          )
        };
      }

      return item;
    });

  const handleLike = async () => {
    if (!isAuthenticated) {
      showSnackbar('Please log in to like this post.', 'info');
      return;
    }

    if (likeLoading) return;

    setLikeLoading(true);

    const previousLiked = liked;
    const previousCount = likeCount;

    setLiked(!previousLiked);
    setLikeCount((prev) => prev + (previousLiked ? -1 : 1));

    try {
      const { data } = await likeApi.toggle({
        postId: post._id
      });

      setLiked(data.data.liked);
      setLikeCount(data.data.likeCount);
    } catch (err) {
      setLiked(previousLiked);
      setLikeCount(previousCount);

      showSnackbar(
        err.response?.data?.message || 'Like failed',
        'error'
      );
    } finally {
      setLikeLoading(false);
    }
  };

  const handleCreateComment = async (content, parentComment = null) => {
    if (!isAuthenticated) {
      showSnackbar('Please log in to comment.', 'info');
      return false;
    }

    try {
      const payload = {
        post: post._id,
        content
      };

      if (parentComment) {
        payload.parentComment = parentComment;
      }

      const { data } = await commentApi.createComment(payload);

      const newComment = {
        ...data.data.comment,
        replies: []
      };

      if (parentComment) {
        setComments((prev) =>
          insertReplyIntoTree(prev, parentComment, newComment)
        );
      } else {
        setComments((prev) => [...prev, newComment]);
      }

      showSnackbar(
        data.message || 'Comment added successfully',
        'success'
      );

      return true;
    } catch (err) {
      showSnackbar(
        err.response?.data?.message || 'Comment failed',
        'error'
      );

      return false;
    }
  };

  const handleEditComment = async (commentId, content) => {
    if (!content.trim()) {
      showSnackbar('Comment cannot be empty', 'error');
      return false;
    }

    try {
      const { data } = await commentApi.updateComment(commentId, {
        content: content.trim()
      });

      setComments((prev) =>
        updateCommentInTree(
          prev,
          commentId,
          data.data.comment.content
        )
      );

      showSnackbar(
        data.message || 'Comment updated',
        'success'
      );

      return true;
    } catch (err) {
      showSnackbar(
        err.response?.data?.message || 'Update failed',
        'error'
      );

      return false;
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentApi.deleteComment(commentId);

      setComments((prev) =>
        removeCommentFromTree(prev, commentId)
      );

      showSnackbar('Comment deleted', 'success');
    } catch (err) {
      showSnackbar(
        err.response?.data?.message || 'Delete failed',
        'error'
      );
    }
  };

  if (postLoading) {
    return <LoadingSection minHeight={360} />;
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorState message={error} />
      </PageContainer>
    );
  }

  if (!post) {
    return (
      <PageContainer>
        <EmptySection
          title="404"
          description="Post not found"
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="md">
      <Stack spacing={3}>
        <Box
          component="img"
          src={post.coverImage || 'https://placehold.co/1200x700'}
          alt={post.title}
          sx={{
            width: '100%',
            borderRadius: 4,
            maxHeight: 520,
            objectFit: 'cover'
          }}
        />

        <Stack spacing={2}>
          <Chip
            label={post.category?.name || 'Blog'}
            sx={{ alignSelf: 'flex-start' }}
          />

          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: '2rem',
                md: '3rem'
              }
            }}
          >
            {post.title}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Avatar src={post.author?.avatar}>
              {post.author?.name?.[0]}
            </Avatar>

            <Box>
              <Typography fontWeight={700}>
                {post.author?.name}
              </Typography>

              <Typography color="text.secondary">
                {formatDate(post.createdAt)}
              </Typography>
            </Box>
          </Stack>
        </Stack>

        <Paper
          variant="outlined"
          sx={{ p: { xs: 3, md: 4 } }}
        >
          <Typography
            sx={{
              whiteSpace: 'pre-wrap',
              lineHeight: 2
            }}
          >
            {post.content}
          </Typography>
        </Paper>

        <LikeButton
          liked={liked}
          count={likeCount}
          onClick={handleLike}
          disabled={likeLoading}
        />

        <Divider />

        <Stack spacing={3}>
          <Typography variant="h4">
            {t('comments')}
          </Typography>

          {isAuthenticated ? (
            <CommentForm
              onSubmit={(content) =>
                handleCreateComment(content)
              }
            />
          ) : (
            <EmptySection
              title="Login required"
              description="Please log in to comment"
            />
          )}

          {commentLoading ? (
            <LoadingSection minHeight={140} />
          ) : comments.length ? (
            <CommentList
              comments={comments}
              currentUser={user}
              onReply={handleCreateComment}
              onDelete={handleDeleteComment}
              onEdit={handleEditComment}
            />
          ) : (
            <EmptySection
              title="No comments"
              description="Be the first to comment"
            />
          )}
        </Stack>
      </Stack>
    </PageContainer>
  );
}