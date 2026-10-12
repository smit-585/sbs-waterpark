import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const isCloudDb = process.env.DATABASE_URL && (
    process.env.NODE_ENV === 'production' ||
    process.env.DATABASE_URL.includes('sslmode=require') ||
    process.env.DATABASE_URL.includes('neon.tech') ||
    process.env.DATABASE_URL.includes('supabase.co') ||
    process.env.DATABASE_URL.includes('render.com') ||
    process.env.DATABASE_URL.includes('railway.app')
);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    ssl: isCloudDb ? { rejectUnauthorized: false } : false
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export const closePool = async () => {
    await pool.end();
};

export default pool;
