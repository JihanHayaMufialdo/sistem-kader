import React from "react";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function NewPage({ color }) {
  const router = useRouter();

  const handleButtonSimpanClick = () => {
    const confirmation = window.confirm("Apakah anda yakin dengan perubahan data?");
    if (confirmation) {
      // Handle positive confirmation (account creation logic)
      // console.log("Creating account...");
    } else {
      // Handle negative confirmation (do nothing)
      // console.log("Account creation cancelled.");
    }
  };

  const handleButtonEditClick = () => {
    const confirmation = window.confirm("Apakah anda ingin mengubah data laporan?");
    if (confirmation) {
      // Handle positive confirmation (account creation logic)
      // console.log("Creating account...");
    } else {
      // Handle negative confirmation (do nothing)
      // console.log("Account creation cancelled.");
    }
  };

  const handleBackClick = () => {
    router.push('/admin/laporan/DetailLaporan');
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
                    Edit Detail Laporan
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
                  Nama Kader
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-900">
                  Kader A
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
              </tr>
              {/* Tambahkan baris data lainnya sesuai kebutuhan */}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-center flex justify-end mr-3 mt-3">
              <buttonUbah
                className="bg-red-600 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="submit"
                onClick={handleButtonEditClick}
              >
                Ubah
              </buttonUbah>
              <buttonsimpan
                className="bg-green-700 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="submit"
                onClick={handleButtonSimpanClick}
              >
                Simpan
              </buttonsimpan>
            </div>
    </>
  );
}
