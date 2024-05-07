import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'chat',
  host: 'localhost',
  database: 'chat',
  password: 'R2d0qeualiydWPYdo4pzkrqrqvoH5CZA1ZaAZC',
  port: 5454,
  ssl: {
    rejectUnauthorized: false 
  }
});

const handler = async (req: NextApiRequest, res: NextApiResponse<string[] | { message: string }>): Promise<void> => {
  try {
    const { rows } = await pool.query<{entity_name: string}>(`SELECT distinct entity_name FROM provider_benchmark`);

    res.status(200).json(rows.flatMap(r => r.entity_name == null ? [] : r.entity_name ));
  } catch (err) {
    console.error('Database or Server error:', err);
    res.status(500).send({ message: 'Server error' });
  }
};

export default handler;

