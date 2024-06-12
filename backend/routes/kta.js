const express = require('express');
const db = require('../config/db'); // Pastikan db diatur untuk mendukung promises
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Mengatur penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

db.getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database");

    // Endpoint untuk mendapatkan data laporan
    router.get("/laporan", async (req, res) => {
      try {
        const [rows] = await db.query("SELECT * FROM akun_ssrils");
        res.json(rows);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error retrieving users");
      }
    });

    // Endpoint untuk menyimpan data KTA dan mengunggah foto
    router.post("/kta", upload.single('foto'), async (req, res) => {
      const { nama, nomorInduk, jenis_kader } = req.body;
      const fotoURL = req.file ? `/uploads/${req.file.filename}` : '';
      try {
          // Insert data into kta table
          const queryKta = "INSERT INTO kta (nama, nomorInduk, jenis_kader, fotoURL) VALUES (?, ?, ?, ?)";
          const valuesKta = [nama, nomorInduk, jenis_kader, fotoURL];
          const [result] = await db.query(queryKta, valuesKta);
  
          const ktaId = result.insertId;
  
          // Update data_kader table with the new kode_kta
          const queryDataKader = `
              UPDATE data_kader dk
              JOIN kta k ON dk.no_induk = k.nomorInduk
              SET dk.kode_kta = k.id
              WHERE k.id = ?
          `;
          const valuesDataKader = [ktaId];
          await db.query(queryDataKader, valuesDataKader);
  
          // Respond with the newly inserted data
          res.status(201).json({ id: ktaId, nama, nomorInduk, jenis_kader, fotoURL });
      } catch (error) {
          console.error("Error saving KTA data:", error);
          res.status(500).send("Error saving KTA data");
      }
  });
  
  

    router.get("/kta", async (req, res) => {
        try {
            const [rows] = await db.query("SELECT * FROM kta");
            res.json(rows);
        } catch (error) {
            console.error("Error fetching KTA data:", error);
            res.status(500).send("Error retrieving KTA data");
        }
    });

    // server.js or your backend controller
    router.get('/kta/:id', async (req, res) => {
      const { id } = req.params;
      try {
          const query = `
              SELECT k.*
              FROM data_kader dk
              JOIN kta k ON dk.kode_kta = k.id
              WHERE dk.id = ?
          `;
          const [kta] = await db.execute(query, [id]);
          if (kta.length > 0) {
              res.json(kta[0]);
          } else {
              res.status(404).json({ message: 'KTA not found' });
          }
      } catch (error) {
          res.status(500).json({ message: 'Error fetching KTA data', error });
      }
    });

    

  })
  .catch((error) => {
    console.error("Error connecting to MySQL database:", error);
  });

module.exports = router;
