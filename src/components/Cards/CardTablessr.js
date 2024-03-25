import React, { useState } from "react"; 
import { useRouter } from 'next/router';

function handleButtonHapusClick() {
  const confirmation = window.confirm("Apakah anda yakin ingin menghapus akun?");
  if (confirmation) {
    // Handle positive confirmation (account creation logic)
    // console.log("Creating account...");
  } else {
    // Handle negative confirmation (do nothing)
    // console.log("Account creation cancelled.");
  }
}

export default function TableSSR({ color }) {

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();
  const handleButtonTambahClick = () => {
    router.push('/admin/ssr/InsertSSR');
  };

  const handleButtonUbahClick = () => {
    router.push('/admin/ssr/EditSSR');
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="overflow-x-auto">
          <div className="rounded-t bg-white mb-1 px-6 py-6 border-2">
            <div className="flex justify-between items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h6 className="text-green-700 text-xl font-bold">
                  Daftar Akun
                </h6>
              </div>
              <div className="flex justify-end mr-2">
                <a type="button" onClick={handleButtonTambahClick} className="bg-green-600 text-white font-medium py-1 px-3 rounded mr-2">
                  Tambah Akun
                </a>
              </div>
            </div>
          </div>

          {/* Form untuk import data dari Excel */}
          {/* {showForm && (
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
          )} */}

          {/* Form untuk menampilkan detail laporan */}
          {/* {showDetail && (
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
          )} */}

          {/* Tabel Akun SSR */}
          <table className="items-center w-full bg-white border-collapse">
            <thead className="bg-blueGray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Nama 
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Kota/Kabupaten
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Nama Pengguna
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Kata Sandi
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-900">
                  1
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  Kader A
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  Kota A
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  kaderA
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  {showPassword ? (
                    <span className="text-blue-500 cursor-pointer" onClick={toggleShowPassword}>
                      kaderA
                    </span>
                  ) : (
                    <span className="text-blue-500 cursor-pointer" onClick={toggleShowPassword}>
                      Lihat Kata Sandi
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  <a type="button" onClick={handleButtonUbahClick} className="bg-blueGray-700 text-white font-bold py-1 px-3 rounded mr-2">
                    Ubah
                  </a>
                  <button type="submit" onClick={handleButtonHapusClick} className="bg-red-500 text-white font-bold py-1 px-3 rounded">
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

