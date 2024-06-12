const express = require('express');
const db = require('../config/db');
const multer = require('multer');

const router = express.Router();

// Konfigurasi multer untuk menyimpan file dalam buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

db.getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database");
    // Simpan connection ke req untuk digunakan di handler berikutnya
    router.use((req, res, next) => {
      req.db = connection;
      next();
    });
  })
  .catch((error) => {
    console.error("Error connecting to MySQL database:", error);
  });

// Endpoint untuk upload gambar
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    const fileBuffer = req.file.buffer; // Mendapatkan buffer file
    const fileName = req.file.originalname;
    const uploadedAt = new Date();
  
    const sql = 'INSERT INTO photos (file_blob, file_name, uploaded_at) VALUES (?, ?, ?)';
    req.db.query(sql, [fileBuffer, fileName, uploadedAt], (error, results) => {
      if (error) {
        console.error("Error inserting data into MySQL database:", error);
        return res.status(500).send('Error saving data.');
      }
  
      res.status(200).send({ message: 'File uploaded and data saved successfully.', filePath: `/image/${results.insertId}` });
    });
  });

// Endpoint untuk mengambil gambar
router.get('/image/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT file_blob, file_name FROM photos WHERE id = ?';
  req.db.query(sql, [id], (error, results) => {
    if (error) {
      console.error("Error fetching data from MySQL database:", error);
      return res.status(500).send('Error fetching data.');
    }

    if (results.length > 0) {
      const fileBlob = results[0].file_blob;
      const fileName = results[0].file_name;
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
      res.setHeader('Content-Type', 'image/jpg'); // Sesuaikan dengan tipe file yang diunggah
      res.send(fileBlob);
    } else {
      res.status(404).send('Image not found.');
    }
  });
});

module.exports = router;
