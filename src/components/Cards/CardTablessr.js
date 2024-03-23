import React, { useState } from "react";

export default function Tablessr({ color }) {
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTutupForm = () => {
    setShowForm(false);
  };

  function handleTutupDetail() {
        setShowDetail(false);
    }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="overflow-x-auto">
      <div className="rounded-t bg-white mb-1 px-4 py-3 border-2">
        <div className="flex justify-between items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h6 className="text-blueGray-700 text-xl font-bold">Daftar Akun</h6>
          </div>
        </div>
      </div>

      {/* Form untuk import data dari Excel */}
      {showForm && (
        <div className="px-4 py-3 border-2 rounded mb-4">
          <h4 className="font-semibold mb-2">Import Data from Excel</h4>
          <form>
            <label htmlFor="excelFile" className="block mb-1">
              Upload Excel File:
            </label>
            <input
              type="file"
              id="excelFile"
              name="excelFile"
              accept=".xls,.xlsx"
              className="border border-gray-300 px-2 py-1 rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-gray font-bold py-1 px-3 rounded mt-2 border border-blue-500"
            >
              Simpan
            </button>
          </form>
        </div>
      )}

      {/* Form untuk menampilkan detail laporan */}
      {showDetail && (
        <div className="grid grid-cols-2 gap-4 px-4 py-3 border-2 rounded mb-4">
          <div>
            <label htmlFor="no" className="block mb-1">
              No
            </label>
            <input
              type="text"
              id="no"
              name="no"
              className="border border-gray-300 px-2 py-1 rounded mb-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="namaKader" className="block mb-1">
              Nama Kader
            </label>
            <input
              type="text"
              id="namaKader"
              name="namaKader"
              className="border border-gray-300 px-2 py-1 rounded mb-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="kota" className="block mb-1">
              Kota
            </label>
            <input
              type="text"
              id="kota"
              name="kota"
              className="border border-gray-300 px-2 py-1 rounded mb-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="jenisLaporan" className="block mb-1">
              Jenis Laporan
            </label>
            <input
              type="text"
              id="jenisLaporan"
              name="jenisLaporan"
              className="border border-gray-300 px-2 py-1 rounded mb-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="tanggalKegiatan" className="block mb-1">
              Tanggal Kegiatan
            </label>
            <input
              type="text"
              id="tanggalKegiatan"
              name="tanggalKegiatan"
              className="border border-gray-300 px-2 py-1 rounded mb-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="namaKontak" className="block mb-1">
              Tanggal Entry
            </label>
            <input
              type="text"
              id="namaKontak"
              name="namaKontak"
              className="border border-gray-300 px-2 py-1 rounded mb-2 w-full"
            />
          </div>
        </div>
      )}

      {/* Tabel pengguna */}
      <table className="items-center w-full bg-white border-collapse">
        <thead className="bg-blueGray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              No
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Nama Pengguna
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Kabupaten
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Username
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Password
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
              1
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              Sarah Johnson
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              Jakarta
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              sarahj123
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {showPassword ? "**********" : <span className="text-blue-500 cursor-pointer" onClick={toggleShowPassword}>Show Password</span>}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              <button className="bg-blueGray-700 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2">Edit</button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Delete</button>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
              2
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              Muhammad Ali
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              Bandung
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              muhammadali321
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {showPassword ? "**********" : <span className="text-blue-500 cursor-pointer" onClick={toggleShowPassword}>Show Password</span>}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              <button className="bg-blueGray-700 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2">Edit</button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Delete</button>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
              3
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              Emily Smith
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              Surabaya
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              emilysmith456
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {showPassword ? "**********" : <span className="text-blue-500 cursor-pointer" onClick={toggleShowPassword}>Show Password</span>}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              <button className="bg-blueGray-700 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2">Edit</button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Delete</button>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
              4
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              David Brown
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              Yogyakarta
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              davidbrown789
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {showPassword ? "**********" : <span className="text-blue-500 cursor-pointer" onClick={toggleShowPassword}>Show Password</span>}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              <button className="bg-blueGray-700 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2">Edit</button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Delete</button>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
              5
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              Maria Rodriguez
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              Jakarta
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              mariarod123
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {showPassword ? "**********" : <span className="text-blue-500 cursor-pointer" onClick={toggleShowPassword}>Show Password</span>}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              <button className="bg-blueGray-700 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2">Edit</button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

