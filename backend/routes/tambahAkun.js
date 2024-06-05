const express = require('express');
const db = require('../config/db'); // Pastikan db diatur untuk mendukung promises
const bcrypt = require('bcrypt');

const router = express.Router();

db.getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database");

    router.get("/laporan", async (req, res) => {
      try {
        const [rows] = await db.query("SELECT * FROM akun_ssrils");
        res.json(rows);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error retrieving users");
      }
    });

    router.get("/akun/:nama_pengguna", async (req, res) => {
        try {
          const { nama_pengguna } = req.params;
          const query = "SELECT * FROM akun_ssrils WHERE nama_pengguna = ?";
          const [rows] = await db.query(query, [nama_pengguna]);
  
          if (rows.length === 0) {
            res.status(404).send("User not found");
          } else {
            res.json(rows[0]);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          res.status(500).send("Error retrieving user");
        }
      });

    router.get('/nama-kota', async (req, res) => {
        try {
          const [rows, fields] = await db.query('SELECT nama_kota FROM kota');
          res.json(rows);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      });
  
    router.post("/akun", async (req, res) => {
      try {
        const { nama, kota_kabupaten, nama_pengguna, kata_sandi, role } = req.body;
        
        const hashedPassword = await bcrypt.hash(kata_sandi, 10);  
        const query = "INSERT INTO akun_ssrils (nama, kota_kabupaten, nama_pengguna, kata_sandi, role) VALUES (?, ?, ?, ?, ?)";
        await db.query(query, [
          nama,
          kota_kabupaten,
          nama_pengguna,
          hashedPassword,
          role,
        ]);
        res.status(201).send("Account created successfully");
      } catch (error) {
        console.error("Error creating account:", error);
        res.status(500).send("Error creating account");
      }
    });
  
    router.put("/akun/:username", async (req, res) => {
      try {
        const {nama, kota_kabupaten, nama_pengguna, kata_sandi, role } = req.body;
        const hashedPassword = await bcrypt.hash(kata_sandi, 10);
        const query = "UPDATE akun_ssrils SET nama = ?, kota_kabupaten = ?, kata_sandi = ?, role = ? WHERE nama_pengguna = ?";
        await db.query(query, [
          nama,
          kota_kabupaten,
          hashedPassword,
          role,
          nama_pengguna,
        ]);
        res.status(200).send("Account updated successfully");
      } catch (error) {
        console.error("Error updating account:", error);
        res.status(500).send("Error updating account");
      }
    });
  
    router.delete("/akun/:username", async (req, res) => {
      try {
        const { username } = req.params;
        const query = "DELETE FROM akun_ssrils WHERE Nama_Pengguna = ?";
        await db.query(query, [username]);
        res.status(200).send("Account deleted successfully");
      } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).send("Error deleting account");
      }
    });
  })
  .catch((error) => {
    console.error("Error connecting to MySQL database:", error);
  });

module.exports = router;
