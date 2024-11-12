import { Pool } from "pg";

export default class DatabaseService {

    public setup() {
        const conn = new Pool({
            ssl: false,
            user: 'postgres',
            password: 'postgres',
            database: 'postgres',
            host: process.env.DB_HOST,
            port: 5432
        });
        return conn;
    }

}