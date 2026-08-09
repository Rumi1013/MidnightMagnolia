import Layout from '../components/Layout';
import { URLS } from '../lib/constants';

export default function TermsConditions() {
  return (
    <Layout title="Terms & Conditions" description="Terms for using this site; full Wix storefront terms linked for purchases and bookings.">
      <div className="container section">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Legal</p>
          <h1>Terms &amp; Conditions</h1>
          <div className="divider" />
        </div>
        <div style={{ maxWidth: '65ch' }} className="muted">
          <p>
            Digital products, memberships, and many services are sold or scheduled through{' '}
            <a href={URLS.gumroad} target="_blank" rel="noopener noreferrer">Gumroad</a>,{' '}
            <a href={URLS.bmac} target="_blank" rel="noopener noreferrer">Buy Me a Coffee</a>,{' '}
            <a href={URLS.wixHome} target="_blank" rel="noopener noreferrer">Wix</a>, and linked tools. Each platform has its own checkout terms.
          </p>
          <p>
            <strong>Wix storefront terms.</strong> For bookings and Wix-native purchases, use the legal links in the footer of the live Wix sanctuary:{' '}
            <a href={URLS.wixHome} target="_blank" rel="noopener noreferrer">{URLS.wixHome}</a>.
          </p>
          <p>
            <strong>Content.</strong> Site copy, downloads, and email sequences are offered for personal use unless a separate contract says otherwise.
            Redistribution or resale of digital files without permission is not allowed.
          </p>
        </div>
      </div>
    </Layout>
  );
}
