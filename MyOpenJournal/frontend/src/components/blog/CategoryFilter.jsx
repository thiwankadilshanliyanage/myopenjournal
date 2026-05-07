import { MenuItem, TextField } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';

export default function CategoryFilter({ categories = [], value, onChange }) {
  const { t } = useLanguage();

  return (
    <TextField select fullWidth value={value} onChange={(e) => onChange(e.target.value)}>
      <MenuItem value="">{t('allCategories')}</MenuItem>
      {categories.map((category) => (
        <MenuItem key={category._id} value={category._id}>
          {category.name}
        </MenuItem>
      ))}
    </TextField>
  );
}
