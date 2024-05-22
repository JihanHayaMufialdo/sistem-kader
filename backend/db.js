const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const multer = require('multer');
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json()); // Middleware untuk mengurai JSON body dari request
app.use(cors());
// app.use(fileUpload());

// Konfigurasi koneksi MySQL
const connectionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "database_ils"
});


connectionPool
  .getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database");

      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
          cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
        }
      });
      
      // Initialize Multer with the storage configuration
      const upload = multer({ storage });
      
      // Serve static files from the "uploads" directory
      app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
      
      // Handle file upload
      app.post('/upload/kader', upload.single('file'), (req, res) => {
        if (!req.file) {
          return res.status(400).send('No file uploaded.');
        }
        const allowedExtensions = ['.xls', '.xlsx'];
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
          return res.status(400).send('Hanya file XLS yang diizinkan.');
        }

        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      
        // Kirim data JSON ke klien
       console.log(sheetData)
          // Sisipkan data ke dalam tabel MySQL
//       const sql = 'INSERT INTO kader (Nama, Jenis_kader, Jenis_Kelamin, Usia, No_HP, Status_Aktif, SR, Provinsi, Kota_Kabupaten, Kecamatan, Last_Login) VALUES ?';
// connectionPool.query(sql, [sheetData.map(Object.values)], (err, result) => {
//   if (err) {
//     return res.status(500).send('Gagal menyimpan data ke database.');
//   }
//   res.send('Data berhasil disimpan ke database.');
// });


const sql = "INSERT INTO kader (NO, Nama, Jenis_kader, Jenis_Kelamin, Usia, Status_Aktif, SR, Provinsi, Kota_Kabupaten, Kecamatan, Last_Login) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

// Loop melalui data dan masukkan satu per satu
sheetData.forEach(row => {
  connectionPool.query(sql, [
    row.NO,
    row.Nama,
    row['Jenis kader'],
    row['jenis kelamin'],
    row.Usia,
    row['Status Aktif'],
    row.SR,
    row.Provinsi,
    row['Kota / Kabupaten'],
    row.Kecamatan,
    row['Last Login'] === '0000-00-00 00:00:00' ? null : row['Last Login']
  ], (err, result) => {
    if (err) {
      return res.status(500).send('Gagal menyimpan data ke database.');
    }
  });
});

  // Hapus file yang diunggah setelah berhasil disimpan ke database
fs.unlinkSync(req.file.path);
res.send('Data berhasil disimpan ke database.');
      
        console.log('Uploaded file:', req.file);
        res.send(`File uploaded: ${req.file.filename}`);
      });

   // Login
  

    // Menu Akun SSR
    app.get("/laporan", async (req, res) => {
      try {
        const [rows] = await connection.query("SELECT * FROM akun_ssrils");
        res.json(rows);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error retrieving users");
      }
    });

    app.get("/akun/:nama_pengguna", async (req, res) => {
      try {
        const { nama_pengguna } = req.params;
        const query = "SELECT * FROM akun_ssrils WHERE nama_pengguna = ?";
        const [rows] = await connection.query(query, [nama_pengguna]);

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

    app.post("/akun", async (req, res) => {
      try {
        const { no_kta, nama, kota_kabupaten, nama_pengguna, kata_sandi } =
          req.body;
        const query =
          "INSERT INTO akun_ssrils (no_kta, nama, kota_kabupaten, nama_pengguna, kata_sandi) VALUES (?, ?, ?, ?, ?)";
        await connection.query(query, [
          no_kta,
          nama,
          kota_kabupaten,
          nama_pengguna,
          kata_sandi,
        ]);
        res.status(201).send("Account created successfully");
      } catch (error) {
        console.error("Error creating account:", error);
        res.status(500).send("Error creating account");
      }
    });

    app.put("/akun/:username", async (req, res) => {
      try {
        const { no_kta, nama, kota_kabupaten, nama_pengguna, kata_sandi } =
          req.body;
        const query =
          "UPDATE akun_ssrils SET no_kta = ?, nama = ?, kota_kabupaten = ?, kata_sandi = ? WHERE nama_pengguna = ?";
        await connection.query(query, [
          no_kta,
          nama,
          kota_kabupaten,
          kata_sandi,
          nama_pengguna,
        ]);
        res.status(200).send("Account updated successfully");
      } catch (error) {
        console.error("Error updating account:", error);
        res.status(500).send("Error updating account");
      }
    });

    app.delete("/akun/:username", async (req, res) => {
      try {
        const { username } = req.params;
        const query = "DELETE FROM akun_ssrils WHERE Nama_Pengguna = ?";
        await connection.query(query, [username]);
        res.status(200).send("Account deleted successfully");
      } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).send("Error deleting account");
      }
    });

    // Menu Sebaran Wilayah
    app.get("/wilayah", async (req, res) => {
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

    app.get("/kota/:id_kota", async (req, res) => {
      const { id_kota } = req.params;

      try {
        const [rows] = await connection.query(
          `
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
        `,
          [id_kota]
        );

        res.json(rows);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error retrieving data");
      }
    });

    app.get("/kecamatan/:id_kecamatan", async (req, res) => {
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
          res.status(404).send("Kecamatan not found");
        } else {
          res.json(rows[0]);
        }
      } catch (error) {
        console.error("Error fetching kecamatan data:", error);
        res.status(500).send("Error retrieving kecamatan data");
      }
    });

    // Route untuk menambahkan data kecamatan baru
    app.post("/kecamatan", async (req, res) => {
      try {
        const { id_kota, kode_kecamatan, nama_kecamatan } = req.body;
        const query =
          "INSERT INTO kecamatan (id_kota, kode_kecamatan, nama_kecamatan) VALUES (?, ?, ?)";
        await connection.query(query, [
          id_kota,
          kode_kecamatan,
          nama_kecamatan,
        ]);
        res.status(201).send("Kecamatan added successfully");
      } catch (error) {
        console.error("Error adding kecamatan:", error);
        res.status(500).send("Error adding kecamatan");
      }
    });

    // Route untuk mengubah data kecamatan
    app.put("/kecamatan/:id_kecamatan", async (req, res) => {
      try {
        const { id_kecamatan } = req.params;
        const { kode_kecamatan, nama_kecamatan } = req.body;
        const query =
          "UPDATE kecamatan SET kode_kecamatan = ?, nama_kecamatan = ? WHERE id = ?";
        await connection.query(query, [
          kode_kecamatan,
          nama_kecamatan,
          id_kecamatan,
        ]);
        res.status(200).send("Kecamatan updated successfully");
      } catch (error) {
        console.error("Error updating kecamatan:", error);
        res.status(500).send("Error updating kecamatan");
      }
    });

    app.get("/kota", async (req, res) => {
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


    app.put("/kota/:id_kota", async (req, res) => {
      try {
        const { id_kota } = req.params;
        const { kode_kota, nama_kota } = 
          req.body;
        const query =
          "UPDATE kota SET kode_kota = ?, nama_kota = ? WHERE id = ?";
        await connection.query(query, [
          kode_kota,
          nama_kota,
          id_kota
        ]);
        res.status(200).send("Kota updated successfully");
      } catch (error) {
        console.error("Error updating kota:", error);
        res.status(500).send("Error updating kota");
      }
    });

    

    // Route untuk menghapus data kecamatan
    app.delete("/kecamatan/:id_kecamatan", async (req, res) => {
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

    app.delete("/kota/:id_kota", async (req, res) => {
      try {
        const { id_kota } = req.params;
        const query = "DELETE FROM kota WHERE id = ?";
        await connectionPool.query(query, [id_kota]);
         if (result.affectedRows > 0) {
           res.status(200).send("Kota deleted successfully");
         } else {
           res.status(404).send("Kota not found");
         }
      } catch (error) {
        console.error("Error deleting kota:", error);
        res.status(500).send("Error deleting kota");
      }
    });


    

    // POST: Menambahkan data baru ke tabel provinsi
    app.post("/tambah-data", async (req, res) => {
      try {
        const {
          nama_provinsi,
          kode_provinsi,
          nama_kota,
          kode_kota,
          nama_kecamatan,
          kode_kecamatan,
        } = req.body;

        // Insert data ke tabel 'provinsi'
        const provinsiQuery =
          "INSERT INTO provinsi (nama_provinsi, kode_provinsi) VALUES (?, ?)";
        const [provinsiResult] = await connection.query(provinsiQuery, [
          nama_provinsi,
          kode_provinsi,
        ]);
        const id_provinsi = provinsiResult.insertId;

        // Insert data ke tabel 'kota'
        const kotaQuery =
          "INSERT INTO kota (nama_kota, kode_kota, id_provinsi) VALUES (?, ?, ?)";
        const [kotaResult] = await connection.query(kotaQuery, [
          nama_kota,
          kode_kota,
          id_provinsi,
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
    app.put("/provinsi/:id", async (req, res) => {
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
    app.delete("/provinsi/:id", async (req, res) => {
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

    

    // Start server with better error handling
    const port = 8000;
    app
      .listen(port, () => console.log(`Server running on port ${port}`))
      .on("error", (err) => {
        console.error("Server error:", err);
        process.exit(1); // Exit with error code on server error
      });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
    process.exit(1); // Exit with error code on connection error
  });
