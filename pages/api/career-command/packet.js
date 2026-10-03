// GET /api/career-command/packet
// Reads gitignored local packet. Missing file is a valid empty state — never throw.

import fs from 'fs';
import path from 'path';
import { requireAdmin } from '../../../lib/server/adminAuth';

const PACKET_PATH = path.join(
  process.cwd(),
  'CareerSystem/Career-command/private/command-hub.packet.json',
);

export default function handler(req, res) {
  try {
    if (!requireAdmin(req, res)) return;

    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ error: 'Method not allowed' });
    }

    res.setHeader('Cache-Control', 'private, no-store');

    if (!fs.existsSync(PACKET_PATH)) {
      return res.status(200).json({ available: false, packet: null });
    }

    const raw = fs.readFileSync(PACKET_PATH, 'utf8');
    const packet = JSON.parse(raw);
    return res.status(200).json({ available: true, packet });
  } catch (err) {
    console.error('[api/career-command/packet]', err.message);
    return res.status(200).json({ available: false, packet: null });
  }
}
