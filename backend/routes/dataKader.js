const express = require('express');
const db = require('../config/db'); // Pastikan db diatur untuk mendukung promises

const router = express.Router();

db.getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database");


    // Menu Data Kader
    // GET: Mengambil semua data kader
    router.get('/kader', async (req, res) => {
      try {
        const [rows] = await db.query(`
          SELECT dk.*, p.nama_provinsi, k.nama_kota, kec.nama_kecamatan
          FROM data_kader dk
          JOIN kecamatan kec ON dk.id_kecamatan = kec.id
          JOIN kota k ON kec.id_kota = k.id
          JOIN provinsi p ON k.id_provinsi = p.id
        `);
        res.json(rows);
      } catch (error) {
        console.error('Error fetching kader data:', error);
        res.status(500).send('Error retrieving kader data');
      }
    });


    // GET: Mengambil data kader berdasarkan ID
    router.get('/kader/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const [rows] = await db.query(`
          SELECT dk.*, p.nama_provinsi, k.nama_kota, kec.nama_kecamatan
          FROM data_kader dk
          JOIN kecamatan kec ON dk.id_kecamatan = kec.id
          JOIN kota k ON kec.id_kota = k.id
          JOIN provinsi p ON k.id_provinsi = p.id
          WHERE dk.id = ?
        `, [id]);
    
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

    router.get('/data', async (req, res) => {
      try {
        const [kecamatanRows] = await db.query(`
          SELECT 
            kecamatan.id, 
            kecamatan.nama_kecamatan, 
            kota.nama_kota AS nama_kota, 
            provinsi.nama_provinsi AS nama_provinsi 
          FROM kecamatan
          JOIN kota ON kecamatan.id_kota = kota.id
          JOIN provinsi ON kota.id_provinsi = provinsi.id
        `);
    
        const [jenisKaderRows] = await db.query(`
          SELECT 
            id, 
            jenis_kader
          FROM data_kader
        `);
    
        res.json({
          kecamatan: kecamatanRows,
          jenisKader: jenisKaderRows
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error retrieving data');
      }
    });

    // Endpoint untuk mengambil pilihan nama provinsi, kabupaten/kota, dan kecamatan
      router.get("/filter-options", async (req, res) => {
        try {
          const [provinsiRows] = await db.query(
            "SELECT DISTINCT nama_provinsi FROM provinsi"
          );
          const [kotaRows] = await db.query(
            "SELECT DISTINCT nama_kota FROM kota"
          );
          const [kecamatanRows] = await db.query(
            "SELECT DISTINCT nama_kecamatan FROM kecamatan"
          );
  
          const provinsiOptions = provinsiRows.map((row) => ({
            id: row.id,
            nama: row.nama_provinsi,
          }));
          const kotaOptions = kotaRows.map((row) => ({
            id: row.id,
            nama: row.nama_kota,
          }));
          const kecamatanOptions = kecamatanRows.map((row) => ({
            id: row.id,
            nama: row.nama_kecamatan,
          }));
  
          res.json({
            provinsi: provinsiOptions,
            kota: kotaOptions,
            kecamatan: kecamatanOptions,
          });
        } catch (error) {
          console.error("Error fetching filter options:", error);
          res.status(500).send("Error retrieving filter options");
        }
      });

    // POST: Menambahkan data kader baru
    router.post('/kader', async (req, res) => {
      const {
        no_induk,
        nama,
        jenis_kelamin,
        no_telp,
        jenis_kader,
        id_kecamatan,
        nama_provinsi,
        nama_kota,
        nama_kecamatan
      } = req.body;
    
      const connection = await db.getConnection();
    
      try {
        await connection.beginTransaction();
    
        // Insert data kecamatan if not exist
        const [kecamatanRows] = await connection.query(`
          SELECT id FROM kecamatan WHERE nama_kecamatan = ?
        `, [nama_kecamatan]);
    
        let kecamatanId;
        if (kecamatanRows.length === 0) {
          const [result] = await connection.query(`
            INSERT INTO kecamatan (nama_kecamatan, id_kota)
            VALUES (?, (SELECT id FROM kota WHERE nama_kota = ?))
          `, [nama_kecamatan, nama_kota]);
          kecamatanId = result.insertId;
        } else {
          kecamatanId = kecamatanRows[0].id;
        }
    
        // Insert data kota if not exist
        const [kotaRows] = await connection.query(`
          SELECT id FROM kota WHERE nama_kota = ?
        `, [nama_kota]);
    
        let kotaId;
        if (kotaRows.length === 0) {
          const [result] = await connection.query(`
            INSERT INTO kota (nama_kota, id_provinsi)
            VALUES (?, (SELECT id FROM provinsi WHERE nama_provinsi = ?))
          `, [nama_kota, nama_provinsi]);
          kotaId = result.insertId;
        } else {
          kotaId = kotaRows[0].id;
        }
    
        // Insert data provinsi if not exist
        const [provinsiRows] = await connection.query(`
          SELECT id FROM provinsi WHERE nama_provinsi = ?
        `, [nama_provinsi]);
    
        let provinsiId;
        if (provinsiRows.length === 0) {
          const [result] = await connection.query(`
            INSERT INTO provinsi (nama_provinsi)
            VALUES (?)
          `, [nama_provinsi]);
          provinsiId = result.insertId;
        } else {
          provinsiId = provinsiRows[0].id;
        }
    
        // Insert data kader
        await connection.query(`
          INSERT INTO data_kader (no_induk, nama, jenis_kelamin, no_telp, jenis_kader, id_kecamatan)
          VALUES (?, ?, ?, ?, ?, ?)
        `, [no_induk, nama, jenis_kelamin, no_telp, jenis_kader, kecamatanId]);
    
        await connection.commit();
        res.send('Kader data inserted successfully');
      } catch (error) {
        await connection.rollback();
        console.error('Error inserting kader data:', error);
        res.status(500).send('Error inserting kader data');
      } finally {
        connection.release();
      }
    });
    

    // PUT: Memperbarui data kader
    router.put('/kader/:id', async (req, res) => {
      const { id } = req.params;
      const {
        no_induk,
        nama,
        jenis_kelamin,
        no_telp,
        jenis_kader,
        id_kecamatan,
        nama_provinsi,
        nama_kota,
        nama_kecamatan
      } = req.body;
    
      const connection = await db.getConnection();
    
      try {
        await connection.beginTransaction();
    
        // Update data kader
        await connection.query(`
          UPDATE data_kader
          SET no_induk = ?, nama = ?, jenis_kelamin = ?, no_telp = ?, jenis_kader = ?, id_kecamatan = ?
          WHERE id = ?
        `, [no_induk, nama, jenis_kelamin, no_telp, jenis_kader, id_kecamatan, id]);
    
        // Update data kecamatan
        await connection.query(`
          UPDATE kecamatan
          SET nama_kecamatan = ?
          WHERE id = ?
        `, [nama_kecamatan, id_kecamatan]);
    
        // Get id_kota from kecamatan
        const [kecamatanRows] = await connection.query(`
          SELECT id_kota FROM kecamatan WHERE id = ?
        `, [id_kecamatan]);
        const id_kota = kecamatanRows[0].id_kota;
    
        // Update data kota
        await connection.query(`
          UPDATE kota
          SET nama_kota = ?
          WHERE id = ?
        `, [nama_kota, id_kota]);
    
        // Get id_provinsi from kota
        const [kotaRows] = await connection.query(`
          SELECT id_provinsi FROM kota WHERE id = ?
        `, [id_kota]);
        const id_provinsi = kotaRows[0].id_provinsi;
    
        // Update data provinsi
        await connection.query(`
          UPDATE provinsi
          SET nama_provinsi = ?
          WHERE id = ?
        `, [nama_provinsi, id_provinsi]);
    
        await connection.commit();
        res.send('Kader data updated successfully');
      } catch (error) {
        await connection.rollback();
        console.error('Error updating kader data:', error);
        res.status(500).send('Error updating kader data');
      } finally {
        connection.release();
      }
    });
    
    

    // DELETE: Menghapus data kader
    router.delete('/kader/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const query = 'DELETE FROM data_kader WHERE id = ?';
        await connection.query(query, [id]);
        res.status(200).send('Kader data deleted successfully');
      } catch (error) {
        console.error('Error deleting kader data:', error);
        res.status(500).send('Error deleting kader data');
      }
    });


  })
  .catch((error) => {
    console.error("Error connecting to MySQL database:", error);
  });

module.exports = router;