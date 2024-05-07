import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

// Define a type for the response data structure if you know the schema.
// Example:
interface ProviderFilters {
  entity_name: string;              // Assuming 'payer' is a string
  code: string;               // Assuming 'code' is a string
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

const handler = async (req: NextApiRequest, res: NextApiResponse<ProviderFilters[] | { message: string }>): Promise<void> => {
    try {
      // This query fetches all entity_name and code combinations from provider_benchmark table
      const query = `SELECT entity_name, code FROM provider_benchmark`;
  
      // Execute the query without parameters as filtering is not applied
      const { rows } = await pool.query<ProviderFilters>(query);
  
      res.status(200).json(rows);
    } catch (err) {
      console.error('Database or Server error:', err);
      res.status(500).send({ message: 'Server error' });
    }
  };
  
  export default handler;
  

