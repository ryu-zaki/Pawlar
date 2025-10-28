import {Pool} from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: "pawlar_db",
    port: 5432,
    password: "0330@Kenzo"
});

pool.connect()
.then(() => console.log("Database Connected"))
.catch(err => console.log(err));

export default pool;