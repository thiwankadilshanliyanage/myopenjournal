import { useEffect, useState } from 'react';
import {
  Button,
  MenuItem,
  Stack,
  TextField
} from '@mui/material';

export default function PostForm({
  initialValues,
  categories,
  onSubmit,
  loading
}) {
  const [values, setValues] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    status: 'published',
    image: null
  });

  useEffect(() => {
    if (initialValues) {
      setValues({
        title: initialValues.title || '',
        slug: initialValues.slug || '',
        excerpt: initialValues.excerpt || '',
        content: initialValues.content || '',
        category: initialValues.category?._id || '',
        tags: (initialValues.tags || []).join(', '),
        status: initialValues.status || 'published',
        image: null
      });
    }
  }, [initialValues]);

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...values,
      tags: values.tags
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    });
  };

  return (
    <Stack component="form" spacing={2.5} onSubmit={handleSubmit}>
      <TextField label="Title" value={values.title} onChange={(e) => handleChange('title', e.target.value)} />
      <TextField label="Slug" value={values.slug} onChange={(e) => handleChange('slug', e.target.value)} />
      <TextField label="Excerpt" multiline minRows={3} value={values.excerpt} onChange={(e) => handleChange('excerpt', e.target.value)} />
      <TextField label="Content" multiline minRows={12} value={values.content} onChange={(e) => handleChange('content', e.target.value)} />
      <TextField select label="Category" value={values.category} onChange={(e) => handleChange('category', e.target.value)}>
        {categories.map((category) => (
          <MenuItem key={category._id} value={category._id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField label="Tags (comma separated)" value={values.tags} onChange={(e) => handleChange('tags', e.target.value)} />
      <TextField select label="Status" value={values.status} onChange={(e) => handleChange('status', e.target.value)}>
        <MenuItem value="draft">Draft</MenuItem>
        <MenuItem value="published">Published</MenuItem>
      </TextField>
      <Button variant="outlined" component="label">
        Upload Cover Image
        <input hidden type="file" accept="image/*" onChange={(e) => handleChange('image', e.target.files?.[0] || null)} />
      </Button>
      <Button type="submit" variant="contained" disabled={loading}>
        Save Post
      </Button>
    </Stack>
  );
}
