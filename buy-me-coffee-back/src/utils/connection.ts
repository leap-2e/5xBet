// import { Client } from 'pg';

//Өгөгдлийн бааз руу хандалт хийх тохиргооны хэсэг
import { neon } from '@neondatabase/serverless'
import * as dotenv from 'dotenv';

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
export const client = neon(`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`);
