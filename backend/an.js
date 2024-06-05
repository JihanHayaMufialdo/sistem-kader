 // Menu Akun SSR
 const db = require ('./db.js')
 const express = require('express');
 
 
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

  app.put('/akun/:username', async (req, res) => {
    try {
      const { no_kta, nama, kota_kabupaten, nama_pengguna, kata_sandi } = req.body;
      const query = 'UPDATE akun_ssrils SET no_kta = ?, nama = ?, kota_kabupaten = ?, kata_sandi = ? WHERE nama_pengguna = ?';
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
          k.id AS id_kota,
          k.kode_kota,
          k.nama_kota AS kota,
          p.nama_provinsi AS provinsi
        FROM 
          kota k
        JOIN 
          provinsi p ON k.id_provinsi = p.id
      `);
  
      const uniqueKota = [];
      const kotaMap = new Map();
  
      rows.forEach((row) => {
        if (!kotaMap.has(row.id_kota)) {
          kotaMap.set(row.id_kota, true); // Set any value to map
          uniqueKota.push(row);
        }
      });
  
      res.json(uniqueKota);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error retrieving data');
    }
  });

  app.get('/kota/:id_kota', async (req, res) => {
    const { id_kota } = req.params;
  
    try {
      const [rows] = await connection.query(`
        SELECT 
          kc.id AS id_kecamatan,
          kc.kode_kecamatan,
          kc.nama_kecamatan,
          k.nama_kota AS kota
        FROM 
          kecamatan kc
        JOIN 
          kota k ON kc.id_kota = k.id
        WHERE 
          kc.id_kota = ?
      `, [id_kota]);
  
      res.json(rows);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error retrieving data');
    }
  });

  app.get('/kecamatan/:id_kecamatan', async (req, res) => {
    const { id_kecamatan } = req.params;
    try {
      const query = `
        SELECT 
          kc.id AS id_kecamatan,
          kc.kode_kecamatan,
          kc.nama_kecamatan,
          k.id AS id_kota,
          k.nama_kota AS kota,
          p.id AS id_provinsi,
          p.nama_provinsi AS provinsi
        FROM 
          kecamatan kc
        JOIN 
          kota k ON kc.id_kota = k.id
        JOIN 
          provinsi p ON k.id_provinsi = p.id
        WHERE 
          kc.id = ?
      `;
      const [rows] = await connection.query(query, [id_kecamatan]);
      
      if (rows.length === 0) {
        res.status(404).send('Kecamatan not found');
      } else {
        res.json(rows[0]);
      }
    } catch (error) {
      console.error('Error fetching kecamatan data:', error);
      res.status(500).send('Error retrieving kecamatan data');
    }
  });
  

  // Route untuk menambahkan data kecamatan baru
  app.post('/kecamatan', async (req, res) => {
    try {
      const { id_kota, kode_kecamatan, nama_kecamatan } = req.body;
      const query = 'INSERT INTO kecamatan (id_kota, kode_kecamatan, nama_kecamatan) VALUES (?, ?, ?)';
      await connection.query(query, [id_kota, kode_kecamatan, nama_kecamatan]);
      res.status(201).send('Kecamatan added successfully');
    } catch (error) {
      console.error('Error adding kecamatan:', error);
      res.status(500).send('Error adding kecamatan');
    }
  });

  // Route untuk mengubah data kecamatan
  app.put('/kecamatan/:id_kecamatan', async (req, res) => {
    try {
      const { id_kecamatan } = req.params;
      const { kode_kecamatan, nama_kecamatan } = req.body;
      const query = 'UPDATE kecamatan SET kode_kecamatan = ?, nama_kecamatan = ? WHERE id = ?';
      await connection.query(query, [kode_kecamatan, nama_kecamatan, id_kecamatan]);
      res.status(200).send('Kecamatan updated successfully');
    } catch (error) {
      console.error('Error updating kecamatan:', error);
      res.status(500).send('Error updating kecamatan');
    }
  });


  // Route untuk menghapus data kecamatan
  app.delete('/kecamatan/:id_kecamatan', async (req, res) => {
    try {
      const { id_kecamatan } = req.params;
      const query = 'DELETE FROM kecamatan WHERE id = ?';
      await connection.query(query, [id_kecamatan]);
      res.status(200).send('Kecamatan deleted successfully');
    } catch (error) {
      console.error('Error deleting kecamatan:', error);
      res.status(500).send('Error deleting kecamatan');
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