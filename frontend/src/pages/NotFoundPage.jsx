import EmptySection from '../components/common/EmptySection';
import PageContainer from '../components/common/PageContainer';

export default function NotFoundPage() {
  return (
    <PageContainer maxWidth="sm">
      <EmptySection title="404" description="The page you are looking for could not be found." />
    </PageContainer>
  );
}
