// Import required modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Middleware untuk mengurai JSON body dari request
app.use(cors());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'database_ils',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to database');
});


app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM data_akun WHERE username = ?',
    [username],
    (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const user = results[0];
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Kirim respon dengan data pengguna
      return res.status(200).json({ user });
    }
  );
});




// Start the server
const port = 8000;
app.listen(port, () => console.log(`Server running on port ${port}`)).on("error", (err) => {
  console.error("Server error:", err);
  process.exit(1);
});