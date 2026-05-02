import Layout from '../components/Layout';

export default function PrivacyPolicy() {
  return (
    <Layout title="Privacy Policy" description="Privacy policy for midnight-magnolia.com.">
      <div className="container section">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Legal</p>
          <h1>Privacy Policy</h1>
          <div className="divider" />
        </div>
        <p className="muted" style={{ maxWidth: '65ch' }}>
          Replace this placeholder with your Wix-published privacy policy text, or link out to the Wix-hosted legal page.
        </p>
      </div>
    </Layout>
  );
}
