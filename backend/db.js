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
    // Menu Akun SSR
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



    // Menu Sebaran Wilayah
    app.get('/wilayah', async (req, res) => {
      try {
        const [rows] = await connection.query(`
          SELECT 
            p.id AS id_provinsi,
            p.nama_provinsi AS provinsi,
            k.kode_kota,
            k.nama_kota AS kota,
            kc.nama_kecamatan AS kecamatan,
            kc.kode_kecamatan
          FROM 
            provinsi p
          LEFT JOIN 
            kota k ON p.id = k.id_provinsi
          LEFT JOIN 
            kecamatan kc ON k.id = kc.id_kota
        `);
        res.json(rows);
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error retrieving data');
      }
    });
    
    
    
    // POST: Menambahkan data baru ke tabel provinsi
    app.post('/tambah-data', async (req, res) => {
      try {
        const { nama_provinsi, kode_provinsi, nama_kota, kode_kota, nama_kecamatan, kode_kecamatan } = req.body;
    
        // Insert data ke tabel 'provinsi'
        const provinsiQuery = 'INSERT INTO provinsi (nama_provinsi, kode_provinsi) VALUES (?, ?)';
        const [provinsiResult] = await connection.query(provinsiQuery, [nama_provinsi, kode_provinsi]);
        const id_provinsi = provinsiResult.insertId;
    
        // Insert data ke tabel 'kota'
        const kotaQuery = 'INSERT INTO kota (nama_kota, kode_kota, id_provinsi) VALUES (?, ?, ?)';
        const [kotaResult] = await connection.query(kotaQuery, [nama_kota, kode_kota, id_provinsi]);
        const id_kota = kotaResult.insertId;
    
        // Insert data ke tabel 'kecamatan'
        const kecamatanQuery = 'INSERT INTO kecamatan (nama_kecamatan, kode_kecamatan, id_kota) VALUES (?, ?, ?)';
        await connection.query(kecamatanQuery, [nama_kecamatan, kode_kecamatan, id_kota]);
    
        res.status(201).send('Data added successfully');
      } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Error adding data');
      }
    }); 
    
    
    // PUT: Memperbarui data di tabel provinsi
    app.put('/provinsi/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const { nama_provinsi, kode_provinsi } = req.body;
        const query = 'UPDATE provinsi SET nama_provinsi = ?, kode_provinsi = ? WHERE id = ?';
        await connection.query(query, [nama_provinsi, kode_provinsi, id]);
        res.status(200).send('Provinsi updated successfully');
      } catch (error) {
        console.error('Error updating provinsi:', error);
        res.status(500).send('Error updating provinsi');
      }
    });
    
    // DELETE: Menghapus data di tabel provinsi
    app.delete('/provinsi/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const query = 'DELETE FROM provinsi WHERE id = ?';
        await connection.query(query, [id]);
        res.status(200).send('Provinsi deleted successfully');
      } catch (error) {
        console.error('Error deleting provinsi:', error);
        res.status(500).send('Error deleting provinsi');
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