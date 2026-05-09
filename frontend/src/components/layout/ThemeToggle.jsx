import { IconButton } from '@mui/material';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { useThemeMode } from '../../context/ThemeModeContext';

export default function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <IconButton onClick={toggleMode} color="inherit">
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}
