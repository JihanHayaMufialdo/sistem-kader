const express = require('express');
const db = require('../config/db'); // Pastikan db diatur untuk mendukung promises
const multer = require("multer");
const xlsx = require("xlsx");
const path = require("path");
const router = express.Router();
const fs = require("fs");

db.getConnection()
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


    // Handle file upload data kader di thunder
    router.post('/upload/datakader', upload.single('file'), (req, res) => {
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


        const sql = "INSERT INTO data_kader (jenis_kader, nama, jenis_kelamin, no_telp, id_Kecamatan) VALUES ( ?, ?, ?, ?, ?)";

        // Loop melalui data dan masukkan satu per satu
        sheetData.forEach(row => {
        db.query(sql, [
          row['jenis_kader'],
          row.nama,
          row['jenis_kelamin'],
          row['no_telp'],
          row['id_kecamatan']
          
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

    //Menampilkan Laporan+Penjumlahannya
    router.get('/menampilkan_laporan', async (req, res) => {
      try {
        const [rows] = await db.query(`
        SELECT
            kader_data.Nama_Kader,
            kader_data.Kabupaten_Kota,
            kader_data.Kecamatan,
            COUNT(DISTINCT laporan_tpt.id) AS TPT,
            COUNT(DISTINCT laporan_ik_rt.id) AS IK,
            COUNT(DISTINCT laporan_ik_nonrt.id) AS IK_Nonrt,
            COUNT(DISTINCT laporan_terduga.id) AS Ternotifikasi
        FROM (
            SELECT kader AS Nama_Kader, kota_kab AS Kabupaten_Kota, kecamatan AS Kecamatan FROM laporan_ik_nonrt
            UNION
            SELECT kader AS Nama_Kader, kota_kab AS Kabupaten_Kota, kecamatan AS Kecamatan FROM laporan_tpt
            UNION
            SELECT kader AS Nama_Kader, kota_kab AS Kabupaten_Kota, kecamatan AS Kecamatan FROM laporan_ik_rt
            UNION
            SELECT kader AS Nama_Kader, kota_kab AS Kabupaten_Kota, kecamatan AS Kecamatan FROM laporan_terduga
        ) AS kader_data
        LEFT JOIN laporan_tpt ON kader_data.Nama_Kader = laporan_tpt.kader AND kader_data.Kabupaten_Kota = laporan_tpt.kota_kab AND kader_data.Kecamatan = laporan_tpt.kecamatan
        LEFT JOIN laporan_ik_rt ON kader_data.Nama_Kader = laporan_ik_rt.kader AND kader_data.Kabupaten_Kota = laporan_ik_rt.kota_kab AND kader_data.Kecamatan = laporan_ik_rt.kecamatan
        LEFT JOIN laporan_ik_nonrt ON kader_data.Nama_Kader = laporan_ik_nonrt.kader AND kader_data.Kabupaten_Kota = laporan_ik_nonrt.kota_kab AND kader_data.Kecamatan = laporan_ik_nonrt.kecamatan
        LEFT JOIN laporan_terduga ON kader_data.Nama_Kader = laporan_terduga.kader AND kader_data.Kabupaten_Kota = laporan_terduga.kota_kab AND kader_data.Kecamatan = laporan_terduga.kecamatan
        GROUP BY kader_data.Nama_Kader, kader_data.Kabupaten_Kota, kader_data.Kecamatan
        ORDER BY kader_data.Kabupaten_Kota, kader_data.Kecamatan, kader_data.Nama_Kader;
        `);
        res.json(rows);
      } catch (error) {
        console.error('Error fetching kader data:', error);
        res.status(500).send('Error retrieving kader data');
      }
    });

    //Detail Laporan
    router.get('/filelaporan', async (req, res) => {
      try {
        const [rows] = await db.query(`
        SELECT * FROM upload_file_laporan 
        `);
        res.json(rows);
      } catch (error) {
        console.error('Error fetching kader data:', error);
        res.status(500).send('Error retrieving kader data');
      }
    });

    // Endpoint untuk menghapus file dan data terkait
    router.delete('/delete-file/:id', async (req, res) => {
      const { id } = req.params;
      
      try {
        // Mulai transaksi
        
        // Hapus data di tabel laporan yang berelasi dengan kode_laporan
        await db.query('DELETE FROM laporan_ik_nonrt WHERE kode_laporan = ?', [id]);
        await db.query('DELETE FROM laporan_ik_rt WHERE kode_laporan = ?', [id]);
        await db.query('DELETE FROM laporan_terduga WHERE kode_laporan = ?', [id]);

        // Hapus data di tabel upload_file_laporan
        await db.query('DELETE FROM upload_file_laporan WHERE id = ?', [id]);
        
        res.status(200).send(`File with ID ${id} and related data deleted successfully.`);
      } catch (error) {
        // Rollback transaksi jika ada error
        console.error(`Failed to delete file with ID ${id}:`, error);
        res.status(500).send('Failed to delete file and related data.');
      }
    });

    

    //Tambah Laporan
    // Serve static files from the "uploads" directory
    router.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    function excelDateToJSDate(serial) {
      const excelStartDate = new Date(1900, 0, 1);
      const jsDate = new Date(excelStartDate.getTime() + (serial - 1) * 24 * 60 * 60 * 1000);
      return jsDate;
    }

    // Import Laporan
    // Laporan TPT
    router.post('/laporantpt', upload.single('file'), async (req, res) => {
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
    
      const sqlInsertTPT = "INSERT INTO laporan_tpt (Kader, tanggal, bulan, tahun, Kota_Kab, Kecamatan, kode_laporan) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const sqlInsertUpload = "INSERT INTO upload_file_laporan (nama_file, jenis_laporan, tanggal_entry) VALUES (?, ?, ?)";
    
      const connection = await db.getConnection();
    
      try {
        // Mulai transaksi
        await connection.beginTransaction();
    
        // Ambil nama file dari file yang diupload
        const namaFile = req.file.originalname;
    
        // Ambil jenis laporan dari nama tabel yang dimasukkan
        const jenisLaporan = 'TPT Anak'; // Sesuaikan dengan jenis laporan yang benar
    
        // Insert ke upload_file_laporan dan dapatkan id yang dihasilkan
        const [result] = await connection.query(sqlInsertUpload, [
          namaFile,
          jenisLaporan,
          new Date().toISOString().slice(0, 10) // Format tanggal saat ini YYYY-MM-DD
        ]);
        const kodeLaporan = result.insertId;
    
        for (const row of sheetData) {
          const tanggalData = row.Tanggal_Data;
          if (tanggalData) {
            const [tanggal, bulan, tahun] = String(tanggalData).split('-').map(Number);
            if (!isNaN(tanggal) && !isNaN(bulan) && !isNaN(tahun)) {
              // Insert ke laporan_tpt
              await connection.query(sqlInsertTPT, [
                row.Kader,
                tanggal,
                bulan,
                tahun,
                row["Kota Kab"],
                row["Kecamatan"],
                kodeLaporan // Masukkan kode_laporan di sini
              ]);
            } else {
              console.warn("Invalid date found:", tanggalData);
            }
          } else {
            console.warn("Tanggal_Data is undefined:", row);
          }
        }
    
        // Komit transaksi
        await connection.commit();
    
        // Hapus file yang diunggah setelah berhasil disimpan ke database
        fs.unlinkSync(req.file.path);
        res.send('Data berhasil disimpan ke database.');
      } catch (err) {
        console.error("Error inserting data:", err);
        await connection.rollback();
        res.status(500).send('Gagal menyimpan data ke database.');
      } finally {
        connection.release();
      }
    
      console.log('Uploaded file:', req.file);
    });
    
            
    // Laporan Teruga/Ternotifikasi
    router.post('/laporanterduga', upload.single('file'), async (req, res) => {
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
    
      const sqlInsertTerduga = "INSERT INTO laporan_terduga(tanggal, bulan, tahun, tipe_pasien, kader, kota_kab, kecamatan, kode_laporan) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      const sqlInsertUpload = "INSERT INTO upload_file_laporan (nama_file, jenis_laporan, tanggal_entry) VALUES (?, ?, ?)";
    
      const connection = await db.getConnection();
    
      try {
        // Mulai transaksi
        await connection.beginTransaction();
    
        // Ambil nama file dari file yang diupload
        const namaFile = req.file.originalname;
    
        // Ambil jenis laporan dari nama tabel yang dimasukkan
        const jenisLaporan = 'Laporan Ternotifikasi'; // Sesuaikan dengan jenis laporan yang benar
    
        // Insert ke upload_file_laporan dan dapatkan id yang dihasilkan
        const [result] = await connection.query(sqlInsertUpload, [
          namaFile,
          jenisLaporan,
          new Date().toISOString().slice(0, 10) // Format tanggal saat ini YYYY-MM-DD
        ]);
        const kodeLaporan = result.insertId;
    
        for (const row of sheetData) {
          const jsDate = excelDateToJSDate(row['Tgl Lap']);
          const tanggal = jsDate.getDate();
          const bulan = jsDate.getMonth() + 1; // getMonth() mengembalikan bulan 0-11, jadi tambahkan 1
          const tahun = jsDate.getFullYear();
    
          if (!isNaN(tanggal) && !isNaN(bulan) && !isNaN(tahun) && row['Tipe Pasien'].includes('+')) {
            // Insert ke laporan_terduga
            await connection.query(sqlInsertTerduga, [
              tanggal,
              bulan,
              tahun,
              row["Tipe Pasien"],
              row.Kader,
              row["Kota/Kab"],
              row.Kecamatan,
              kodeLaporan // Masukkan kode_laporan di sini
            ]);
          }
        }
    
        // Komit transaksi
        await connection.commit();
    
        // Hapus file yang diunggah setelah berhasil disimpan ke database
        fs.unlinkSync(req.file.path);
        res.send('Data berhasil disimpan ke database.');
      } catch (err) {
        console.error("Error inserting data:", err);
        await connection.rollback();
        res.status(500).send('Gagal menyimpan data ke database.');
      } finally {
        connection.release();
      }
    
      console.log('Uploaded file:', req.file);
    });     
    
    // Laporan IK Non RT
    router.post('/laporaniknonrt', upload.single('file'), async (req, res) => {
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
    
      // Filter baris yang memiliki 'Tanggal Data'
      const filteredData = sheetData.filter(row => row['Tanggal Data'] && String(row['Tanggal Data']).trim());
    
      const sqlInsertIKNonRT = "INSERT INTO laporan_ik_nonrt (tanggal, bulan, tahun, kader, kota_kab, kecamatan, kode_laporan) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const sqlInsertUpload = "INSERT INTO upload_file_laporan (nama_file, jenis_laporan, tanggal_entry) VALUES (?, ?, ?)";
    
      const connection = await db.getConnection();
    
      try {
        // Mulai transaksi
        await connection.beginTransaction();
    
        // Ambil nama file dari file yang diupload
        const namaFile = req.file.originalname;
    
        // Ambil jenis laporan dari nama tabel yang dimasukkan
        const jenisLaporan = 'Laporan IK NON-RT'; // Sesuaikan dengan jenis laporan yang benar
    
        // Insert ke upload_file_laporan dan dapatkan id yang dihasilkan
        const [result] = await connection.query(sqlInsertUpload, [
          namaFile,
          jenisLaporan,
          new Date().toISOString().slice(0, 10) // Format tanggal saat ini YYYY-MM-DD
        ]);
        const kodeLaporan = result.insertId;
    
        for (const row of filteredData) {
          const [tanggal, bulan, tahun] = String(row['Tanggal Data']).split('-').map(Number);
    
          if (!isNaN(tanggal) && !isNaN(bulan) && !isNaN(tahun)) {
            // Insert ke laporan_ik_nonrt
            await connection.query(sqlInsertIKNonRT, [
              tanggal,
              bulan,
              tahun,
              row.Kader,
              row["Kota Kab"],
              row.Kecamatan,
              kodeLaporan // Masukkan kode_laporan di sini
            ]);
          } else {
            console.warn("Invalid date found:", row['Tanggal Data']);
          }
        }
    
        // Komit transaksi
        await connection.commit();
    
        // Hapus file yang diunggah setelah berhasil disimpan ke database
        fs.unlinkSync(req.file.path);
        res.send('Data berhasil disimpan ke database.');
      } catch (err) {
        console.error("Error inserting data:", err);
        await connection.rollback();
        res.status(500).send('Gagal menyimpan data ke database.');
      } finally {
        connection.release();
      }
    
      console.log('Uploaded file:', req.file);
    });    


    // Laporan IK RT
    router.post('/laporanikrt', upload.single('file'), async (req, res) => {
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
    
      // Filter baris yang memiliki 'Tanggal Data'
      const filteredData = sheetData.filter(row => row['Tanggal Data'] && String(row['Tanggal Data']).trim());
    
      const sqlInsertIKRT = "INSERT INTO laporan_ik_rt (tanggal, bulan, tahun, kader, kota_kab, kecamatan, kode_laporan) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const sqlInsertUpload = "INSERT INTO upload_file_laporan (nama_file, jenis_laporan, tanggal_entry) VALUES (?, ?, ?)";
    
      const connection = await db.getConnection();
    
      try {
        // Mulai transaksi
        await connection.beginTransaction();
    
        // Ambil nama file dari file yang diupload
        const namaFile = req.file.originalname;
    
        // Ambil jenis laporan dari nama tabel yang dimasukkan
        const jenisLaporan = 'Laporan IK RT'; // Sesuaikan dengan jenis laporan yang benar
    
        // Insert ke upload_file_laporan dan dapatkan id yang dihasilkan
        const [result] = await connection.query(sqlInsertUpload, [
          namaFile,
          jenisLaporan,
          new Date().toISOString().slice(0, 10) // Format tanggal saat ini YYYY-MM-DD
        ]);
        const kodeLaporan = result.insertId;
    
        for (const row of filteredData) {
          const [tanggal, bulan, tahun] = String(row['Tanggal Data']).split('-').map(Number);
    
          if (!isNaN(tanggal) && !isNaN(bulan) && !isNaN(tahun)) {
            // Insert ke laporan_ik_rt
            await connection.query(sqlInsertIKRT, [
              tanggal,
              bulan,
              tahun,
              row.Kader,
              row["Kota Kab"],
              row.Kecamatan,
              kodeLaporan // Masukkan kode_laporan di sini
            ]);
          } else {
            console.warn("Invalid date found:", row['Tanggal Data']);
          }
        }
    
        // Komit transaksi
        await connection.commit();
    
        // Hapus file yang diunggah setelah berhasil disimpan ke database
        fs.unlinkSync(req.file.path);
        res.send('Data berhasil disimpan ke database.');
      } catch (err) {
        console.error("Error inserting data:", err);
        await connection.rollback();
        res.status(500).send('Gagal menyimpan data ke database.');
      } finally {
        connection.release();
      }
    
      console.log('Uploaded file:', req.file);
    });

  })
  .catch((error) => {
    console.error("Error connecting to MySQL database:", error);
  });

module.exports = router;