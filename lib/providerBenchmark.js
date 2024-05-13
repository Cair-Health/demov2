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
const codeResponse = await pool.query(`SELECT distinct code FROM provider_benchmark`);
const entityResponse = await pool.query(`SELECT distinct entity_name FROM provider_benchmark`);


export const codes = codeResponse.rows.map(r => r.code)
export const entities = entityResponse.rows.flatMap(r => r.entity_name == null ? [] : r.entity_name )