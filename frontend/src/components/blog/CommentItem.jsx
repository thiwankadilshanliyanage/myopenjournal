import { useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import { formatDate } from '../../utils/date';

import { useLanguage } from '../../context/LanguageContext';

import CommentForm from './CommentForm';

export default function CommentItem({
  comment,
  currentUser,
  onReply,
  onDelete,
  onEdit,
  level = 0
}) {

  const [replyOpen, setReplyOpen] =
    useState(false);

  const [editing, setEditing] =
    useState(false);

  const [editContent, setEditContent] =
    useState(comment.content);

  const { t } = useLanguage();

  const isOwner =
    currentUser &&
    currentUser._id === comment.user?._id;

  const isAdmin =
    currentUser?.role === 'admin';

  const canDelete =
    isOwner || isAdmin;

  const canEdit =
    isOwner;

  return (
    <Box
      sx={{
        ml: {
          xs: level ? 2 : 0,
          md: level ? 6 : 0
        }
      }}
    >

      <Paper
        variant="outlined"
        sx={{
          p: 2.5,
          borderColor: 'divider'
        }}
      >

        <Stack
          direction="row"
          spacing={2}
        >

          <Avatar src={comment.user?.avatar}>
            {comment.user?.name?.[0]}
          </Avatar>

          <Box sx={{ flexGrow: 1 }}>

            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={1}
            >

              <Box>

                <Typography fontWeight={700}>
                  {comment.user?.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  @{comment.user?.username}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {formatDate(comment.createdAt)}
                </Typography>

              </Box>

              <Stack
                direction="row"
                spacing={1}
              >

                {currentUser && (
                  <Button
                    size="small"
                    onClick={() =>
                      setReplyOpen(
                        (prev) => !prev
                      )
                    }
                  >
                    {t('reply')}
                  </Button>
                )}

                {canEdit && (
                  <Button
                    size="small"
                    onClick={() =>
                      setEditing(
                        (prev) => !prev
                      )
                    }
                  >
                    Edit
                  </Button>
                )}

                {canDelete && (
                  <Button
                    size="small"
                    color="error"
                    onClick={() =>
                      onDelete(comment._id)
                    }
                  >
                    {t('delete')}
                  </Button>
                )}

              </Stack>

            </Stack>

            {!editing ? (

              <Typography sx={{ mt: 1.5 }}>
                {comment.content}
              </Typography>

            ) : (

              <Stack spacing={2} sx={{ mt: 2 }}>

                <TextField
                  multiline
                  minRows={3}
                  value={editContent}
                  onChange={(e) =>
                    setEditContent(
                      e.target.value
                    )
                  }
                />

                <Stack
                  direction="row"
                  spacing={1}
                >

                  <Button
                    variant="contained"
                    onClick={async () => {

                      const ok =
                        await onEdit(
                          comment._id,
                          editContent
                        );

                      if (ok) {
                        setEditing(false);
                      }
                    }}
                  >
                    Save
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => {
                      setEditing(false);
                      setEditContent(
                        comment.content
                      );
                    }}
                  >
                    Cancel
                  </Button>

                </Stack>

              </Stack>
            )}

            {replyOpen && (

              <Box sx={{ mt: 2 }}>

                <CommentForm
                  autoFocus
                  onSubmit={async (
                    content
                  ) => {

                    const ok =
                      await onReply(
                        content,
                        comment._id
                      );

                    if (ok) {
                      setReplyOpen(false);
                    }

                    return ok;
                  }}
                />

              </Box>
            )}

          </Box>

        </Stack>

      </Paper>

      {!!comment.replies?.length && (

        <Stack
          spacing={2}
          sx={{ mt: 2 }}
        >

          {comment.replies.map(
            (reply) => (
              <CommentItem
                key={reply._id}
                comment={reply}
                currentUser={currentUser}
                onReply={onReply}
                onDelete={onDelete}
                onEdit={onEdit}
                level={level + 1}
              />
            )
          )}

        </Stack>
      )}

      <Divider sx={{ my: 2 }} />

    </Box>
  );
}