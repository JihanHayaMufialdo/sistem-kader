import React, { useState } from "react";
import { useRouter } from "next/router";

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

export default function TableKaderSSR() {
  const [filterKota, setFilterKota] = useState("All");

  const router = useRouter();
  const handleButtonTambahClick = () => {
      router.push('/ssr/kader/tambah/');
  };
  const handleButtonUbahClick = () => {
      router.push('/ssr/kader/edit/');
  };
  const handleButtonUploadClick = () => {
      router.push('/ssr/kader/upload');
  };
  const handleButtonKTAClick = () => {
    router.push('/ssr/kader/KTA');
};


  // Dummy data for kader
  const kaderData = [
    { id: 1, nama: "Sarah Johnson", jenisKelamin: "Perempuan", usia: 25, noTelepon: "08123456789", alamat: "Jl. Contoh No. 123", kecamatan: "Contoh", kota: "Bandar Lampung", provinsi: "Lampung", username: "sarahj123" },
    { id: 2, nama: "Muhammad Ali", jenisKelamin: "Laki-laki", usia: 30, noTelepon: "087654321", alamat: "Jl. Contoh No. 456", kecamatan: "Contoh", kota: "Bandar Lampung", provinsi: "Lampung", username: "muhammadali321" },
    { id: 3, nama: "Emily Smith", jenisKelamin: "Perempuan", usia: 28, noTelepon: "08123456789", alamat: "Jl. Contoh No. 789", kecamatan: "Contoh", kota: "Bandar Lampung", provinsi: "Lampung", username: "emilysmith456" },
    { id: 4, nama: "David Brown", jenisKelamin: "Laki-laki", usia: 35, noTelepon: "087654321", alamat: "Jl. Contoh No. 1011", kecamatan: "Contoh", kota: "Bandar Lampung", provinsi: "Lampung", username: "davidbrown789" },
    { id: 5, nama: "Maria Rodriguez", jenisKelamin: "Perempuan", usia: 27, noTelepon: "08123456789", alamat: "Jl. Contoh No. 1213", kecamatan: "Contoh", kota: "Bandar Lampung", provinsi: "Lampung", username: "mariarod123" },
  ];
  

  return (
    <div className="overflow-x-auto">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-4 shadow-lg rounded-lg bg-white border-1">
        <div className="overflow-x-auto">
          <div className="rounded-t bg-white mb-1 px-3 py-3 border-collapse">
            <div className="flex justify-between items-center w-full">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h6 className="text-green-600 text-xl font-bold w-full">
                  Daftar Kader ILS Bandar Lampung
                </h6>
              </div>
              <div className="flex justify-end mr-2">
                {/* Tombol tambah kader dihapus */}
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
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                NIA
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Nama
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Jenis Kelamin
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Usia
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                No Telepon
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Alamat
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Kecamatan
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Kota
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Provinsi
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                KTA
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Aksi
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
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">{kader.id}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">{kader.nama}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">{kader.jenisKelamin}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">{kader.usia}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">{kader.noTelepon}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">{kader.alamat}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">{kader.kecamatan}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">{kader.kota}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">{kader.provinsi}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">
                    {/* Buttons for actions */}
                    <button className="mr-2 bg-yellow-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Unggah Foto
                    </button>
                    <button className="bg-orange-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Lihat KTA
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">
                    {/* Buttons for actions */}
                    <button onClick={handleButtonUbahClick}
                    className="mr-2 bg-blueGray-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Ubah
                    </button>
                    <button onClick={handleButtonHapus}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

