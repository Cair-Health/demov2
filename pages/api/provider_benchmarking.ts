import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

// Define a type for the response data structure if you know the schema.
// Example:
interface PayerStat {
  entity_name: string;              // Assuming 'payer' is a string
  code: string;               // Assuming 'code' is a string
  avg_rate: number;           // Assuming 'average rate' is a number
  min_rate: number;           // Assuming 'minimum rate' is a number
  max_rate: number;           // Assuming 'maximum rate' is a number
  median_rate: number;        // Assuming 'median rate' is a number
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
  // Extract query parameters
  const { entity_name, code } = req.query;

  // Split the comma-separated strings into arrays
  const entityNames = typeof entity_name === 'string' ? entity_name.split('|') : [];
  const codes = typeof code === 'string' ? code.split('|') : [];


  try {
    let query = '';
    let params = [];

    // Adjust the condition to ensure arrays are not empty
    if (entityNames.length > 0 && codes.length > 0) {
      query = `SELECT entity_name, code, avg_rate, max_rate, min_rate FROM provider_benchmark WHERE entity_name = ANY($1) AND code = ANY($2)`;
      params = [entityNames, codes];
    } else {
      query = 'SELECT entity_name, code, avg_rate, max_rate, min_rate FROM provider_benchmark';
    }

    // Execute the query with parameters
    const { rows } = await pool.query<PayerStat>(query, params);

    res.status(200).json(rows);
  } catch (err) {
    console.error('Database or Server error:', err);
    res.status(500).send({ message: 'Server error' });
  }
};

export default handler;

