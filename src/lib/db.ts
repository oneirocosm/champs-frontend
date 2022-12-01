import { Client, Pool } from 'pg';
import { env } from '$env/dynamic/private';

const pool = new Pool({
    user: env.PG_USER,
    host: env.PG_HOST,
    database: env.PG_DB,
    password: env.PG_PASSWORD,
    port: Number(env.PG_PORT),
})

export const connectToDb = async () => await pool.connect();