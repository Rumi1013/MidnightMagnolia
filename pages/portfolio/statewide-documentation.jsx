import CaseStudyPage from '../../components/portfolio/CaseStudyPage';
import { URLS } from '../../lib/constants';

export default function StatewideDocumentationCaseStudy() {
  return (
    <CaseStudyPage
      title="Statewide documentation & referral platform"
      description="Controlled terminology, navigation, and contributor review for legal and procedural information — listed here as proof of work."
      challenge="Legal and procedural information needed consistent structure, controlled terminology, and user-centered navigation. Advocates and families had to find the right page under time pressure, without a separate systems team."
      method="Designed the platform's information architecture and coordinated contributors and partner organizations through review and maintenance. Audience-first communications and version control kept internal and public language from drifting apart."
      evidence="Information architecture; controlled terminology; content review workflow; audience-first communications and version-control model."
      outcome="A public-facing documentation system that is still live. Client names and case files are not on this page."
      skills="Repository structure · metadata standards · content governance · accessible archival system design"
      liveHref={URLS.blfSite}
      liveLabel="View live site"
    />
  );
}
