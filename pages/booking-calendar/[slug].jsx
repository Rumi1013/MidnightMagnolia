import { useMemo, useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { URLS } from '../../lib/constants';
import {
  getBookingServiceBySlug,
  listServiceAvailabilitySlots,
  formatServicePrice,
  formatServiceDuration,
  jsonForProps,
} from '../../lib/wix';

function formatSlotLabel(localStartDate) {
  if (!localStartDate) return '';
  const d = new Date(localStartDate);
  return d.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/New_York',
  });
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const service = await getBookingServiceBySlug(params.slug);
  if (!service || service.hidden === true) return { notFound: true };

  const slots = await listServiceAvailabilitySlots(service, { days: 14 });
  const slimSlots = (slots || []).slice(0, 48).map((slot) => ({
    serviceId: slot.serviceId,
    scheduleId: slot.scheduleId,
    localStartDate: slot.localStartDate,
    localEndDate: slot.localEndDate,
    bookable: slot.bookable !== false,
    location: slot.location
      ? {
          locationType: slot.location.locationType || null,
          formattedAddress: slot.location.formattedAddress || null,
          name: slot.location.name || null,
        }
      : null,
    availableResources: (slot.availableResources || []).map((group) => ({
      resourceTypeId: group.resourceTypeId,
      resources: (group.resources || []).map((r) => ({
        id: r.id || r._id,
        name: r.name || null,
      })),
    })),
  }));

  return {
    props: jsonForProps({
      service: {
        id: service._id,
        name: service.name || 'Session',
        slug: service.mainSlug?.name || params.slug,
        tagLine: service.tagLine || '',
        description: service.description || '',
        price: formatServicePrice(service),
        duration: formatServiceDuration(service),
        rateType: service.payment?.rateType || null,
        online: service.payment?.options?.online === true,
        inPerson: service.payment?.options?.inPerson === true,
      },
      slots: slimSlots,
    }),
    revalidate: 120,
  };
}

export default function BookingCalendarPage({ service, slots }) {
  const [selected, setSelected] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const needsCheckout = service.online && service.rateType !== 'NO_FEE';

  const grouped = useMemo(() => {
    const map = new Map();
    for (const slot of slots || []) {
      const day = (slot.localStartDate || '').slice(0, 10);
      if (!map.has(day)) map.set(day, []);
      map.get(day).push(slot);
    }
    return [...map.entries()];
  }, [slots]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!selected) {
      setStatus({ type: 'error', message: 'Choose a time slot first.' });
      return;
    }
    if (needsCheckout) {
      const subject = encodeURIComponent(`Book: ${service.name} — ${formatSlotLabel(selected.localStartDate)}`);
      const body = encodeURIComponent(
        `Hi Latisha,\n\nI'd like to book ${service.name}.\nPreferred slot (ET): ${formatSlotLabel(selected.localStartDate)}\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n`,
      );
      window.location.href = `${URLS.email}?subject=${subject}&body=${body}`;
      return;
    }

    setSubmitting(true);
    setStatus({ type: '', message: '' });
    try {
      const res = await fetch('/api/wix/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: service.slug,
          slot: selected,
          contact: { firstName, lastName, email, phone },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({ type: 'error', message: data.error || 'Booking failed.' });
      } else {
        setStatus({
          type: 'ok',
          message: 'Booked. Check your email for confirmation from Wix Bookings.',
        });
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error — try again or email Latisha.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout
      title={`Book · ${service.name}`}
      description={service.tagLine || `Book ${service.name} with Midnight Magnolia.`}
    >
      <div className="container" style={{ paddingBottom: 'var(--space-2xl)' }}>
        <div className="page-hero">
          <p className="page-hero__eyebrow">
            <Link href="/services" style={{ color: 'inherit' }}>← All sessions</Link>
          </p>
          <h1>{service.name}</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            {service.tagLine ||
              'Pick a time that fits. Free and pay-in-person sessions confirm here; paid online sessions send a booking request email until Wix checkout redirects are restored.'}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'var(--space-md)' }}>
            {service.duration ? <span className="tag">{service.duration}</span> : null}
            {service.price ? <span className="tag">{service.price}</span> : null}
            {service.online ? <span className="tag">Virtual OK</span> : null}
          </div>
        </div>

        {service.description ? (
          <p className="muted" style={{ maxWidth: '70ch', marginBottom: 'var(--space-xl)', whiteSpace: 'pre-line' }}>
            {service.description.length > 500
              ? `${service.description.slice(0, 500).trimEnd()}…`
              : service.description}
          </p>
        ) : null}

        <section className="section">
          <h2>Available times (next 2 weeks)</h2>
          <div className="divider" />
          {!grouped.length ? (
            <p className="muted">No open slots in this window. Email Latisha and we&rsquo;ll find another time.</p>
          ) : (
            <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
              {grouped.map(([day, daySlots]) => (
                <div key={day}>
                  <p
                    className="muted"
                    style={{
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {new Date(`${day}T12:00:00`).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      timeZone: 'America/New_York',
                    })}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {daySlots.map((slot) => {
                      const active = selected?.localStartDate === slot.localStartDate;
                      return (
                        <button
                          key={slot.localStartDate}
                          type="button"
                          className={active ? 'btn btn--primary' : 'btn btn--outline'}
                          style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
                          onClick={() => setSelected(slot)}
                        >
                          {formatSlotLabel(slot.localStartDate)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="section">
          <h2>{needsCheckout ? 'Request this slot' : 'Confirm your booking'}</h2>
          <div className="divider" />
          <form className="card" style={{ maxWidth: 560 }} onSubmit={onSubmit}>
            <p className="muted" style={{ marginBottom: 'var(--space-md)', fontSize: '0.9rem' }}>
              {selected
                ? `Selected: ${formatSlotLabel(selected.localStartDate)} (ET)`
                : 'Select a time above, then add your details.'}
            </p>
            <label style={{ display: 'block', marginBottom: '0.75rem' }}>
              <span className="muted" style={{ fontSize: '0.8rem' }}>First name</span>
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ width: '100%', marginTop: 4 }}
              />
            </label>
            <label style={{ display: 'block', marginBottom: '0.75rem' }}>
              <span className="muted" style={{ fontSize: '0.8rem' }}>Last name</span>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{ width: '100%', marginTop: 4 }}
              />
            </label>
            <label style={{ display: 'block', marginBottom: '0.75rem' }}>
              <span className="muted" style={{ fontSize: '0.8rem' }}>Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', marginTop: 4 }}
              />
            </label>
            <label style={{ display: 'block', marginBottom: 'var(--space-md)' }}>
              <span className="muted" style={{ fontSize: '0.8rem' }}>Phone (optional)</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: '100%', marginTop: 4 }}
              />
            </label>
            <button type="submit" className="btn btn--primary" disabled={submitting || !selected}>
              {submitting
                ? 'Booking…'
                : needsCheckout
                  ? 'Email booking request'
                  : 'Book this session'}
            </button>
            {status.message ? (
              <p
                className={status.type === 'error' ? '' : 'muted'}
                style={{
                  marginTop: 'var(--space-md)',
                  color: status.type === 'error' ? 'var(--color-amber)' : undefined,
                }}
              >
                {status.message}
              </p>
            ) : null}
          </form>
        </section>
      </div>
    </Layout>
  );
}
