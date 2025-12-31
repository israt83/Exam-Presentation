import { Pool } from "pg";

export const pool = new Pool({
  connectionString: `postgresql://neondb_owner:npg_fA5oyTqGZYR6@ep-fancy-cake-a8sbhn3q-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require`,
});

export const connectDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    roll VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) UNIQUE CHECK (email = lower(email)) NOT NULL,
    password TEXT NOT NULL,

    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female')),

    department TEXT, 
    course VARCHAR(100) NOT NULL,
    passing_year INT CHECK (passing_year BETWEEN 1971 AND 2025),

    image TEXT, 
    address TEXT

);

        `);

  console.log("connected to database");
};
