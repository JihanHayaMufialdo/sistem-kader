const express = require('express');
const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)){
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

db.getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database");

    // Endpoint untuk mendapatkan data profil dan akun
    router.get('/profiles', async (req, res) => {
      try {
        const query = `
          SELECT 
            p.id, 
            p.foto_profil, 
            p.id_akun, 
            a.no_kta, 
            a.nama, 
            a.kota_kabupaten, 
            a.nama_pengguna, 
            a.kata_sandi, 
            a.role
          FROM 
            profiles p
          JOIN 
            akun_ssrils a ON p.id_akun = a.no_kta
        `;
        const [rows] = await db.query(query);
        res.json(rows);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        res.status(500).send("Error retrieving profiles");
      }
    });

    // Endpoint untuk mendapatkan data profil dan akun berdasarkan nama_pengguna
    router.get('/profiles/:nama_pengguna', async (req, res) => {
      const { nama_pengguna } = req.params;
      try {
        const query = `
          SELECT 
            p.id, 
            p.foto_profil, 
            p.id_akun, 
            a.no_kta, 
            a.nama, 
            a.kota_kabupaten, 
            a.nama_pengguna, 
            a.kata_sandi, 
            a.role
          FROM 
            profiles p
          JOIN 
            akun_ssrils a ON p.id_akun = a.no_kta
          WHERE 
            a.nama_pengguna = ?
        `;
        const [rows] = await db.query(query, [nama_pengguna]);
        if (rows.length > 0) {
          res.json(rows);
        } else {
          res.status(404).send("No profiles found for the specified username");
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
        res.status(500).send("Error retrieving profiles");
      }
    });
    
    router.put('/profiles/:nama_pengguna', (req, res) => {
      const { nama_pengguna } = req.params;
      const { password_lama, password_baru } = req.body;
   
      // Query untuk memeriksa apakah pengguna dengan nama_pengguna dan kata sandi lama yang sesuai ada di database
      const checkUserQuery = 'SELECT * FROM akun_ssrils WHERE nama_pengguna = ? AND kata_sandi = ?';
      db.query(checkUserQuery, [nama_pengguna, password_lama], (err, result) => {
          if (err) {
              console.error('Error checking user:', err);
              res.status(500).send('Error checking user');
          } else if (result.length === 0) {
              res.status(400).send('Incorrect old password or user not found');
          } else {
              // Kata sandi lama dan pengguna ditemukan, lakukan pembaruan kata sandi
              const updatePasswordQuery = 'UPDATE akun_ssrils SET kata_sandi = ? WHERE nama_pengguna = ?';
              db.query(updatePasswordQuery, [password_baru, nama_pengguna], (err, updateResult) => {
                  if (err) {
                      console.error('Error updating password:', err);
                      res.status(500).send('Error updating password');
                  } else {
                      res.status(200).send('Password updated successfully');
                  }
              });
          }
      });
   });

   router.put("/editprofil/:username", async (req, res) => {
    try {
      const { nama, kota_kabupaten, kata_sandi } = req.body;
      const hashedPassword = await bcrypt.hash(kata_sandi, 10);
      const query = "UPDATE akun_ssrils SET nama = ?, kota_kabupaten = ?, kata_sandi = ? WHERE nama_pengguna = ?";
      await db.query(query, [nama, kota_kabupaten, hashedPassword, req.params.username]);
      res.status(200).send("Account updated successfully");
    } catch (error) {
      console.error("Error updating account:", error);
      res.status(500).send("Error updating account");
    }
  });

  router.post('/upload_foto_profil/:nama_pengguna', upload.single('foto'), async (req, res) => {
    try {
      const { nama_pengguna } = req.params;
      const newFotoURL = req.file ? `/uploads/${req.file.filename}` : '';
  
      // Ambil URL foto lama dari database
      const [rows] = await db.query('SELECT foto_url FROM akun_ssrils WHERE nama_pengguna = ?', [nama_pengguna]);
      const oldFotoURL = rows.length > 0 ? rows[0].foto_url : null;
  
      // Update URL foto di database
      const updateQuery = 'UPDATE akun_ssrils SET foto_url = ? WHERE nama_pengguna = ?';
      await db.query(updateQuery, [newFotoURL, nama_pengguna]);
  
      // Hapus file lama dari sistem file
      if (oldFotoURL) {
        const oldFilePath = path.resolve(__dirname, '../uploads', path.basename(oldFotoURL)); // Perbaiki path di sini
        fs.access(oldFilePath, fs.constants.F_OK, (err) => {
          if (!err) {
            fs.unlink(oldFilePath, (err) => {
              if (err) {
                console.error("Error deleting old photo:", err);
              } else {
                console.log("Old photo deleted successfully");
              }
            });
          } else {
            console.error("Old photo not found:", oldFilePath);
          }
        });
      }
  
      // Kirim URL foto sebagai response
      res.json({ fotoURL: newFotoURL });
    } catch (error) {
      console.error("Error uploading photo:", error);
      res.status(500).send("Error uploading photo");
    }
  });


  
  

  
  

    

  })
  .catch((error) => {
    console.error("Error connecting to MySQL database:", error);
  });

module.exports = router;
