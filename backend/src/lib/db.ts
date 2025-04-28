import { config } from "dotenv";
import { Pool } from "pg";
config();

// create and export a single pool instance
export const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "your_db_user",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "fresh_turf_assignment",
});
