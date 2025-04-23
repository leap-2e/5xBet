import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to Neon Postgres!');
  } catch (error) {
    console.error('Error connecting to Neon Postgres:', error);
  }
}

export { client, connectDB };