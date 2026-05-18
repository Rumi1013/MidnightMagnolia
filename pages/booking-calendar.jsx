import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { URLS, SERVICES } from '../lib/constants';

const BOOKING_SERVICES = [
  {
    id: 'workflow-ops',
    title: 'Workflow & Ops Consulting',
    duration: '60 min',
    price: 'Book a call',
    description: 'One-on-one systems setup for program managers and nonprofit leaders. Career OS, automation wiring, and AI tool integration.',
    bullets: ['Career OS setup (Notion + Airtable)', 'Automation wiring (Zapier + Make)', 'AI tool integration + training'],
  },
  {
    id: 'ai-workshop',
    title: 'AI Literacy Workshop',
    duration: '90 min',
    price: 'Org pricing available',
    description: 'Practical AI tools for nonprofits, program managers, and ops leads. Built for people who need to work smarter, not perform productivity.',
    bullets: ['Prompt engineering basics', 'Tool stack recommendations', 'Workflow + reporting integration'],
  },
  {
    id: 'career-docs-review',
    title: 'Resume & Career Docs Review',
    duration: '45 min',
    price: '$29',
    description: 'Live review of your resume, cover letter, and LinkedIn summary. ATS-optimized feedback for $100K+ remote roles.',
    bullets: ['ATS audit + rewrite guidance', 'LinkedIn headline + summary', 'Interview narrative coaching'],
  },
];

export default function BookingCalendar() {
  const [selected, setSelected] = useState(null);
  const [wixServices, setWixServices] = useState([]);

  useEffect(() => {
    fetch('/api/wix/services')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.items?.length) setWixServices(data.items);
      })
      .catch(() => {});
  }, []);

  const services = wixServices.length > 0
    ? wixServices.map(s => ({
        id: s._id || s.id,
        title: s.info?.name || s.name,
        duration: s.schedule?.availabilityConstraints?.sessionDurations?.[0]
          ? `${s.schedule.availabilityConstraints.sessionDurations[0]} min`
          : null,
        price: s.payment?.rateType === 'FIXED' && s.payment?.fixed?.price
          ? `$${s.payment.fixed.price.value}`
          : 'Book a call',
        description: s.info?.description,
        bullets: [],
        wixId: s._id || s.id,
      }))
    : BOOKING_SERVICES;

  return (
    <Layout
      title="Book a Session"
      description="Book a workflow consulting session, AI literacy workshop, or career docs review with Latisha Vincent-Waters."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Booking</p>
          <h1>Book a Session</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            All sessions are virtual. Response within 24 hours of booking.
            No pressure — just structured support for the season you&apos;re in.
          </p>
        </div>

        <section className="section">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            {services.map(service => (
              <div
                key={service.id}
                className="card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: 'var(--space-lg)',
                  alignItems: 'start',
                  borderLeft: selected === service.id
                    ? '3px solid var(--color-amber)'
                    : '3px solid rgba(255,255,255,0.07)',
                  cursor: 'pointer',
                }}
                onClick={() => setSelected(s => s === service.id ? null : service.id)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                    <h3 style={{ margin: 0 }}>{service.title}</h3>
                    {service.duration && (
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-eyebrow-on-dark)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        {service.duration}
                      </span>
                    )}
                  </div>
                  <p className="muted" style={{ fontSize: '0.875rem', marginBottom: service.bullets?.length ? 'var(--space-md)' : 0 }}>
                    {service.description}
                  </p>
                  {service.bullets?.length > 0 && selected === service.id && (
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: 'var(--space-sm)' }}>
                      {service.bullets.map(b => (
                        <li key={b} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--color-muted)' }}>
                          <span style={{ color: 'var(--color-eyebrow-on-dark)' }} aria-hidden>◆</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div style={{ textAlign: 'right', minWidth: '120px' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-amber)', marginBottom: 'var(--space-md)' }}>
                    {service.price}
                  </p>
                  <a
                    href={URLS.booking}
                    className="btn btn--primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}
                  >
                    Book Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-lg)', alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ marginBottom: '0.4rem' }}>Not sure which session fits?</h3>
              <p className="muted" style={{ fontSize: '0.875rem' }}>
                Send a message and we&apos;ll figure it out together.
                No pitch, no pressure.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
              <a href={URLS.email} className="btn btn--outline">Send a Message</a>
              <Link href="/work-with-me" className="btn btn--ghost">See All Services</Link>
            </div>
          </div>
        </section>

        <p className="muted" style={{ fontSize: '0.8rem', paddingBottom: 'var(--space-2xl)', textAlign: 'center' }}>
          All sessions are virtual · Response within 24 hours · <a href={URLS.email} style={{ color: 'inherit' }}>bgconscious@gmail.com</a>
        </p>
      </div>
    </Layout>
  );
}
