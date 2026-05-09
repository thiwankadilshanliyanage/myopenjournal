import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';

export default function LanguageToggle() {
  const { language, changeLanguage } = useLanguage();

  return (
    <ToggleButtonGroup
      size="small"
      value={language}
      exclusive
      onChange={(e, next) => next && changeLanguage(next)}
    >
      <ToggleButton value="ja">JP</ToggleButton>
      <ToggleButton value="en">EN</ToggleButton>
    </ToggleButtonGroup>
  );
}
