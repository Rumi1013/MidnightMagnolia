import { getNotionConfig, fetchDashboardNotion } from '../../../lib/notion';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const cfg = getNotionConfig();
  if (!cfg.ok) {
    return res.status(200).json({
      connected: false,
      calendar: null,
      duskLetters: null,
      products: null,
    });
  }

  try {
    const data = await fetchDashboardNotion(cfg);
    return res.status(200).json({
      connected: true,
      calendar: data.calendar,
      duskLetters: data.duskLetters,
      products: data.products,
    });
  } catch (e) {
    return res.status(200).json({
      connected: false,
      calendar: null,
      duskLetters: null,
      products: null,
      error: e?.message ?? 'Notion request failed',
    });
  }
}
