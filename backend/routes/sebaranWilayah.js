const express = require('express');
const db = require('../config/db'); // Pastikan db diatur untuk mendukung promises

const router = express.Router();

db.getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database");

    // Menu Sebaran Wilayah
    router.get("/wilayah", async (req, res) => {
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
          console.error("Error fetching data:", error);
          res.status(500).send("Error retrieving data");
        }
      });
  
      router.get("/kota/:id_kota", async (req, res) => {
        const { id_kota } = req.params;
  
        try {
          const [rows] = await connection.query(
            `
            SELECT 
              k.id AS id_kota,
              k.kode_kota,
              k.nama_kota,
              k.id_provinsi,
              p.kode_provinsi
            FROM 
              kota k
            INNER JOIN provinsi p ON k.id_provinsi = p.id
            WHERE 
              k.id = ?
            `,
            [id_kota]
          );
  
          if (rows.length > 0) {
            res.json(rows[0]);
          } else {
            res.status(404).send("Data not found");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          res.status(500).send("Error retrieving data");
        }
      });
  
      router.get("/kecamatan-by-kota/:id_kota", async (req, res) => {
        const { id_kota } = req.params;
  
        try {
          const [rows] = await connection.query(
            `
                SELECT 
                    kc.kode_kecamatan,
                    kc.nama_kecamatan,
                    k.nama_kota
                FROM 
                    kecamatan kc
                JOIN 
                    kota k ON kc.id_kota = k.id
                WHERE 
                    kc.id_kota = ?
                `,
            [id_kota]
          );
  
          res.json(rows);
        } catch (error) {
          console.error("Error fetching kecamatan data by kota:", error);
          res.status(500).send("Error retrieving kecamatan data by kota");
        }
      });
  
      router.get("/kecamatan/:id_kecamatan", async (req, res) => {
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
          const [rows] = await db.query(query, [id_kecamatan]);
  
          if (rows.length === 0) {
            res.status(404).send("Kecamatan not found");
          } else {
            res.json(rows[0]);
          }
        } catch (error) {
          console.error("Error fetching kecamatan data:", error);
          res.status(500).send("Error retrieving kecamatan data");
        }
      });
  
      // Endpoint untuk mengambil data provinsi beserta jumlah kota/kabupaten dan kecamatan
      router.get("/provinsi", async (req, res) => {
        try {
          const query = `
        SELECT 
          provinsi.id, 
          provinsi.nama_provinsi,
          provinsi.kode_provinsi, 
          COUNT(DISTINCT kota.id) AS jumlah_kota, 
          COUNT(DISTINCT kecamatan.id) AS jumlah_kecamatan
        FROM 
          provinsi
        LEFT JOIN 
          kota ON kota.id_provinsi = provinsi.id
        LEFT JOIN 
          kecamatan ON kecamatan.id_kota = kota.id
        GROUP BY 
          provinsi.id
      `;
          const [results] = await db.query(query);
          res.status(200).json(results);
        } catch (error) {
          console.error("Error fetching data:", error);
          res.status(500).json({ error: "Error fetching data" });
        }
      });
  
      // Route untuk menambahkan data kecamatan baru
      router.post("/kota/kecamatan", async (req, res) => {
        try {
          const { kode_kecamatan, nama_kecamatan, id_kota } = req.body;
          if (!kode_kecamatan || !nama_kecamatan || !id_kota) {
            return res.status(400).json({ error: "All fields are required" });
          }
          const query =
            "INSERT INTO kecamatan (kode_kecamatan, nama_kecamatan, id_kota) VALUES (?, ?, ?)";
          const [result] = await db.query(query, [
            kode_kecamatan,
            nama_kecamatan,
            id_kota,
          ]);
          res
            .status(201)
            .json({ message: "Kecamatan added successfully", result });
        } catch (error) {
          console.error("Error adding kecamatan:", error);
          res.status(500).json({ error: "Error adding kecamatan" });
        }
      });
  
      // Route untuk mengubah data kecamatan
      router.put("/kecamatan/:id", async (req, res) => {
        try {
          const { id } = req.params;
          const { kode_kecamatan, nama_kecamatan } = req.body;
          const query =
            "UPDATE kecamatan SET kode_kecamatan = ?, nama_kecamatan = ? WHERE id = ?";
          await connection.query(query, [kode_kecamatan, nama_kecamatan, id]);
          res.status(200).send("Kecamatan updated successfully");
        } catch (error) {
          console.error("Error updating kecamatan:", error);
          res.status(500).send("Error updating kecamatan");
        }
      });
  
      router.get("/kota", async (req, res) => {
        try {
          const { id_kota } = req.params;
          const query = "SELECT * FROM kota WHERE id_kota = ?";
          const [rows] = await connection.query(query, [id_kota]);
  
          if (rows.length === 0) {
            res.status(404).send("kota not found");
          } else {
            res.json(rows[0]);
          }
        } catch (error) {
          console.error("Error fetching kota:", error);
          res.status(500).send("Error retrieving kota");
        }
      });
  
      router.put("/kota/:id_kota", async (req, res) => {
        try {
          const { id_kota } = req.params;
          const { kode_kota, nama_kota, kode_provinsi } = req.body;
  
          // Perbarui kode kota di tabel kota
          const queryKota =
            "UPDATE kota SET kode_kota = ?, nama_kota = ? WHERE id = ?";
          await connection.query(queryKota, [kode_kota, nama_kota, id_kota]);
  
          // Perbarui kode_provinsi di tabel provinsi berdasarkan relasi dengan kota
          const queryUpdateProvinsi = `
            UPDATE provinsi p
            JOIN kota k ON p.id = k.id_provinsi
            SET p.kode_provinsi = ?
            WHERE k.id = ?
          `;
          await connection.query(queryUpdateProvinsi, [kode_provinsi, id_kota]);
  
          res.status(200).send("Kota and Provinsi updated successfully");
        } catch (error) {
          console.error("Error updating kota and provinsi:", error);
          res.status(500).send("Error updating kota and provinsi");
        }
      });
  
      // Route untuk menghapus data kecamatan
      router.delete("/kecamatan/:id_kecamatan", async (req, res) => {
        try {
          const { id_kecamatan } = req.params;
          const query = "DELETE FROM kecamatan WHERE id = ?";
          await connection.query(query, [id_kecamatan]);
          res.status(200).send("Kecamatan deleted successfully");
        } catch (error) {
          console.error("Error deleting kecamatan:", error);
          res.status(500).send("Error deleting kecamatan");
        }
      });
  
      router.delete("/kota/:id_kota", async (req, res) => {
        try {
          const { id_kota } = req.params;
          const query = "DELETE FROM kota WHERE id = ?";
          const [result] = await db.query(query, [id_kota]);
  
          if (result.affectedRows > 0) {
            res.status(200).send("Kota deleted successfully");
          } else {
            res.status(404).send("Kota not found");
          }
        } catch (error) {
          console.error("Error deleting kota:", error);
          res.status(500).send("Error deleting kota. Please try again later."); // Pesan kesalahan yang lebih informatif
        }
      });
  
      // POST: Menambahkan data baru ke tabel provinsi
      router.post("/tambah-data", async (req, res) => {
        try {
          const {
            nama_provinsi,
            kode_provinsi,
            nama_kota,
            kode_kota,
            nama_kecamatan,
            kode_kecamatan,
            id, // Tambahkan field id_provinsi dari frontend
          } = req.body;
  
          // Cek apakah nama provinsi sudah ada di database
          const existingProvinsiQuery =
            "SELECT id FROM provinsi WHERE nama_provinsi = ?";
          const [existingProvinsiRows] = await connection.query(
            existingProvinsiQuery,
            [nama_provinsi]
          );
  
          let id_toInsert = id; // Gunakan ID provinsi dari frontend
          if (existingProvinsiRows.length > 0) {
            // Jika nama provinsi sudah ada, gunakan ID provinsi yang sudah ada
            id_toInsert = existingProvinsiRows[0].id;
          } else {
            // Jika nama provinsi belum ada, tambahkan data provinsi baru
            const newProvinsiQuery =
              "INSERT INTO provinsi (nama_provinsi, kode_provinsi) VALUES (?, ?)";
            const [newProvinsiResult] = await connection.query(newProvinsiQuery, [
              nama_provinsi,
              kode_provinsi,
            ]);
            id_toInsert = newProvinsiResult.insertId;
          }
  
          // Insert data ke tabel 'kota'
          const kotaQuery =
            "INSERT INTO kota (nama_kota, kode_kota, id_provinsi) VALUES (?, ?, ?)";
          const [kotaResult] = await connection.query(kotaQuery, [
            nama_kota,
            kode_kota,
            id_toInsert, // Gunakan ID provinsi yang sudah ditentukan
          ]);
          const id_kota = kotaResult.insertId;
  
          // Insert data ke tabel 'kecamatan'
          const kecamatanQuery =
            "INSERT INTO kecamatan (nama_kecamatan, kode_kecamatan, id_kota) VALUES (?, ?, ?)";
          await connection.query(kecamatanQuery, [
            nama_kecamatan,
            kode_kecamatan,
            id_kota,
          ]);
  
          res.status(201).send("Data added successfully");
        } catch (error) {
          console.error("Error adding data:", error);
          res.status(500).send("Error adding data");
        }
      });
  
      // PUT: Memperbarui data di tabel provinsi
      router.put("/provinsi/:id", async (req, res) => {
        try {
          const { id } = req.params;
          const { nama_provinsi, kode_provinsi } = req.body;
          const query =
            "UPDATE provinsi SET nama_provinsi = ?, kode_provinsi = ? WHERE id = ?";
          await connection.query(query, [nama_provinsi, kode_provinsi, id]);
          res.status(200).send("Provinsi updated successfully");
        } catch (error) {
          console.error("Error updating provinsi:", error);
          res.status(500).send("Error updating provinsi");
        }
      });
  
      // DELETE: Menghapus data di tabel provinsi
      router.delete("/provinsi/:id", async (req, res) => {
        try {
          const { id } = req.params;
          const query = "DELETE FROM provinsi WHERE id = ?";
          await connection.query(query, [id]);
          res.status(200).send("Provinsi deleted successfully");
        } catch (error) {
          console.error("Error deleting provinsi:", error);
          res.status(500).send("Error deleting provinsi");
        }
      });
  
      // Filter
      // Endpoint untuk menyaring data kader berdasarkan filter
      router.get("/filter-kader", async (req, res) => {
        try {
          const {
            jenis_kader,
            jenis_kelamin,
            provinsi,
            kota_kabupaten,
            kecamatan,
          } = req.query;
          let conditions = [];
  
          if (jenis_kader) {
            conditions.push(`jenis_kader = '${jenis_kader}'`);
          }
          if (jenis_kelamin) {
            conditions.push(`jenis_kelamin = '${jenis_kelamin}'`);
          }
          if (provinsi) {
            conditions.push(`nama_provinsi = '${provinsi}'`);
          }
          if (kota_kabupaten) {
            conditions.push(`nama_kota = '${kota_kabupaten}'`);
          }
          if (kecamatan) {
            conditions.push(`nama_kecamatan = '${kecamatan}'`);
          }
  
          let whereClause = "";
          if (conditions.length > 0) {
            whereClause = "WHERE " + conditions.join(" AND ");
          }
  
          const query = `
        SELECT 
          dk.*, p.nama_provinsi, k.nama_kota, kec.nama_kecamatan
        FROM 
          data_kader dk
        JOIN 
          kecamatan kec ON dk.id_kecamatan = kec.id
        JOIN 
          kota k ON kec.id_kota = k.id
        JOIN 
          provinsi p ON k.id_provinsi = p.id
        ${whereClause}
      `;
          const [rows] = await db.query(query);
          res.json(rows);
        } catch (error) {
          console.error("Error fetching filtered kader data:", error);
          res.status(500).send("Error retrieving filtered kader data");
        }
      });
  
      
  
      router.delete("/kota/:nama_kota", async (req, res) => {
        try {
          const { nama_kota } = req.params;
          const query = "DELETE FROM kota WHERE nama_kota = ?";
          await db.execute(query, [nama_kota]);
          res.status(200).send("Kota deleted successfully");
        } catch (error) {
          console.error("Error deleting kota:", error);
          res.status(500).send("Error deleting kota");
        }
      });
  
      router.delete("/kota/:id_kota", async (req, res) => {
        try {
          const { id_kota } = req.params;
          const query = "DELETE FROM kota WHERE id = ?";
          const [result] = await db.query(query, [id_kota]);
  
          if (result.affectedRows > 0) {
            res.status(200).send("Kota deleted successfully");
          } else {
            res.status(404).send("Kota not found");
          }
        } catch (error) {
          console.error("Error deleting kota:", error);
          res.status(500).send("Error deleting kota. Please try again later."); // Pesan kesalahan yang lebih informatif
        }
      });
  
      // Sebaran Wilayah 2
      // Menghapus Nama Kecamatan
      router.delete("/kecamatan/nama/:nama_kecamatan", async (req, res) => {
        try {
          const { nama_kecamatan } = req.params;
          const query = "DELETE FROM kecamatan WHERE nama_kecamatan = ?";
          const [result] = await db.query(query, [nama_kecamatan]);
  
          if (result.affectedRows > 0) {
            res.status(200).send("Kecamatan deleted successfully");
          } else {
            res.status(404).send("Kecamatan not found");
          }
        } catch (error) {
          console.error("Error deleting kecamatan:", error);
          res.status(500).send("Error deleting kecamatan");
        }
      });
  
      router.get("/kecamatan-by-nama/:nama_kecamatan/:id_kota", async (req, res) => {
        try {
          const { nama_kecamatan, id_kota } = req.params;
          const query =
            "SELECT * FROM kecamatan WHERE nama_kecamatan = ? AND id_kota = ?";
          const [rows] = await db.query(query, [
            nama_kecamatan,
            id_kota,
          ]);
  
          if (rows.length > 0) {
            res.status(200).json(rows[0]);
          } else {
            res.status(404).send("Kecamatan not found");
          }
        } catch (error) {
          console.error("Error fetching kecamatan data:", error);
          res.status(500).send("Error fetching kecamatan data");
        }
      });
  
      // DELETE: Menghapus data provinsi dan data terkait (kota dan kecamatan)
      router.delete("/provinsi/:id_provinsi", async (req, res) => {
        try {
          const { id_provinsi } = req.params;
  
          // Delete kecamatan data related to the province
          const deleteKecamatanQuery =
            "DELETE FROM kecamatan WHERE id_kota IN (SELECT id FROM kota WHERE id_provinsi = ?)";
          await db.query(deleteKecamatanQuery, [id_provinsi]);
  
          // Delete kota data related to the province
          const deleteKotaQuery = "DELETE FROM kota WHERE id_provinsi = ?";
          await db.query(deleteKotaQuery, [id_provinsi]);
  
          // Delete the province itself
          const deleteProvinsiQuery = "DELETE FROM provinsi WHERE id = ?";
          await db.query(deleteProvinsiQuery, [id_provinsi]);
  
          res.status(200).send("Province and related data deleted successfully");
        } catch (error) {
          console.error("Error deleting province and related data:", error);
          res.status(500).send("Error deleting province and related data");
        }
      });


  })
  .catch((error) => {
    console.error("Error connecting to MySQL database:", error);
  });

module.exports = router;