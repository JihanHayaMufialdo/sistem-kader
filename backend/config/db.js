const mysql = require("mysql2/promise");
// MySQL database connection
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
<<<<<<< HEAD
  database: "database_ils",
=======
  database: "database_ils"
>>>>>>> dev
});

db.getConnection().then((connection) => {
  console.log("Connected to MySQL database");
});

module.exports = db
