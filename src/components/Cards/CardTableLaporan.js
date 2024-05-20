import React, { useState } from "react";
import { useRouter } from 'next/router';

export default function TableLaporan({ color }) {
  const router = useRouter();
  const handleButtonExportClick = () => {
    console.log(`Export ke Excel`);
  };

  const handleButtonTambahClick = () => {
    router.push('/admin/laporan/InsertLaporan');
  };

  const handleButtonDetailClick = () => {
    router.push('/admin/laporan/DetailLaporan');
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="overflow-x-auto">
          <div className="rounded-t bg-white mb-1 px-6 py-6 border-2">
            <div className="flex justify-between items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h6 className="text-green-700 text-xl font-bold">
                  Laporan
                </h6>
              </div>
              <div className="flex justify-end mr-2">
                <button type="button" onClick={handleButtonTambahClick} className="bg-green-600 text-white font-medium py-1 px-3 rounded mr-2">
                  Tambah Laporan
                </button>
                <button type="button" onClick={handleButtonDetailClick} className="bg-green-600 text-white font-medium py-1 px-3 rounded mr-2">
                  Detail Laporan
                </button>
              </div>
            </div>
          </div>

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
                  Nama Kader
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Kabupaten/Kota
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Bulan
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  TPT
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Sudah IK
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Belum IK
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Ternotifikasi
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
                  Januari
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  100
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  80
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  20
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  50
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-900">
                  2
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  Kader B
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  Kota B
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  Februari
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  120
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  100
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  20
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  70
                </td>
              </tr>
              {/* Tambahkan baris data lainnya sesuai kebutuhan */}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end mr-2">
              <a type="button" onClick={handleButtonExportClick} className="bg-blueGray-700 text-white font-medium py-1 px-3 rounded mr-2">
                  Export Excel
              </a>
      </div>
    </>
  );
}
