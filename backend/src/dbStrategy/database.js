import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

const URL = process.env.DATABASE_URL;

const connection = new Pool({ connectionString: URL });

export default connection;
