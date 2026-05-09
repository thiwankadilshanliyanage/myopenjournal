import { Stack } from '@mui/material';
import CommentItem from './CommentItem';

export default function CommentList({ comments, currentUser, onReply, onDelete }) {
  return (
    <Stack spacing={1}>
      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          currentUser={currentUser}
          onReply={onReply}
          onDelete={onDelete}
        />
      ))}
    </Stack>
  );
}
