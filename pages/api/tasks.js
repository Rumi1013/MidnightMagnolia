// pages/api/tasks.js
// GET  /api/tasks?category=product   → fetch tasks by category (or all)
// PATCH /api/tasks                   → toggle a task's done status
//   body: { id: 'p1', done: true }

import { createRouteHandlerClient } from '../../lib/supabaseServer';
import { requireAdmin } from '../../lib/server/adminAuth';

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  const supabase = createRouteHandlerClient();
  if (req.method === 'GET') {
    const { category } = req.query;
    let query = supabase
      .from('dashboard_tasks')
      .select('*')
      .order('sort_order', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'PATCH') {
    const { id, done } = req.body;
    if (!id || done === undefined) {
      return res.status(400).json({ error: 'id and done are required' });
    }

    const { data, error } = await supabase
      .from('dashboard_tasks')
      .update({ done })
      .eq('id', id)
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  res.setHeader('Allow', ['GET', 'PATCH']);
  res.status(405).json({ error: `Method ${req.method} not allowed` });
}
