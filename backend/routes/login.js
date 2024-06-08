const express = require('express');
const db = require('../config/db'); // Pastikan db diatur untuk mendukung promises
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

db.getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database");

    router.post('/login', async (req, res) => {
      const { nama_pengguna, kata_sandi } = req.body;
      console.log('Received login request:', nama_pengguna);

      try {
        const [results] = await db.query(
          'SELECT * FROM akun_ssrils WHERE nama_pengguna = ?',
          [nama_pengguna]
        );

        if (results.length === 0) {
          console.log('Username not found');
          return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(kata_sandi, user.kata_sandi);

        if (!isPasswordValid) {
          console.log('Invalid password');
          return res.status(401).json({ message: 'Invalid username or password' });
        }

        console.log('Login successful:', user);

        // Generate JWT token
        const secretKey = 'yourSecretKey'; // Ganti dengan kunci rahasia yang aman
        const token = jwt.sign({ id: user.id, username: user.nama_pengguna, role: user.role }, secretKey, { expiresIn: '1h' });

        // Kirim respon dengan data pengguna dan token
        return res.status(200).json({ user, token, role: user.role });
      } catch (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
    });

  })
  .catch((error) => {
    console.error("Error connecting to MySQL database:", error);
  });

module.exports = router;