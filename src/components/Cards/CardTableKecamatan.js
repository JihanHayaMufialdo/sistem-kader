import React from "react"; 
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

export default function TableKecamatan() {

    const router = useRouter();
    const handleButtonTambahClick = () => {
        router.push('/admin/kota/kecamatan/tambah/');
    };
    const handleButtonUbahClick = () => {
        router.push('/admin/kota/kecamatan/edit/');
    };
    const handleButtonKembaliClick = () => {
        router.push('/admin/kota/');
    };

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="overflow-x-auto">
                    <div className="rounded-t bg-white mb-1 px-6 py-6 border-2">
                        <div className="flex justify-between items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h6 className="text-green-700 text-xl font-bold">
                                    Daftar Kecamatan
                                </h6>
                            </div>
                            <div className="flex justify-end mr-2">
                                <a type="button" onClick={handleButtonTambahClick} className="bg-green-600 text-white font-medium py-1 px-3 rounded mr-3">
                                    Tambah Kecamatan
                                </a>
                            </div>
                        </div>
                    </div>

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
                                    Provinsi 
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
                                    Kode Kecamatan
                                </th>
                                <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                                >
                                    Kecamatan
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
                                    Lampung
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                                    Lampung Selatan
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                                    03
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                                    Gedong Tataan
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
            <div className="text-center flex justify-end mr-3 mt-3">
                <a
                className="bg-blueGray-400 mr-12 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleButtonKembaliClick}
                >
                Kembali
                </a>
            </div>
        </>
    );
}

