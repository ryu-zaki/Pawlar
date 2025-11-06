import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

/* DATABASE CONNECTION */
const connectionConfig =
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false, // required for Railway
        },
      }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT) || 5432,
      };

const pool = new Pool(connectionConfig);

(async () => {
  try {
    await pool.connect();
    console.log("Database Connected");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
})();

export default pool;
