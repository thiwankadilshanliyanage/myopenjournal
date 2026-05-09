import { TextField } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';

export default function SearchBar({ value, onChange }) {
  const { t } = useLanguage();

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={t('searchPlaceholder')}
    />
  );
}
