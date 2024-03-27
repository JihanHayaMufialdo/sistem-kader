import React from "react";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function NewPage({ color }) {
  const router = useRouter();

  const handleButtonUbahClick = () => {
    router.push('/admin/laporan/UbahDetail');
  };
  
  const handleDeleteClick = () => {
    const confirmation = window.confirm("Apakah anda yakin ingin menghapus laporan?");
    if (confirmation) {
      // Handle positive confirmation (account creation logic)
      // console.log("Creating account...");
    } else {
      // Handle negative confirmation (do nothing)
      // console.log("Account creation cancelled.");
    }
  };

  const handleBackClick = () => {
    router.push('/admin/laporan');
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="overflow-x-auto">
          <div className="rounded-t bg-white mb-1 px-6 py-6 border-2">
            <div className="flex justify-between items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <div className="flex items-center justify-left"> {/* Menggunakan justify-center untuk memusatkan judul */}
                  <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer text-green-700 text-xl mr-2" onClick={handleBackClick} />
                  <h6 className="text-green-700 text-xl font-bold">
                    Detail Laporan
                  </h6>
                </div>
              </div>
            </div>
          </div>

          {/* Tabel Laporan */}
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
                  Kota
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Jenis Laporan
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Tanggal Kegiatan
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Nama Kontak
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Tanggal Entry
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
                  Laporan X
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  2024-03-25
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  Kontak X
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  2024-03-25
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  <button onClick={() => handleButtonUbahClick()} className="bg-blueGray-400 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded mr-2">
                    Ubah
                  </button>
                  <button onClick={() => handleDeleteClick(1)} className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded">
                    Hapus
                  </button>
                </td>
              </tr>
              {/* Tambahkan baris data lainnya sesuai kebutuhan */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
