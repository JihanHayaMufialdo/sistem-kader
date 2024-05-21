const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

const connectionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "database_ils",
  port: 3308,
});

// Endpoint untuk mengambil data user
app.get('/users', async (req, res) => {
  try {
    const connection = await connectionPool.getConnection();
    const [rows] = await connection.execute('SELECT id, username, role, created_at FROM users');
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Error fetching users' });
  }
});


// Start the server
const port = 8000;
app.listen(port, () => console.log(`Server running on port ${port}`)).on("error", (err) => {
  console.error("Server error:", err);
  process.exit(1);
});