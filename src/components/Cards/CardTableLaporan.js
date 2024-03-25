import React, { useState } from "react"; 

export default function CardTableLaporan({ color }) {
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const handleTambahLaporan = () => {
    setShowForm(true);
  };

  const handleTutupForm = () => {
    setShowForm(false);
  };

  const handleLihatDetail = () => {
    setShowDetail(true);
  };

  const handleTutupDetail = () => {
    setShowDetail(false);
  };
  
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            {/* <EditLaporan/> */}
            <div className="overflow-x-auto">
              <div className="rounded-t mb-1 px-4 py-3 border-2">
                <div className="flex justify-between items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3
                      className={
                        "font-semibold text-2xl " +
                        (color === "light" ? "text-blueGray-700" : "text-blueGray")
                      }
                    >
                      Laporan Kader
                    </h3>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      onClick={showForm ? handleTutupForm : handleTambahLaporan}
                    >
                      {showForm ? "Tutup Form" : "Tambah Laporan"}
                    </button>
                    <button
                      className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      onClick={showDetail ? handleTutupDetail : handleLihatDetail}
                    >
                      {showDetail ? "Tutup Detail" : "Lihat Detail Laporan"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Form untuk import data dari Excel */}
              {showForm && (
                <div className="px-4 py-3 border-2 rounded mb-4">
                  <h4 className="font-semibold mb-2">Import Data from Excel</h4>
                  {/* Tambahkan elemen form di sini */}
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

              {/* Tabel laporan */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead className="bg-gray-100">
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
                      Nama Kader
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                    >
                      Kota
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                    >
                      Bulan
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                    >
                      Laporan TPT
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                    >
                      Laporan IK RT
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                    >
                      Laporan IK NonRT
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      1
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Dimas Naim
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Jakarta
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Januari 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                      Ada
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                      Tidak Ada
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                      Ada
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      2
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Murti
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Bandung
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Februari 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                      Tidak Ada
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                      Ada
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                      Tidak Ada
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      3
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Vania
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Surabaya
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Maret 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                      Ada
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                      Ada
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                      Tidak Ada
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      4
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Jihan
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Surabaya
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      April 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                      Tidak Ada
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                      Ada
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                      Ada
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      5
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Aghi
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Bandung
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Mei 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                      Ada
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                      Tidak Ada
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                      Tidak Ada
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      6
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Lidya
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Yogyakarta
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Juni 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                      Tidak Ada
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                      Ada
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                      Tidak Ada
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      7
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Anggi Putri
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Jakarta
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Juli 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                      Tidak Ada
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                      Tidak Ada
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                      Ada
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      8
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Angga Putra
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Bandung
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Agustus 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                      Tidak Ada
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                      Tidak Ada
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                      Ada
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      9
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Naura Cantika
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Jakarta
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      September 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                      Tidak Ada
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                      Ada
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                      Ada
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      10
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Vanendra
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Yogyakarta
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Oktober 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                      Tidak Ada
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                      Ada
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                      Ada
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
