import Link from 'next/link';
import Layout from '../components/Layout';
import { COLLECTION_SURVEY_URL, URLS } from '../lib/constants';

export default function Events() {
  return (
    <Layout title="Events & Gatherings" description="Magnolia Gatherings: intimate literary evenings, creative workshops, portable pop-ups, and private gifting experiences. First dates coming soon.">
      <div className="books-home">
        <section className="section section--linen" aria-labelledby="events-title">
          <div className="container">
            <h1 id="events-title">Magnolia Gatherings</h1>
            <p className="home-body">Books on the table. Candlelight in the room. A little space to make something meaningful together.</p>
            <p className="home-body">Our first gathering dates are coming soon. We’re shaping intimate experiences in the South Carolina Lowcountry, beginning with portable pop-ups and small gatherings.</p>
          </div>
        </section>
        <section className="section" aria-labelledby="event-plans-title">
          <div className="container home-offer-layout">
            <div>
              <h2 id="event-plans-title">What we’re imagining</h2>
              <p className="home-body">Help us choose the experiences you would enjoy and what you would expect from a gathering ticket.</p>
              <a href={COLLECTION_SURVEY_URL} className="btn btn--primary" target="_blank" rel="noopener noreferrer">Share your gathering interests</a>
            </div>
            <dl className="home-offer-list">
              <div><dt>Literary evenings</dt><dd>Intimate reading circles and bookish conversations with room to linger.</dd></div>
              <div><dt>Creative workshops</dt><dd>Guided journaling and keepsake-making afternoons with a clear project to take home.</dd></div>
              <div><dt>Private gifting &amp; gift bars</dt><dd>A hosted selection experience for friends, celebrations, or thoughtful group gifts.</dd></div>
              <div><dt>Portable pop-ups</dt><dd>A curated table of books, curiosities, and gifts at markets and community spaces.</dd></div>
            </dl>
          </div>
        </section>
        <section className="section section--dusk" aria-labelledby="event-dates-title">
          <div className="container">
            <h2 id="event-dates-title">Dates and tickets coming soon.</h2>
            <p className="home-body">There are no confirmed dates or tickets available here yet. Once a gathering is ready, we’ll share the location, accessibility details, what’s included, and ticket price.</p>
            <p className="home-body">The survey gathers your interests; it does not reserve a place or take payment.</p>
            <div className="hero__actions">
              <a href={URLS.email} className="btn btn--outline">Ask about hosting a gathering</a>
              <Link href="/#collections" className="btn btn--ghost">Explore the collections</Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
