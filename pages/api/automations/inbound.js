import { createContact, createSalesLogEntry } from '../../../lib/airtable';
import { requireAutomationSecret } from '../../../lib/server/automationAuth';

const EVENT_TYPES = new Set(['contact.subscribed', 'sale.recorded']);

function cleanString(value) {
  return String(value ?? '').trim();
}

function splitTags(value) {
  if (Array.isArray(value)) {
    return value.map(cleanString).filter(Boolean);
  }
  return cleanString(value)
    .split(',')
    .map(cleanString)
    .filter(Boolean);
}

function isoDate(value = new Date()) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
}

function monthKey(value = new Date()) {
  return isoDate(value).slice(0, 7);
}

function compactFields(fields) {
  return Object.fromEntries(
    Object.entries(fields).filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== null && value !== '';
    }),
  );
}

async function handleContactSubscribed(payload) {
  const email = cleanString(payload.email);
  if (!email) {
    const err = new Error('payload.email is required');
    err.statusCode = 400;
    throw err;
  }

  const record = await createContact(compactFields({
    Email: email,
    'First Name': cleanString(payload.firstName || payload.first_name),
    'Last Name': cleanString(payload.lastName || payload.last_name),
    'Subscribed Via': cleanString(payload.subscribedVia || payload.source || 'Zapier/Make'),
    'Subscribed Date': isoDate(payload.subscribedDate || payload.createdAt),
    Status: cleanString(payload.status || 'Active'),
    Tags: splitTags(payload.tags),
    Buyer: Boolean(payload.buyer || payload.isBuyer),
    'Magnolia Circle (Stan)': Boolean(payload.magnoliaCircle || payload.isMagnolia),
  }));

  return { id: record.id, table: 'Contacts' };
}

async function handleSaleRecorded(payload) {
  const amount = Number(payload.amount);
  if (!Number.isFinite(amount)) {
    const err = new Error('payload.amount must be a number');
    err.statusCode = 400;
    throw err;
  }

  const saleDate = isoDate(payload.saleDate || payload.createdAt);
  const record = await createSalesLogEntry(compactFields({
    'Sale Date': saleDate,
    Amount: amount,
    Platform: cleanString(payload.platform || 'Wix'),
    Source: cleanString(payload.source || 'Zapier/Make'),
    Month: cleanString(payload.month || monthKey(saleDate)),
    'Product Name (text)': cleanString(payload.productName || payload.product || payload.itemName),
    Notes: cleanString(payload.notes),
  }));

  return { id: record.id, table: 'Sales' };
}

const HANDLERS = {
  'contact.subscribed': handleContactSubscribed,
  'sale.recorded': handleSaleRecorded,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!requireAutomationSecret(req, res)) return;

  const event = cleanString(req.body?.event || req.body?.type);
  const payload = req.body?.payload || req.body?.data || {};

  if (!EVENT_TYPES.has(event)) {
    return res.status(400).json({
      error: 'Unsupported automation event',
      supportedEvents: Array.from(EVENT_TYPES),
    });
  }

  try {
    const result = await HANDLERS[event](payload);
    return res.status(200).json({ ok: true, event, result });
  } catch (err) {
    const status = err.statusCode || 500;
    console.error('[automations/inbound]', event, err.message);
    return res.status(status).json({
      error: status === 500 ? 'Automation handler failed' : err.message,
    });
  }
}
