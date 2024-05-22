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
// Menu Data Kader
    // GET: Mengambil semua data kader
    app.get('/kader', async (req, res) => {
      try {
        const [rows] = await connection.query('SELECT * FROM data_kader');
        res.json(rows);
      } catch (error) {
        console.error('Error fetching kader data:', error);
        res.status(500).send('Error retrieving kader data');
      }
    });

    // GET: Mengambil data kader berdasarkan ID
    app.get('/kader/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const query = 'SELECT * FROM data_kader WHERE id = ?';
        const [rows] = await connection.query(query, [id]);

        if (rows.length === 0) {
          res.status(404).send('Kader not found');
        } else {
          res.json(rows[0]);
        }
      } catch (error) {
        console.error('Error fetching kader data:', error);
        res.status(500).send('Error retrieving kader data');
      }
    });

    // POST: Menambahkan data kader baru
    app.post('/kader', async (req, res) => {
      try {
        const { no_urut, nama, no_induk, jenis_kelamin, no_telp, alamat, id_kecamatan } = req.body;
        const query = 'INSERT INTO data_kader (no_urut, nama, no_induk, jenis_kelamin, no_telp, alamat, id_kecamatan) VALUES (?, ?, ?, ?, ?, ?, ?)';
        await connection.query(query, [no_urut, nama, no_induk, jenis_kelamin, no_telp, alamat, id_kecamatan]);
        res.status(201).send('Kader data created successfully');
      } catch (error) {
        console.error('Error creating kader data:', error);
        res.status(500).send('Error creating kader data');
      }
    });

    // PUT: Memperbarui data kader
    app.put('/kader/:id', async (req, res) => {
      try {
        const { no_urut, nama, no_induk, jenis_kelamin, no_telp, alamat, id_kecamatan } = req.body;
        const { id } = req.params;
        console.log('Received data:', { no_urut, nama, no_induk, jenis_kelamin, no_telp, alamat, id_kecamatan });
        const query = 'UPDATE data_kader SET no_urut = ?, nama = ?, no_induk = ?, jenis_kelamin = ?, no_telp = ?, alamat = ?, id_kecamatan = ? WHERE id = ?';
        await connection.query(query, [no_urut, nama, no_induk, jenis_kelamin, no_telp, alamat, id_kecamatan, id]);
        res.status(200).send('Kader data updated successfully');
      } catch (error) {
        console.error('Error updating kader data:', error);
        res.status(500).send('Error updating kader data');
      }
    });




// Start the server
const port = 8000;
app.listen(port, () => console.log(`Server running on port ${port}`)).on("error", (err) => {
  console.error("Server error:", err);
  process.exit(1);
});