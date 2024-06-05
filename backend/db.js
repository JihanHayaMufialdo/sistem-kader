const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const fs = require("fs");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json()); // Middleware untuk mengurai JSON body dari request
app.use(cors());
// app.use(fileUpload());

// Konfigurasi koneksi MySQL
const connectionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "database_ils",
  port: 3308,
});

connectionPool.getConnection().then((connection) => {
  console.log("Connected to MySQL database");
});

connectionPool
  .getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database");

    

    

    

    

    // Start server with better error handling
    const port = 8000;
    app
      .listen(port, () => console.log(`Server running on port ${port}`))
      .on("error", (err) => {
        console.error("Server error:", err);
        process.exit(1); // Exit with error code on server error
      });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
    process.exit(1); // Exit with error code on connection error
  });
