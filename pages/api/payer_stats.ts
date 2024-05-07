import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

// Define a type for the response data structure if you know the schema.
// Example:
interface PayerStat {
  payer: string;              // Assuming 'payer' is a string
  code: string;               // Assuming 'code' is a string
  avg_rate: number;           // Assuming 'average rate' is a number
  min_rate: number;           // Assuming 'minimum rate' is a number
  max_rate: number;           // Assuming 'maximum rate' is a number
  median_rate: number;        // Assuming 'median rate' is a number
  percentile_25: number;      // Assuming '25th percentile rate' is a number
  percentile_75: number;      // Assuming '75th percentile rate' is a number
}

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

const handler = async (req: NextApiRequest, res: NextApiResponse<PayerStat[] | { message: string }>): Promise<void> => {
  const { payer, code } = req.query;

  try {
    // Ensure the query parameters are strings; this may require additional validation or casting
    const query = payer && code ? 
      'SELECT * FROM payer_code_stats WHERE payer = $1 AND code = $2' : 
      'SELECT * FROM payer_code_stats';

    const params = payer && code ? [payer as string, code as string] : [];
    const { rows } = await pool.query<PayerStat>(query, params);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
}

export default handler;
