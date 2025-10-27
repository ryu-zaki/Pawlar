import {Pool} from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: "pawlar",
    port: 5432,
    password: "123"
});

pool.connect()
.then(() => console.log("Database Connected"))
.catch(err => console.log(err));

export default pool;