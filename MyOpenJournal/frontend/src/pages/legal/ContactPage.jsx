import StaticPageLayout from './StaticPageLayout';

export default function ContactPage() {
  return (
    <StaticPageLayout
      title="お問い合わせ"
      sections={[
        { heading: 'Support', body: 'For support inquiries, contact jpproject894@gmail.com' },
        { heading: 'Business', body: 'For partnerships or media inquiries, contact jpproject894@gmail.com' }
      ]}
    />
  );
}
