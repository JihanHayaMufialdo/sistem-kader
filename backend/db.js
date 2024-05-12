const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(express.json()); // Middleware untuk mengurai JSON body dari request


app.use(cors());
// Konfigurasi koneksi MySQL
const connectionPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'database_ils',
  port: 3308
});

connectionPool.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database');

    // Route to fetch users with prepared statements
    app.get('/laporan', async (req, res) => {
      try {
        const [rows] = await connection.query('SELECT * FROM akun_ssrils');
        res.json(rows);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error retrieving users');
      }
    });

    app.get('/akun/:nama_pengguna', async (req, res) => {
      try {
        const { nama_pengguna } = req.params;
        const query = 'SELECT * FROM akun_ssrils WHERE nama_pengguna = ?';
        const [rows] = await connection.query(query, [nama_pengguna]);
        
        if (rows.length === 0) {
          res.status(404).send('User not found');
        } else {
          res.json(rows[0]);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Error retrieving user');
      }
    });
    
    

    app.post('/akun', async (req, res) => {
      try {
        const { no_kta, nama, kota_kabupaten, nama_pengguna, kata_sandi } = req.body;
        const query = 'INSERT INTO akun_ssrils (no_kta, nama, kota_kabupaten, nama_pengguna, kata_sandi) VALUES (?, ?, ?, ?, ?)';
        await connection.query(query, [no_kta, nama, kota_kabupaten, nama_pengguna, kata_sandi]);
        res.status(201).send('Account created successfully');
      } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).send('Error creating account');
      }
    });

    // Route to update user data with prepared statements
    
    app.put('/akun/:username', async (req, res) => {
      try {
        const { no_kta, nama, kota_kabupaten, nama_pengguna, kata_sandi } = req.body;
        const query = 'UPDATE akun_ssrils SET no_kta = ?, nama = ?, kota_kabupaten = ?, kata_sandi = ? WHERE nama_pengguna = ?';
    
        // Melakukan eksekusi query dengan parameter yang diberikan
        await connection.query(query, [no_kta, nama, kota_kabupaten, kata_sandi, nama_pengguna]);
    
        res.status(200).send('Account updated successfully');
      } catch (error) {
        console.error('Error updating account:', error);
        res.status(500).send('Error updating account');
      }
    });
    
    
    app.delete('/akun/:username', async (req, res) => {
      try {
        const { username } = req.params;
        const query = 'DELETE FROM akun_ssrils WHERE Nama_Pengguna = ?';
        await connection.query(query, [username]);
        res.status(200).send('Account deleted successfully');
      } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).send('Error deleting account');
      }
    });
    

    // Start server with better error handling
    const port = 8000;
    app.listen(port, () =>
      console.log(`Server running on port ${port}`)
    ).on('error', (err) => {
      console.error('Server error:', err);
      process.exit(1); // Exit with error code on server error
    });
  })
  .catch(error => {
    console.error('Error connecting to database:', error);
    process.exit(1); // Exit with error code on connection error
  });
