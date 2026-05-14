import Layout from '../components/Layout';
import { URLS } from '../lib/constants';

export default function PrivacyPolicy() {
  return (
    <Layout title="Privacy Policy" description="How Midnight Magnolia handles data on this Next.js site and where the full Wix policy lives.">
      <div className="container section">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Legal</p>
          <h1>Privacy Policy</h1>
          <div className="divider" />
        </div>
        <div style={{ maxWidth: '65ch' }} className="muted">
          <p>
            This repository powers pages at <strong>{process.env.NEXT_PUBLIC_SITE_URL || 'your deployed domain'}</strong>.
            Commerce, bookings, and much of the public blog still route through the Wix sanctuary at{' '}
            <a href={URLS.wixHome} target="_blank" rel="noopener noreferrer">{URLS.wixHome}</a>.
            For purchases and Wix-native forms, Wix is the data controller for those flows.
          </p>
          <p>
            <strong>Analytics.</strong> If enabled (for example Vercel Analytics), aggregate usage may be collected by the host.
            This site does not run its own ad pixels from this template.
          </p>
          <p>
            <strong>Email.</strong> Mailto links open your client; no message content is stored by this site unless you later wire a form or ESP.
          </p>
          <p>
            <strong>Canonical Wix policy.</strong> For language aligned to storefront, blog, and Wix bookings, use the Privacy link in the footer of the live Wix site:{' '}
            <a href={URLS.wixHome} target="_blank" rel="noopener noreferrer">{URLS.wixHome}</a>.
            When the legal text is merged verbatim here, keep that page as the version history anchor.
          </p>
        </div>
      </div>
    </Layout>
  );
}
