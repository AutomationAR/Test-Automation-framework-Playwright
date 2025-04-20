// utils/db.ts
import { Client } from 'pg';
import dotenv from 'dotenv';
 
dotenv.config();
 
const connectionString = process.env.DB_URL;
 
export class Database {
  client: Client;
 
  constructor() {
    this.client = new Client({ connectionString });
  }
 
  async connect() {
    await this.client.connect();
  }
 
  async disconnect() {
    await this.client.end();
  }
 
  async query<T = any>(text: string, params?: any[]): Promise<T[]> {
    const res = await this.client.query(text, params);
    return res.rows;
  }
 
  async beginTransaction() {
    await this.client.query('BEGIN');
  }
 
  async rollback() {
    await this.client.query('ROLLBACK');
  }
}