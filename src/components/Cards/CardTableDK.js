import React, { useState } from "react";
import { useRouter } from 'next/router';

export default function TableDK() {
  const [filterKota, setFilterKota] = useState("All");

  // Function to handle filter change
  const handleFilterChange = (e) => {
    setFilterKota(e.target.value);
  };

  // Function to handle tambah kader
  const handleTambahKader = () => {
    // Your logic to handle tambah kader goes here
  };

  // Function to handle button tambah click

  const router = useRouter();
  const handleButtonTambahClick = () => {
    router.push('/components/Forms/FormUploadKTA');
  };


  // Dummy data for kader
  const kaderData = [
    { id: 1, nama: "Sarah Johnson", jenisKelamin: "Perempuan", usia: 25, noTelepon: "08123456789", alamat: "Jl. Contoh No. 123", kecamatan: "Contoh", kota: "Bandar Lampung", provinsi: "Lampung", username: "sarahj123" },
    { id: 2, nama: "Muhammad Ali", jenisKelamin: "Laki-laki", usia: 30, noTelepon: "087654321", alamat: "Jl. Contoh No. 456", kecamatan: "Contoh", kota: "Bandar Lampung", provinsi: "Lampung", username: "muhammadali321" },
    { id: 3, nama: "Emily Smith", jenisKelamin: "Perempuan", usia: 28, noTelepon: "08123456789", alamat: "Jl. Contoh No. 789", kecamatan: "Contoh", kota: "Bandar Lampung", provinsi: "Lampung", username: "emilysmith456" },
    { id: 4, nama: "David Brown", jenisKelamin: "Laki-laki", usia: 35, noTelepon: "087654321", alamat: "Jl. Contoh No. 1011", kecamatan: "Contoh", kota: "Bandar Lampung", provinsi: "Lampung", username: "davidbrown789" },
    { id: 5, nama: "Maria Rodriguez", jenisKelamin: "Perempuan", usia: 27, noTelepon: "08123456789", alamat: "Jl. Contoh No. 1213", kecamatan: "Contoh", kota: "Bandar Lampung", provinsi: "Lampung", username: "mariarod123" },
    { id: 6, nama: "John Doe", jenisKelamin: "Laki-laki", usia: 30, noTelepon: "08123456789", alamat: "Jl. Contoh No. 456", kecamatan: "Contoh", kota: "Pringsewu", provinsi: "Lampung", username: "johndoe123" },
    { id: 7, nama: "Jane Doe", jenisKelamin: "Perempuan", usia: 28, noTelepon: "087654321", alamat: "Jl. Contoh No. 789", kecamatan: "Contoh", kota: "Pringsewu", provinsi: "Lampung", username: "janedoe456" },
    { id: 8, nama: "Michael Smith", jenisKelamin: "Laki-laki", usia: 35, noTelepon: "08123456789", alamat: "Jl. Contoh No. 1011", kecamatan: "Contoh", kota: "Pesawaran", provinsi: "Lampung", username: "michaelsmith123" },
    { id: 9, nama: "Jessica Johnson", jenisKelamin: "Perempuan", usia: 27, noTelepon: "087654321", alamat: "Jl. Contoh No. 1213", kecamatan: "Contoh", kota: "Pesawaran", provinsi: "Lampung", username: "jessicajohnson456" },
    { id: 10, nama: "Robert Brown", jenisKelamin: "Laki-laki", usia: 25, noTelepon: "08123456789", alamat: "Jl. Contoh No. 123", kecamatan: "Contoh", kota: "Tanggamus", provinsi: "Lampung", username: "robertbrown123" },
    { id: 11, nama: "Jennifer Lee", jenisKelamin: "Perempuan", usia: 30, noTelepon: "087654321", alamat: "Jl. Contoh No. 456", kecamatan: "Contoh", kota: "Tanggamus", provinsi: "Lampung", username: "jenniferlee321" },
    { id: 12, nama: "William Wilson", jenisKelamin: "Laki-laki", usia: 28, noTelepon: "08123456789", alamat: "Jl. Contoh No. 789", kecamatan: "Contoh", kota: "Lampung Tengah", provinsi: "Lampung", username: "williamwilson123" },
    { id: 13, nama: "Amanda Miller", jenisKelamin: "Perempuan", usia: 35, noTelepon: "087654321", alamat: "Jl. Contoh No. 1011", kecamatan: "Contoh", kota: "Lampung Selatan", provinsi: "Lampung", username: "amandamiller789" },
    { id: 14, nama: "Christopher Davis", jenisKelamin: "Laki-laki", usia: 27, noTelepon: "08123456789", alamat: "Jl. Contoh No. 1213", kecamatan: "Contoh", kota: "Lampung Timur", provinsi: "Lampung", username: "christopherdavis123" },
    { id: 15, nama: "Olivia Garcia", jenisKelamin: "Perempuan", usia: 25, noTelepon: "087654321", alamat: "Jl. Contoh No. 123", kecamatan: "Contoh", kota: "Lampung Utara", provinsi: "Lampung", username: "oliviagarcia321" },
  ];
  

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
                <a type="button" onClick={handleButtonTambahClick} className="bg-green-600 text-white font-medium py-1 px-3 rounded mr-2">
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
                Usia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                No Telepon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Alamat
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.usia}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.noTelepon}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.alamat}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.kecamatan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.kota}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.provinsi}</td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {/* Buttons for actions */}
                    <button className="mr-2 mb-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Ubah
                    </button>
                    <button className="mb-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Hapus
                    </button>
                    </td>
                    <td>
                    <div>
                    <button
                    
                      type="button"
                      onClick={handleButtonTambahClick}
                      className="ml-2 mr-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Lihat
                    </button>
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