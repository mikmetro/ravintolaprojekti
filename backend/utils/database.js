import mysql from "mysql2";
import "dotenv/config";
import fs from "fs";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: process.env.DB_CONN_LIMIT || 10,
  queueLimit: 0,
  multipleStatements: true,
});

const promisePool = pool.promise();

if (process.env.DB_INIT === "true") {
  promisePool
    .query(fs.readFileSync("./utils/init_db.sql", "utf8"))
    .then(() => console.info("Database connected & initialized successfully."))
    .catch((err) => {
      if (err.code === "ER_TABLE_EXISTS_ERROR") {
        // shit ass design, it shouldn't be an error really.
        console.info("Database connected. (Tables already exist)");
      } else {
        console.error("error while creating the db:", err.message);
      }
    });
  console.info("Database connected & initialized.");
}

export default promisePool;
