import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

const SCORES_PATH = path.resolve(process.cwd(), 'pendu_scores.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await fs.readFile(SCORES_PATH, 'utf-8');
      res.status(200).json(JSON.parse(data));
    } catch (e) {
      res.status(200).json([]); // Fichier non trouvé = pas de scores
    }
  } else if (req.method === 'POST') {
    try {
      const scores = req.body;
      await fs.writeFile(SCORES_PATH, JSON.stringify(scores, null, 2), 'utf-8');
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Erreur lors de la sauvegarde.' });
    }
  } else {
    res.status(405).end();
  }
}
