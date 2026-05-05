// Import the mysql module
const mysql = require('mysql2/promise');
// Define the connection parameters for the database 
const dbConfig = {
  connectionLimit: 10,
  socketPath: process.env.DB_SOCKET_PATH,
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
};
// Create the connection pool
const pool = mysql.createPool(dbConfig);
// Create an async function to execute sql queries 
async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}
// Export the query method for running sql queries in other files 
module.exports = {
  query
};