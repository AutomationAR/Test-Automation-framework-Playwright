import { Client } from 'pg';

export class Database {
  private client!: Client;

  async connect() {
    this.client = new Client({
      connectionString: 'postgresql://postgres:password1234@localhost:5432/mydatabase',
    });
    await this.client.connect();
  }

  async disconnect() {
    await this.client.end();
  }

  async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    const res = await this.client.query(sql, params);
    return res.rows;
  }
}