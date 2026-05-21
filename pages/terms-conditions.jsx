import Layout from '../components/Layout';

export default function TermsConditions() {
  return (
    <Layout title="Terms & Conditions" description="Terms and conditions for midnight-magnolia.com.">
      <div className="container section">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Legal</p>
          <h1>Terms &amp; Conditions</h1>
          <div className="divider" />
        </div>
        <p className="muted" style={{ maxWidth: '65ch' }}>
          Replace this placeholder with your Wix-published terms text, or link out to the Wix-hosted legal page.
        </p>
      </div>
    </Layout>
  );
}
