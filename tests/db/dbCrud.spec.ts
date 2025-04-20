import { test, expect } from '@playwright/test';
import { Database } from '../../framework/utils/db'; // Assuming your db class is here
import { Member } from '../../framework/utils/interfaces'; // Assuming the Member interface is here

test.describe('PostgreSQL CRUD Operations', () => {
  const db = new Database();

  // Ensure the database table exists before running tests
  test.beforeAll(async () => {
    await db.connect();
    await db.query(`
      CREATE TABLE IF NOT EXISTS members (
        memid SERIAL PRIMARY KEY,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        email TEXT
      );
    `); // Create members table if it doesn't exist
  });

  test.afterAll(async () => {
    await db.disconnect();
  });

  test('Create a new member', async () => {
    const result = await db.query<Member>(
      'INSERT INTO members (firstname, lastname, email) VALUES ($1, $2, $3) RETURNING *',
      ['John', 'Doe', 'john@example.com']
    );

    // Ensure the member was created correctly
    expect(result.length).toBe(1); // Ensure only one row was returned
    expect(result[0].firstname).toBe('John');
    expect(result[0].lastname).toBe('Doe');
    expect(result[0].email).toBe('john@example.com');
  });

  test('Read members', async () => {
    const members = await db.query<Member>('SELECT * FROM members');
    
    // Ensure there is at least one member in the database
    expect(members.length).toBeGreaterThan(0);
    expect(members[0].firstname).toBeDefined();
  });

  test('Update a member', async () => {
    // Update the member's name
    await db.query('UPDATE members SET firstname = $1 WHERE firstname = $2', ['Jane', 'John']);

    // Check if the member was updated
    const updated = await db.query<Member>('SELECT * FROM members WHERE firstname = $1', ['Jane']);
    expect(updated.length).toBeGreaterThan(0); // Ensure we found the updated member
    expect(updated[0].firstname).toBe('Jane');
  });

  test('Delete a member', async () => {
    // Delete the member with firstname 'Jane'
    await db.query('DELETE FROM members WHERE firstname = $1', ['Jane']);

    // Verify the member was deleted
    const deleted = await db.query<Member>('SELECT * FROM members WHERE firstname = $1', ['Jane']);
    expect(deleted.length).toBe(0); // Ensure no member exists with the firstname 'Jane'
  });
});