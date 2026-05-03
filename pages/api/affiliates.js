// pages/api/affiliates.js
// GET   /api/affiliates              → fetch all affiliate partners
// PATCH /api/affiliates              → mark a partner as contacted
//   body: { id: 3, contacted: true, notes: '...' }

import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('affiliate_partners')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'PATCH') {
    const { id, contacted, notes } = req.body;
    if (!id) return res.status(400).json({ error: 'id is required' });

    const updates = {};
    if (contacted !== undefined) updates.contacted = contacted;
    if (notes !== undefined) updates.notes = notes;

    const { data, error } = await supabase
      .from('affiliate_partners')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  res.setHeader('Allow', ['GET', 'PATCH']);
  res.status(405).json({ error: `Method ${req.method} not allowed` });
}
