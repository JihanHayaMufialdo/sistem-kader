import React, { useState } from "react";
import { useRouter } from 'next/router';

function handleButtonHapus() {
  const confirmation = window.confirm("Apakah anda yakin ingin menghapus data?");
  if (confirmation) {
    // Handle positive confirmation (account creation logic)
    // console.log("Creating account...");
  } else {
    // Handle negative confirmation (do nothing)
    // console.log("Account creation cancelled.");
  }
}

export default function TableDK() {
  const [filterKota, setFilterKota] = useState("All");
  const [kaderData, setKaderData] = useState([
    { id: 1, nama: "Sarah Johnson", jenisKelamin: "Perempuan", tanggalLahir: "1997-05-12", noTelepon: "08123456789", noUrut: "001", alamat: "Jl. Contoh No. 123", kecamatan: "Contoh", kota: "Bandar Lampung", provinsi: "Lampung" },
    { id: 2, nama: "Muhammad Ali", jenisKelamin: "Laki-laki", tanggalLahir: "1992-08-25", noTelepon: "087654321", noUrut: "002", alamat: "Jl. Contoh No. 456", kecamatan: "Contoh", kota: "Bandar Lampung", provinsi: "Lampung" },
    { id: 3, nama: "Emily Smith", jenisKelamin: "Perempuan", tanggalLahir: "1994-12-18", noTelepon: "08123456789", noUrut: "003", alamat: "Jl. Contoh No. 789", kecamatan: "Contoh", kota: "Bandar Lampung", provinsi: "Lampung" },
    { id: 4, nama: "David Brown", jenisKelamin: "Laki-laki", tanggalLahir: "1989-06-30", noTelepon: "087654321", noUrut: "004", alamat: "Jl. Contoh No. 1011", kecamatan: "Contoh", kota: "Bandar Lampung", provinsi: "Lampung" },
    { id: 5, nama: "Maria Rodriguez", jenisKelamin: "Perempuan", tanggalLahir: "1997-02-15", noTelepon: "08123456789", noUrut: "005", alamat: "Jl. Contoh No. 1213", kecamatan: "Contoh", kota: "Bandar Lampung", provinsi: "Lampung" },
    { id: 6, nama: "John Doe", jenisKelamin: "Laki-laki", tanggalLahir: "1992-11-05", noTelepon: "08123456789", noUrut: "006", alamat: "Jl. Contoh No. 456", kecamatan: "Contoh", kota: "Pringsewu", provinsi: "Lampung" },
    { id: 7, nama: "Jane Doe", jenisKelamin: "Perempuan", tanggalLahir: "1994-09-20", noTelepon: "087654321", noUrut: "007", alamat: "Jl. Contoh No. 789", kecamatan: "Contoh", kota: "Pringsewu", provinsi: "Lampung" },
    { id: 8, nama: "Michael Smith", jenisKelamin: "Laki-laki", tanggalLahir: "1989-04-10", noTelepon: "08123456789", noUrut: "008", alamat: "Jl. Contoh No. 1011", kecamatan: "Contoh", kota: "Pesawaran", provinsi: "Lampung" },
    { id: 9, nama: "Jessica Johnson", jenisKelamin: "Perempuan", tanggalLahir: "1997-08-03", noTelepon: "087654321", noUrut: "009", alamat: "Jl. Contoh No. 1213", kecamatan: "Contoh", kota: "Pesawaran", provinsi: "Lampung" },
    { id: 10, nama: "Robert Brown", jenisKelamin: "Laki-laki", tanggalLahir: "1999-01-25", noTelepon: "08123456789", noUrut: "010", alamat: "Jl. Contoh No. 123", kecamatan: "Contoh", kota: "Tanggamus", provinsi: "Lampung" }
    // Data kader yang ada sebelumnya
  ]);

  // Function to handle filter change
  const handleFilterChange = (e) => {
    setFilterKota(e.target.value);
  };

  // Function to handle tambah kader
  const router = useRouter();
  const handleTambahKader = () => {
    router.push('kader/InsertKader');
  };

   // Function to handle edit kader
   const handleEditKader = () => {
     router.push('kader/EditKader');
   };
  // Function to handle button tambah click

  const router = useRouter();
  const handleButtonTambahClick = () => {
    router.push('/components/Forms/FormUploadKTA');
  };

  // Function to handle penyimpanan data kader
  const handleSimpanDataKader = (dataKaderBaru) => {
    setKaderData([...kaderData, dataKaderBaru]);
  };

  return (
    <div className="overflow-x-auto">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-4 shadow-lg rounded-lg bg-white border-1">
        {/* Filter dropdown */}
        <div className="mt-3 mx-4 mb-4">
          <label htmlFor="filterKota" className="block text-sm font-medium text-gray-700">
            Filter Kota:
          </label>
          <select
            id="filterKota"
            name="filterKota"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={filterKota}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Bandar Lampung">Bandar Lampung</option>
            <option value="Pringsewu">Pringsewu</option>
            <option value="Pesawaran">Pesawaran</option>
            <option value="Tanggamus">Tanggamus</option>
            <option value="Lampung Tengah">Lampung Tengah</option>
            <option value="Lampung Selatan">Lampung Selatan</option>
            <option value="Lampung Timur">Lampung Timur</option>
            <option value="Lampung Utara">Lampung Utara</option>
            <option value="Tulang Bawang Barat">Tulang Bawang Barat</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <div className="rounded-t bg-white mb-1 px-3 py-3 border-collapse">
            <div className="flex justify-between items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h6 className="text-green-600 text-xl font-bold">
                  Daftar Kader ILS
                </h6>
              </div>
              <div className="flex justify-end mr-2">
                <a type="button" onClick={handleTambahKader} className="bg-green-600 text-white font-medium py-1 px-3 rounded mr-2">
                  Tambah Kader
                </a>
              </div>
            </div>
          </div>
        </div>


        {/* Table */}
        <table className="items-center w-full bg-white border-collapse">
          {/* Table Header */}
          <thead className="bg-blueGray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Nomor Induk Anggota
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Jenis Kelamin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Tanggal Lahir
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                No Telepon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Alamat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                No Urut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Kecamatan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Kota
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Provinsi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Aksi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                KTA
              </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {kaderData
              .filter((kader) => filterKota === "All" || kader.kota === filterKota)
              .map((kader, index) => (
                <tr key={kader.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.nama}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.jenisKelamin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.tanggalLahir}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.noTelepon}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.alamat}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.noUrut}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.kecamatan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.kota}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.provinsi}</td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {/* Buttons for actions */}
                    <button onClick={handleEditKader} 
                    className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Ubah
                    </button>
                    <button onClick={handleButtonHapus} 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Hapus
                    </button>
                    </td>
                    <td>
                    <div>
                    <a
                      type="button"
                      onClick={handleButtonTambahClick}
                      className="ml-2 mr-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Lihat
                    </a>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}