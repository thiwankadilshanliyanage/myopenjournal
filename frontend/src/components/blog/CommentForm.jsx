import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function CommentForm({ onSubmit, loading = false, autoFocus = false }) {
  const [content, setContent] = useState('');
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    const ok = await onSubmit(content.trim());
    if (ok) setContent('');
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
      <TextField
        autoFocus={autoFocus}
        multiline
        minRows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit" variant="contained" disabled={loading}>
        {t('submit')}
      </Button>
    </Stack>
  );
}
