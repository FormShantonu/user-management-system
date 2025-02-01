import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
/**
 * - MYSQL_HOST=mysql
      - MYSQL_USER=root
      - MYSQL_PORT= 3306
      - MYSQL_PASSWORD=root
      - MYSQL_DATABASE=user_management
 */
let DBInfo = {
  host: process.env.MYSQL_HOST || "mysql",
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.MYSQL_DATABASE || "user_management",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};
console.log(DBInfo);
const pool = mysql.createPool(DBInfo);

export default pool;
