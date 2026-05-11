import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { Button, Stack, Typography } from '@mui/material';

export default function LikeButton({ liked, count, onClick, disabled }) {
  return (
    <Stack direction="row" spacing={1.2} alignItems="center">
      <Button
        variant={liked ? 'contained' : 'outlined'}
        color={liked ? 'error' : 'inherit'}
        startIcon={liked ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
        onClick={onClick}
        disabled={disabled}
        sx={{ borderRadius: 99 }}
      >
        {liked ? 'Liked' : 'Like'}
      </Button>

      <Typography color="text.secondary">
        {count}
      </Typography>
    </Stack>
  );
}