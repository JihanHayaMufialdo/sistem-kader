
// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const login = require('./routes/login')
const dataKader= require('./routes/dataKader')
const sebaranWilayah= require('./routes/sebaranWilayah')
const laporan = require('./routes/laporan')
const tambahAkun = require('./routes/tambahAkun')
const dashboard = require('./routes/dashboard')
const profil = require('./routes/profil')
const kta = require('./routes/kta')
const path = require('path');


// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Middleware untuk mengurai JSON body dari request
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use( login)
app.use( dataKader)
app.use( sebaranWilayah)
app.use( tambahAkun)
app.use( laporan)
app.use ( dashboard)
app.use ( profil)
app.use ( kta)


// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});