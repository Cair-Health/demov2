import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import { codes } from '../../../lib/providerBenchmark.js'

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

    res.status(200).json(codes);
  } catch (err) {
    console.error('Database or Server error:', err);
    res.status(500).send({ message: 'Server error' });
  }
};

export default handler;

