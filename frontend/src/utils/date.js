export const formatDate = (value) => {
  if (!value) return '';
  return new Date(value).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
