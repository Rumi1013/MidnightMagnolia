import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { HOME_SPOTLIGHT, HOME_CTA_ART } from '../lib/brandAssets';
import { COLLECTION_SURVEY_URL } from '../lib/constants';

const COLLECTIONS = [
  {
    id: 'midnight-library',
    title: 'The Midnight Library',
    description: 'For a little escape: curated books and literary gifts that invite you to linger, with beautiful paper goods for your reading ritual.',
    details: 'Books, bookmarks, reading notes, and journals.',
  },
  {
    id: 'curiosity-cabinet',
    title: 'The Curiosity Cabinet',
    description: 'For everyday wonder: candles, crystals, botanicals, and unusual finds, thoughtfully chosen for your shelf, desk, or gift box.',
    details: 'Candlelight, collected treasures, and thoughtful finishing touches.',
  },
  {
    id: 'keepsake-studio',
    title: 'The Keepsake Studio',
    description: 'For the stories you carry: personalized journals, recipe booklets, and memory books that turn meaningful moments into keepsakes.',
    details: 'Personal gifts shaped around your words, photographs, and memories.',
  },
  {
    id: 'magnolia-gatherings',
    title: 'Magnolia Gatherings',
    description: 'For time together: intimate literary gatherings, creative workshops, and gifting experiences with room to slow down and connect.',
    details: 'Portable pop-ups, private gift bars, and small creative gatherings.',
  },
];

export default function Home() {
  return (
    <Layout
      title="Books & Curiosities"
      description="A Southern Gothic-inspired bookshop and curiosity boutique. Curated books, meaningful gifts, keepsakes, and intimate literary gatherings. First collection coming soon."
    >
      <div className="books-home">
        <section className="hero" aria-labelledby="home-title">
          <div className="container">
            <h1 id="home-title" className="hero__title">
              Midnight Magnolia <em>Books &amp; Curiosities</em>
            </h1>
            <p className="hero__subtitle">
              A Southern Gothic-inspired bookshop and curiosity boutique featuring carefully curated books, candles, crystals, thoughtful gifts, and intimate literary gatherings. Our first collection is coming soon, with dreams of taking Midnight Magnolia on the road.
            </p>
            <div className="hero__actions">
              <a href={COLLECTION_SURVEY_URL} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
                Help Shape Our First Collection
              </a>
              <a href="#collections" className="btn btn--outline">Explore the collections</a>
            </div>
            <p className="home-launch-note">Coming soon from the South Carolina Lowcountry. Your ideas help us choose what comes first.</p>
          </div>
        </section>

        <section id="collections" className="section section--linen" aria-labelledby="collections-title">
          <div className="container">
            <div className="home-section-intro">
              <h2 id="collections-title">Find magic in the everyday.</h2>
              <p>Something to read. Something to treasure. Something that says, <em>this made me think of you.</em> Four corners of one little world, taking shape together.</p>
            </div>
            <div className="collection-layout">
              <figure className="collection-art">
                <Image src={HOME_SPOTLIGHT.src} alt={HOME_SPOTLIGHT.alt} width={720} height={900} sizes="(max-width: 850px) 100vw, 35vw" />
                <figcaption>Original illustration from the Midnight Magnolia archive.</figcaption>
              </figure>
              <div className="collection-list">
                {COLLECTIONS.map(collection => (
                  <article id={collection.id} key={collection.id} className="collection-entry">
                    <h3>{collection.title}</h3>
                    <p>{collection.description}</p>
                    <p className="collection-detail">{collection.details}</p>
                    {collection.id === 'magnolia-gatherings' && <Link href="/events">Explore gathering plans</Link>}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="first-collection" className="section section--dusk" aria-labelledby="first-collection-title">
          <div className="container home-offer-layout">
            <div>
              <h2 id="first-collection-title">A gift that feels like them.</h2>
              <p className="home-body">We’re starting with a small, thoughtful collection for readers, curious souls, and people who want to give something personal. Tell us who you’re celebrating, what they love, and what would make their day.</p>
              <p className="home-body">These are the first ideas we’re exploring. Your feedback will help shape the selection, pricing, and gathering formats.</p>
              <a href={COLLECTION_SURVEY_URL} className="btn btn--primary" target="_blank" rel="noopener noreferrer">Tell us what you’d choose</a>
            </div>
            <dl className="home-offer-list">
              <div>
                <dt>The Magnolia Gift Edit</dt>
                <dd>A curated gift with a book or keepsake at its heart, coordinated curiosities, a personal note, and thoughtful wrapping.</dd>
              </div>
              <div>
                <dt>The Reader’s Edit</dt>
                <dd>A book matched to their tastes, a bookmark or paper good, a reading note, and a small curiosity tucked inside.</dd>
              </div>
              <div>
                <dt>An Heirloom Keepsake</dt>
                <dd>A memory journal, recipe booklet, or photo-and-story book, created from the moments you want to keep.</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="gatherings" className="section section--linen" aria-labelledby="gatherings-title">
          <div className="container home-gathering-layout">
            <div>
              <h2 id="gatherings-title">Good stories. Small gatherings.</h2>
              <p className="home-body">Imagine a candlelit reading circle, a table of books and beautiful finds, or an afternoon making a keepsake with friends. Magnolia Gatherings brings the collection into shared spaces.</p>
              <p className="home-body">We’re exploring literary evenings, creative workshops, private gifting appointments, and portable pop-ups. Dates, locations, and ticket details will be announced when confirmed.</p>
              <Link href="/events" className="btn btn--outline">Visit Events &amp; Gatherings</Link>
            </div>
            <aside className="gathering-note">
              <h3>What would you come for?</h3>
              <p>A bookish evening? A gift bar with friends? A quiet creative afternoon?</p>
              <a href={COLLECTION_SURVEY_URL} target="_blank" rel="noopener noreferrer">Share your gathering interests</a>
            </aside>
          </div>
        </section>

        <section id="our-story" className="section section--dark" aria-labelledby="road-title">
          <div className="container home-road-layout">
            <div>
              <h2 id="road-title">First a table.<br /><em>One day, a traveling shop.</em></h2>
              <p className="home-body">Founded by Latisha Vincent-Waters, Midnight Magnolia is growing from a love of books, beautiful objects, and the stories we carry.</p>
              <p className="home-body">Our dream is a Southern Gothic mobile bookshop and curiosity boutique, traveling to markets, literary events, and community spaces. We’re beginning with a small collection and portable gatherings, learning as we grow.</p>
              <p className="home-philosophy">Create to remember. Remember to create.</p>
              <Link href="/about" className="home-story-link">Meet Latisha</Link>
            </div>
            <Image src={HOME_CTA_ART.src} alt="Magnolia illustration from the Midnight Magnolia archive" width={640} height={640} sizes="(max-width: 850px) 100vw, 35vw" className="home-road-art" />
          </div>
        </section>

        <section className="section home-final-invitation" aria-labelledby="invitation-title">
          <div className="container">
            <h2 id="invitation-title">Help us choose what blooms first.</h2>
            <p>Your thoughts on books, gifts, keepsakes, and gathering tickets will help shape our first collection.</p>
            <a href={COLLECTION_SURVEY_URL} className="btn btn--primary" target="_blank" rel="noopener noreferrer">Help Shape Our First Collection</a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
