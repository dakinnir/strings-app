import { Client } from 'pg';
import { loadEnvConfig } from '@next/env';
import { faker } from '@faker-js/faker';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

async function loadFakeData(numUsers: number = 5) {
  console.log(`executing load fake data, generating ${numUsers} new users`);

  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_NAME,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT!),
  });

  await client.connect();
  try {
    client.query('begin');
    for (let i = 0; i < numUsers; i++) {
      await client.query(
        'insert into public.users (username, password, avatar) values ($1, $2, $3);',
        [faker.internet.userName(), 'password', faker.internet.avatar()]
      );
    }

    const res = await client.query(
      'select id, username from public.users order by created_at desc limit $1',
      [numUsers]
    );
    console.log(res.rows);
    for (const row of res.rows) {
      for (let i = 0; i < Math.ceil(Math.random() * 10); i++) {
        await client.query(
          'insert into public.posts (user_id, content) values ($1, $2);',
          [row.id, faker.lorem.sentence()]
        );
      }
    }

    for (const row1 of res.rows) {
      for (const row2 of res.rows) {
        if (row1.id != row2.id) {
          if (Math.random() > 0.5) {
            await client.query(
              'insert into public.follows (user_id, follower_id) values ($1, $2);',
              [row1.id, row2.id]
            );
          }
        }
      }
    }

    client.query('commit');
  } catch (error) {
    client.query('rollback');
    throw error;
  } finally {
    await client.end();
  }
}

const number = parseInt(process.argv[2]) || 5;
console.log('loading');
loadFakeData(number);
