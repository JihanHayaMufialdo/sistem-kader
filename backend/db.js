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
  database: "database_ils",
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'database_ils'
});

connectionPool.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database');
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

    // Menu Data Kader
    // GET: Mengambil semua data kader
    app.get('/kader', async (req, res) => {
      try {
        const [rows] = await connectionPool.query(`
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
    app.get('/kader/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const [rows] = await connectionPool.query(`
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

    app.get('/data', async (req, res) => {
      try {
        const [kecamatanRows] = await connectionPool.query(`
          SELECT 
            kecamatan.id, 
            kecamatan.nama_kecamatan, 
            kota.nama_kota AS nama_kota, 
            provinsi.nama_provinsi AS nama_provinsi 
          FROM kecamatan
          JOIN kota ON kecamatan.id_kota = kota.id
          JOIN provinsi ON kota.id_provinsi = provinsi.id
        `);
    
        const [jenisKaderRows] = await connectionPool.query(`
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
    
    
    
    
    

    // POST: Menambahkan data kader baru
    app.post('/kader', async (req, res) => {
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
    
      const connection = await connectionPool.getConnection();
    
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
    app.put('/kader/:id', async (req, res) => {
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
    
      const connection = await connectionPool.getConnection();
    
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
    app.delete('/kader/:id', async (req, res) => {
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

    app.get("/kecamatan-by-kota/:id_kota", async (req, res) => {
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
      const [rows] = await connectionPool.query(query, [id_kecamatan]);
  
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
app.get('/provinsi', async (req, res) => {
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
    const [results] = await connectionPool.query(query);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

    // Route untuk menambahkan data kecamatan baru
    app.post('/kota/kecamatan', async (req, res) => {
      try {
        const { kode_kecamatan, nama_kecamatan, id_kota } = req.body;
        if (!kode_kecamatan || !nama_kecamatan || !id_kota) {
          return res.status(400).json({ error: 'All fields are required' });
        }
        const query = "INSERT INTO kecamatan (kode_kecamatan, nama_kecamatan, id_kota) VALUES (?, ?, ?)";
        const [result] = await connectionPool.query(query, [kode_kecamatan, nama_kecamatan, id_kota]);
        res.status(201).json({ message: "Kecamatan added successfully", result });
      } catch (error) {
        console.error('Error adding kecamatan:', error);
        res.status(500).json({ error: 'Error adding kecamatan' });
      }
    });

    // Route untuk mengubah data kecamatan
    app.put("/kecamatan/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { kode_kecamatan, nama_kecamatan } = req.body;
        const query =
          "UPDATE kecamatan SET kode_kecamatan = ?, nama_kecamatan = ? WHERE id = ?";
        await connection.query(query, [
          kode_kecamatan,
          nama_kecamatan,
          id,
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
        const { kode_kota, nama_kota, kode_provinsi } = req.body;
    
        // Perbarui kode kota di tabel kota
        const queryKota = "UPDATE kota SET kode_kota = ?, nama_kota = ? WHERE id = ?";
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
        const [result] = await connectionPool.query(query, [id_kota]);
    
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
    app.post("/tambah-data", async (req, res) => {
      try {
        const {
          nama_provinsi,
          kode_provinsi,
          nama_kota,
          kode_kota,
          nama_kecamatan,
          kode_kecamatan,
          id // Tambahkan field id_provinsi dari frontend
        } = req.body;
    
        // Cek apakah nama provinsi sudah ada di database
        const existingProvinsiQuery = "SELECT id FROM provinsi WHERE nama_provinsi = ?";
        const [existingProvinsiRows] = await connection.query(existingProvinsiQuery, [nama_provinsi]);
    
        let id_toInsert = id; // Gunakan ID provinsi dari frontend
        if (existingProvinsiRows.length > 0) {
          // Jika nama provinsi sudah ada, gunakan ID provinsi yang sudah ada
          id_toInsert = existingProvinsiRows[0].id;
        } else {
          // Jika nama provinsi belum ada, tambahkan data provinsi baru
          const newProvinsiQuery = "INSERT INTO provinsi (nama_provinsi, kode_provinsi) VALUES (?, ?)";
          const [newProvinsiResult] = await connection.query(newProvinsiQuery, [nama_provinsi, kode_provinsi]);
          id_toInsert = newProvinsiResult.insertId;
        }
    
        // Insert data ke tabel 'kota'
        const kotaQuery =
          "INSERT INTO kota (nama_kota, kode_kota, id_provinsi) VALUES (?, ?, ?)";
        const [kotaResult] = await connection.query(kotaQuery, [
          nama_kota,
          kode_kota,
          id_toInsert // Gunakan ID provinsi yang sudah ditentukan
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

// Filter
// Endpoint untuk menyaring data kader berdasarkan filter
app.get("/filter-kader", async (req, res) => {
  try {
    const { jenis_kader, jenis_kelamin, provinsi, kota_kabupaten, kecamatan } = req.query;
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
    const [rows] = await connectionPool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching filtered kader data:", error);
    res.status(500).send("Error retrieving filtered kader data");
  }
});


// Endpoint untuk mengambil pilihan nama provinsi, kabupaten/kota, dan kecamatan
app.get('/filter-options', async (req, res) => {
  try {
    const [provinsiRows] = await connectionPool.query('SELECT DISTINCT nama_provinsi FROM provinsi');
    const [kotaRows] = await connectionPool.query('SELECT DISTINCT nama_kota FROM kota');
    const [kecamatanRows] = await connectionPool.query('SELECT DISTINCT nama_kecamatan FROM kecamatan');
    
    const provinsiOptions = provinsiRows.map(row => ({ id: row.id, nama: row.nama_provinsi }));
    const kotaOptions = kotaRows.map(row => ({ id: row.id, nama: row.nama_kota }));
    const kecamatanOptions = kecamatanRows.map(row => ({ id: row.id, nama: row.nama_kecamatan }));
    
    res.json({ provinsi: provinsiOptions, kota: kotaOptions, kecamatan: kecamatanOptions });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).send('Error retrieving filter options');
  }
});


=======
    app.delete("/kota/:nama_kota", async (req, res) => {
      try {
        const { nama_kota } = req.params;
        const query = "DELETE FROM kota WHERE nama_kota = ?";
        await connectionPool.execute(query, [nama_kota]);
        res.status(200).send("Kota deleted successfully");
      } catch (error) {
        console.error("Error deleting kota:", error);
        res.status(500).send("Error deleting kota");
      }
    });

    app.delete("/kota/:id_kota", async (req, res) => {
      try {
        const { id_kota } = req.params;
        const query = "DELETE FROM kota WHERE id = ?";
        const [result] = await connectionPool.query(query, [id_kota]);
    
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
    app.delete("/kecamatan/nama/:nama_kecamatan", async (req, res) => {
      try {
        const { nama_kecamatan } = req.params;
        const query = "DELETE FROM kecamatan WHERE nama_kecamatan = ?";
        const [result] = await connectionPool.query(query, [nama_kecamatan]);
    
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

    app.get('/kecamatan-by-nama/:nama_kecamatan/:id_kota', async (req, res) => {
      try {
        const { nama_kecamatan, id_kota } = req.params;
        const query = "SELECT * FROM kecamatan WHERE nama_kecamatan = ? AND id_kota = ?";
        const [rows] = await connectionPool.query(query, [nama_kecamatan, id_kota]);
    
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
app.delete("/provinsi/:id_provinsi", async (req, res) => {
  try {
    const { id_provinsi } = req.params;

    // Delete kecamatan data related to the province
    const deleteKecamatanQuery = "DELETE FROM kecamatan WHERE id_kota IN (SELECT id FROM kota WHERE id_provinsi = ?)";
    await connectionPool.query(deleteKecamatanQuery, [id_provinsi]);

    // Delete kota data related to the province
    const deleteKotaQuery = "DELETE FROM kota WHERE id_provinsi = ?";
    await connectionPool.query(deleteKotaQuery, [id_provinsi]);

    // Delete the province itself
    const deleteProvinsiQuery = "DELETE FROM provinsi WHERE id = ?";
    await connectionPool.query(deleteProvinsiQuery, [id_provinsi]);

    res.status(200).send("Province and related data deleted successfully");
  } catch (error) {
    console.error("Error deleting province and related data:", error);
    res.status(500).send("Error deleting province and related data");
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
