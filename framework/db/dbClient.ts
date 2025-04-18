import knex from 'knex';

export const db = knex({
  client: 'pg',
  connection: 'postgresql://postgres:mypassword@localhost:5432/mydatabase'
});
