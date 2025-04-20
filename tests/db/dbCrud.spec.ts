// tests/dbCrud.spec.ts
import { test, expect } from '@playwright/test';
import { Database } from '../../framework/utils/db';
import { generateUser } from '../../framework/utils/userFactory';
 
let db: Database;
const table = 'playwright_users';
 
test.describe('Advanced PostgreSQL CRUD Test', () => {
  test.beforeAll(async () => {
    db = new Database();
    await db.connect();
    await db.query(`CREATE TABLE IF NOT EXISTS ${table} (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    )`);
  });
 
  test.beforeEach(async () => {
    await db.beginTransaction();
  });
 
  test.afterEach(async () => {
    await db.rollback();
  });
 
  test.afterAll(async () => {
    await db.query(`DROP TABLE IF EXISTS ${table}`);
    await db.disconnect();
  });
 
  test('Create and Read user', async () => {
    const user = generateUser();
    const inserted = await db.query(`INSERT INTO ${table} (name, email) VALUES ($1, $2) RETURNING *`, [user.name, user.email]);
    expect(inserted[0].email).toBe(user.email);
 
    const found = await db.query(`SELECT * FROM ${table} WHERE email = $1`, [user.email]);
    expect(found.length).toBe(1);
    expect(found[0].name).toBe(user.name);
  });
 
  test('Update user name', async () => {
    const user = generateUser();
    await db.query(`INSERT INTO ${table} (name, email) VALUES ($1, $2)`, [user.name, user.email]);
 
    const updatedName = 'UpdatedName';
    const updated = await db.query(`UPDATE ${table} SET name = $1 WHERE email = $2 RETURNING *`, [updatedName, user.email]);
    expect(updated[0].name).toBe(updatedName);
  });
 
  test('Delete user', async () => {
    const user = generateUser();
    await db.query(`INSERT INTO ${table} (name, email) VALUES ($1, $2)`, [user.name, user.email]);
 
    const deleted = await db.query(`DELETE FROM ${table} WHERE email = $1 RETURNING *`, [user.email]);
    expect(deleted[0].email).toBe(user.email);
  });
});