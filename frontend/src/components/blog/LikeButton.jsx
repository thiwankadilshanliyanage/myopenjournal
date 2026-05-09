import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { IconButton, Stack, Typography } from '@mui/material';

export default function LikeButton({ liked, count, onClick, disabled }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <IconButton onClick={onClick} disabled={disabled}>
        {liked ? <FavoriteRoundedIcon color="error" /> : <FavoriteBorderRoundedIcon />}
      </IconButton>
      <Typography>{count}</Typography>
    </Stack>
  );
}
