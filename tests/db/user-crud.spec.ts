import { test, expect } from '@playwright/test';
import { db } from '../../framework/db/dbClient';

test('CREATE user', async () => {
  try {
    const [user] = await db('users').insert({ name: 'Test User' }).returning('*');
    console.log('Created user:', user);
    expect(user.name).toBe('Test User');
  } catch (err) {
    console.error('❌ CREATE user failed:', err);
    throw err;
  }
});

test('READ user', async () => {
  try {
    const users = await db('users').where({ name: 'Test User' });
    console.log('Read users:', users);
    expect(users.length).toBeGreaterThan(0);
  } catch (err) {
    console.error('❌ READ user failed:', err);
    throw err;
  }
});

test('UPDATE user', async () => {
  try {
    await db('users').update({ name: 'Updated User' }).where({ name: 'Test User' });
    const updated = await db('users').where({ name: 'Updated User' });
    console.log('Updated user:', updated);
    expect(updated.length).toBeGreaterThan(0);
  } catch (err) {
    console.error('❌ UPDATE user failed:', err);
    throw err;
  }
});

test('DELETE user', async () => {
  try {
    await db('users').del().where({ name: 'Updated User' });
    const deleted = await db('users').where({ name: 'Updated User' });
    console.log('Deleted user count:', deleted.length);
    expect(deleted.length).toBe(0);
  } catch (err) {
    console.error('❌ DELETE user failed:', err);
    throw err;
  }
});