const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

const connectionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "database_ils",
  port: 3308,
});

// Menu Sebaran Wilayah
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

app.delete("/provinsi/nama/:nama_provinsi", async (req, res) => {
  try {
    const { nama_provinsi } = req.params;
    const query = "DELETE FROM provinsi WHERE nama_provinsi = ?";
    await connectionPool.query(query, [nama_provinsi]);
    res.status(200).send("Provinsi deleted successfully");
  } catch (error) {
    console.error("Error deleting provinsi:", error);
    res.status(500).send("Error deleting provinsi");
  }
});





// Start the server
const port = 8000;
app.listen(port, () => console.log(`Server running on port ${port}`)).on("error", (err) => {
  console.error("Server error:", err);
  process.exit(1);
});