import StaticPageLayout from './StaticPageLayout';

export default function TermsPage() {
  return (
    <StaticPageLayout
      title="利用規約"
      sections={[
        { heading: '1. サービス利用', body: 'Users must use MyOpenJournal lawfully and respectfully.' },
        { heading: '2. 投稿内容', body: 'Content that violates laws, rights, or platform safety standards may be removed.' },
        { heading: '3. アカウント管理', body: 'Users are responsible for their credentials and account security.' }
      ]}
    />
  );
}
