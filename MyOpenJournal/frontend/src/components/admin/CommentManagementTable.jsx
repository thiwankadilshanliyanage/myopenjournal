import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from '@mui/material';

export default function CommentManagementTable({ comments, onDelete }) {
  return (
    <Paper variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Post</TableCell>
            <TableCell>Comment</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comments.map((comment) => (
            <TableRow key={comment._id}>
              <TableCell>{comment.user?.name}</TableCell>
              <TableCell>{comment.post?.title}</TableCell>
              <TableCell>{comment.content}</TableCell>
              <TableCell align="right">
                <Button color="error" onClick={() => onDelete(comment._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
