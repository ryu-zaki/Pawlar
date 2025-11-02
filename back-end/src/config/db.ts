import {Pool} from 'pg';
import dotenv from 'dotenv';

/* DATABASE CREDENTIALS */
dotenv.config();
const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = process.env; 


const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    port: Number(DB_PORT),
    password: DB_PASSWORD
});

(async () => {
    try {
       await pool.connect();
       console.log("Database Connected")
    }

    catch(err) { 
       console.log(err)
    }
  


})();

export default pool;