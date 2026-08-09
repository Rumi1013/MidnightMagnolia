// POST /api/wix/book
// Body: { slug, slot, contact: { firstName, lastName?, email, phone? } }
// Creates + confirms a Wix Bookings appointment (Headless / API key).

import {
  getBookingServiceBySlug,
  createConfirmedAppointmentBooking,
} from '../../../lib/wix';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { slug, slot, contact } = req.body || {};
    if (!slug || !slot || !contact?.email || !contact?.firstName) {
      return res.status(400).json({
        error: 'slug, slot, contact.firstName, and contact.email are required',
      });
    }

    const email = String(contact.email).trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'A valid email is required' });
    }

    const service = await getBookingServiceBySlug(slug);
    if (!service || service.hidden === true) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Paid online-only services need Wix-hosted checkout (OAuth redirect session).
    // Until Headless OAuth visitor tokens are healthy, keep those on email hold.
    const wantsOnlinePay =
      service?.payment?.options?.online === true &&
      service?.payment?.rateType !== 'NO_FEE';
    if (wantsOnlinePay) {
      return res.status(409).json({
        error:
          'This paid session needs Wix checkout. Email Latisha with your preferred slot, or use the free consultation first.',
        code: 'NEEDS_WIX_CHECKOUT',
      });
    }

    const result = await createConfirmedAppointmentBooking({
      service,
      slot,
      contact: {
        firstName: String(contact.firstName).trim(),
        lastName: contact.lastName ? String(contact.lastName).trim() : '',
        email,
        phone: contact.phone ? String(contact.phone).trim() : '',
      },
    });

    return res.status(200).json({ ok: true, ...result });
  } catch (err) {
    console.error('[api/wix/book]', err?.message || err);
    return res.status(500).json({
      error: err?.message || 'Could not complete booking',
    });
  }
}
