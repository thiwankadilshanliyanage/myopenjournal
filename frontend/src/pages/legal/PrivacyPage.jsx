import StaticPageLayout from './StaticPageLayout';

export default function PrivacyPage() {
  return (
    <StaticPageLayout
      title="プライバシーポリシー"
      sections={[
        { heading: '1. 取得する情報', body: 'We collect account information, profile data, and content you submit to operate the service securely.' },
        { heading: '2. 利用目的', body: 'Your information is used for authentication, content delivery, moderation, and platform improvement.' },
        { heading: '3. 安全管理', body: 'We apply authentication, validation, and secure infrastructure practices to protect your data.' }
      ]}
    />
  );
}
