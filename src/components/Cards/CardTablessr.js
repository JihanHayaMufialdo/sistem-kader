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

export default function TableSSR() {

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();
  const handleButtonTambahClick = () => {
    router.push('/admin/ssr/tambah/');
  };

  const handleButtonUbahClick = () => {
    router.push('/admin/ssr/edit/');
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
                <a type="button" onClick={handleButtonTambahClick} className="bg-green-600 text-white font-medium py-1 px-3 rounded mr-8">
                  Tambah Akun
                </a>
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

