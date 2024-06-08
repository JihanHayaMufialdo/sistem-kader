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

    router.get('/peringkat_perwilayah', async (req, res) => {
      try {
        const [rows] = await db.query(`
          SELECT
            kader_data.Kabupaten_Kota,
            kader_data.Bulan,
            kader_data.Tahun,
            SUM(COALESCE(laporan_tpt.count, 0)) AS TPT,
            SUM(COALESCE(laporan_ik_rt.count, 0)) AS IK,
            SUM(COALESCE(laporan_ik_nonrt.count, 0)) AS IK_Nonrt,
            SUM(COALESCE(laporan_terduga.count, 0)) AS Ternotifikasi,
            SUM(COALESCE(laporan_tpt.count, 0) +
                COALESCE(laporan_ik_rt.count, 0) +
                COALESCE(laporan_ik_nonrt.count, 0) +
                COALESCE(laporan_terduga.count, 0)) AS Total_Laporan
          FROM (
            SELECT DISTINCT kota_kab AS Kabupaten_Kota, bulan, tahun FROM laporan_ik_nonrt
            UNION
            SELECT DISTINCT kota_kab AS Kabupaten_Kota, bulan, tahun FROM laporan_tpt
            UNION
            SELECT DISTINCT kota_kab AS Kabupaten_Kota, bulan, tahun FROM laporan_ik_rt
            UNION
            SELECT DISTINCT kota_kab AS Kabupaten_Kota, bulan, tahun FROM laporan_terduga
          ) AS kader_data
          LEFT JOIN (SELECT kota_kab, bulan, tahun, COUNT(*) AS count FROM laporan_tpt GROUP BY kota_kab, bulan, tahun) AS laporan_tpt
            ON kader_data.Kabupaten_Kota = laporan_tpt.kota_kab AND kader_data.Bulan = laporan_tpt.bulan AND kader_data.Tahun = laporan_tpt.tahun
          LEFT JOIN (SELECT kota_kab, bulan, tahun, COUNT(*) AS count FROM laporan_ik_rt GROUP BY kota_kab, bulan, tahun) AS laporan_ik_rt
            ON kader_data.Kabupaten_Kota = laporan_ik_rt.kota_kab AND kader_data.Bulan = laporan_ik_rt.bulan AND kader_data.Tahun = laporan_ik_rt.tahun
          LEFT JOIN (SELECT kota_kab, bulan, tahun, COUNT(*) AS count FROM laporan_ik_nonrt GROUP BY kota_kab, bulan, tahun) AS laporan_ik_nonrt
            ON kader_data.Kabupaten_Kota = laporan_ik_nonrt.kota_kab AND kader_data.Bulan = laporan_ik_nonrt.bulan AND kader_data.Tahun = laporan_ik_nonrt.tahun
          LEFT JOIN (SELECT kota_kab, bulan, tahun, COUNT(*) AS count FROM laporan_terduga GROUP BY kota_kab, bulan, tahun) AS laporan_terduga
            ON kader_data.Kabupaten_Kota = laporan_terduga.kota_kab AND kader_data.Bulan = laporan_terduga.bulan AND kader_data.Tahun = laporan_terduga.tahun
          GROUP BY kader_data.Kabupaten_Kota, kader_data.Bulan, kader_data.Tahun
          ORDER BY Total_Laporan DESC;
        `);
        res.json(rows);
      } catch (error) {
        console.error('Error fetching kader data:', error);
        res.status(500).send('Error retrieving kader data');
      }
    });
    

    router.get('/peringkat_kader', async (req, res) => {
      try {
        const [rows] = await db.query(`
          SELECT
            kader_data.Nama_Kader,
            kader_data.Kabupaten_Kota,
            kader_data.Kecamatan,
            kader_data.Bulan,
            kader_data.Tahun,
            SUM(COALESCE(laporan_tpt.TPT, 0)) AS TPT,
            SUM(COALESCE(laporan_ik_rt.IK, 0)) AS IK,
            SUM(COALESCE(laporan_ik_nonrt.IK_Nonrt, 0)) AS IK_Nonrt,
            SUM(COALESCE(laporan_terduga.Ternotifikasi, 0)) AS Ternotifikasi,
            (SUM(COALESCE(laporan_tpt.TPT, 0)) +
             SUM(COALESCE(laporan_ik_rt.IK, 0)) +
             SUM(COALESCE(laporan_ik_nonrt.IK_Nonrt, 0)) +
             SUM(COALESCE(laporan_terduga.Ternotifikasi, 0))) AS Total_Laporan
          FROM (
            SELECT kader AS Nama_Kader, kota_kab AS Kabupaten_Kota, kecamatan AS Kecamatan, bulan, tahun FROM laporan_ik_nonrt
            UNION
            SELECT kader AS Nama_Kader, kota_kab AS Kabupaten_Kota, kecamatan AS Kecamatan, bulan, tahun FROM laporan_tpt
            UNION
            SELECT kader AS Nama_Kader, kota_kab AS Kabupaten_Kota, kecamatan AS Kecamatan, bulan, tahun FROM laporan_ik_rt
            UNION
            SELECT kader AS Nama_Kader, kota_kab AS Kabupaten_Kota, kecamatan AS Kecamatan, bulan, tahun FROM laporan_terduga
          ) AS kader_data
          LEFT JOIN (
            SELECT kader, kota_kab, kecamatan, bulan, tahun, COUNT(DISTINCT id) AS TPT FROM laporan_tpt GROUP BY kader, kota_kab, kecamatan, bulan, tahun
          ) AS laporan_tpt ON kader_data.Nama_Kader = laporan_tpt.kader AND kader_data.Kabupaten_Kota = laporan_tpt.kota_kab AND kader_data.Kecamatan = laporan_tpt.kecamatan AND kader_data.Tahun = laporan_tpt.tahun AND kader_data.Bulan = laporan_tpt.bulan
          LEFT JOIN (
            SELECT kader, kota_kab, kecamatan, bulan, tahun, COUNT(DISTINCT id) AS IK FROM laporan_ik_rt GROUP BY kader, kota_kab, kecamatan, bulan, tahun
          ) AS laporan_ik_rt ON kader_data.Nama_Kader = laporan_ik_rt.kader AND kader_data.Kabupaten_Kota = laporan_ik_rt.kota_kab AND kader_data.Kecamatan = laporan_ik_rt.kecamatan AND kader_data.Tahun = laporan_ik_rt.tahun AND kader_data.Bulan = laporan_ik_rt.bulan
          LEFT JOIN (
            SELECT kader, kota_kab, kecamatan, bulan, tahun, COUNT(DISTINCT id) AS IK_Nonrt FROM laporan_ik_nonrt GROUP BY kader, kota_kab, kecamatan, bulan, tahun
          ) AS laporan_ik_nonrt ON kader_data.Nama_Kader = laporan_ik_nonrt.kader AND kader_data.Kabupaten_Kota = laporan_ik_nonrt.kota_kab AND kader_data.Kecamatan = laporan_ik_nonrt.kecamatan AND kader_data.Tahun = laporan_ik_nonrt.tahun AND kader_data.Bulan = laporan_ik_nonrt.bulan
          LEFT JOIN (
            SELECT kader, kota_kab, kecamatan, bulan, tahun, COUNT(DISTINCT id) AS Ternotifikasi FROM laporan_terduga GROUP BY kader, kota_kab, kecamatan, bulan, tahun
          ) AS laporan_terduga ON kader_data.Nama_Kader = laporan_terduga.kader AND kader_data.Kabupaten_Kota = laporan_terduga.kota_kab AND kader_data.Kecamatan = laporan_terduga.kecamatan AND kader_data.Tahun = laporan_terduga.tahun AND kader_data.Bulan = laporan_terduga.bulan
          GROUP BY kader_data.Nama_Kader, kader_data.Kabupaten_Kota, kader_data.Kecamatan, kader_data.Bulan, kader_data.Tahun
          ORDER BY Total_Laporan DESC, kader_data.Kabupaten_Kota, kader_data.Kecamatan, kader_data.Nama_Kader, kader_data.Tahun;
        `);
        res.json(rows);
      } catch (error) {
        console.error('Error fetching kader data:', error);
        res.status(500).send('Error retrieving kader data');
      }
    });
    
      
  })
  .catch((error) => {
    console.error("Error connecting to MySQL database:", error);
  });

module.exports = router;
