import { Paper, Stack, Typography } from '@mui/material';
import PageContainer from '../../components/common/PageContainer';

export default function StaticPageLayout({ title, sections }) {
  return (
    <PageContainer maxWidth="md">
      <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 } }}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          {title}
        </Typography>
        <Stack spacing={3}>
          {sections.map((section) => (
            <Stack key={section.heading} spacing={1}>
              <Typography variant="h5">{section.heading}</Typography>
              <Typography color="text.secondary">{section.body}</Typography>
            </Stack>
          ))}
        </Stack>
      </Paper>
    </PageContainer>
  );
}
