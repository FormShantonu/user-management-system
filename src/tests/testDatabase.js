import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" }); // Load test environment variables

const waitForDB = async () => {
    let retries = 5;
    while (retries) {
        try {
            const connection = await mysql.createConnection({
                host: process.env.DB_HOST || 'mysql',
                user: process.env.DB_USER || 'root',
                password: process.env.DB_PASS || 'root',
                database: process.env.DB_NAME || 'user_management',
                port: process.env.DB_PORT || 3306,
            });
            console.log(' MySQL is ready');
            await connection.end();
            return;
        } catch (err) {
            console.log(` Waiting for MySQL... (${retries} retries left)`);
            retries -= 1;
            await new Promise(res => setTimeout(res, 5000));
        }
    }
    throw new Error(' MySQL did not start in time');
};

beforeAll(async () => {
    await waitForDB();
});
