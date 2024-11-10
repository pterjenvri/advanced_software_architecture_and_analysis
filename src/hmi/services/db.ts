import * as pg from "pg";

let conn: any;

if (!conn) {
    console.log('pg connection');
    conn = new pg.Pool({
        ssl: false,
        user: 'postgres',
        password: 'postgres',
        database: 'postgres',
        host: 'localhost',
        port: 5432
    });
}

export {conn};