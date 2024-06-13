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

  router.post('/upload', upload.single('image'), (req, res) => {
    const { id } = req.body; // Dapatkan ID kader dari form
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    const fileBuffer = req.file.buffer; // Mendapatkan buffer file
    const fileName = req.file.originalname;
    const uploadedAt = new Date();
  
    // Hapus foto lama dari penyimpanan (misalnya sistem file lokal) jika ada
    
    // Hapus entri foto lama dari database
    const deleteSql = 'DELETE FROM photos WHERE kader_id = ?';
    req.db.query(deleteSql, [id], (deleteError, deleteResults) => {
        if (deleteError) {
            console.error("Error deleting old photo from MySQL database:", deleteError);
            return res.status(500).send('Error deleting old photo.');
        }
        
        // Simpan foto baru
        const insertSql = 'INSERT INTO photos (file_blob, file_name, uploaded_at, kader_id) VALUES (?, ?, ?, ?)';
        req.db.query(insertSql, [fileBuffer, fileName, uploadedAt, id], (insertError, insertResults) => {
            if (insertError) {
                console.error("Error inserting data into MySQL database:", insertError);
                return res.status(500).send('Error saving data.');
            }
            res.status(200).send({ message: 'File uploaded and data saved successfully.', filePath: `/image/${insertResults.insertId}` });
        });
    });
});

module.exports = router;
