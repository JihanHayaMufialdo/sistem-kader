const mysql = require("mysql2/promise");
// MySQL database connection
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "database_ils",
  port: "3308",
});

db.getConnection().then((connection) => {
  console.log("Connected to MySQL database");
});

module.exports = db
