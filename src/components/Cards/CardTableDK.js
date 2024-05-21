import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from 'axios';

export default function TableDK() {
  const [filterKota, setFilterKota] = useState("All");
  const [kaderData, setKaderData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Panggil endpoint GET kader saat komponen dimuat
    fetchKaderData();
  }, []);

  const fetchKaderData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/kader');
      setKaderData(response.data);
    } catch (error) {
      console.error('Error fetching kader data:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilterKota(e.target.value);
  };

  const handleTambahKader = () => {
    router.push('/admin/kader/InsertKader');
  };

  const handleEditKader = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/kader/${id}`);
      const dataToEdit = response.data;
      router.push({
        pathname: `kader/EditKader/`,
        query: { id: id },
      });
    } catch (error) {
      console.error("Error navigating to edit page:", error);
      // Tambahkan penanganan kesalahan di sini, misalnya tampilkan pesan kesalahan kepada pengguna
    }
  };
  

  const handleButtonTambahClick = () => {
    router.push('/components/Forms/FormUploadKTA');
  };

  const handleLihatKTA = () => {
    router.push('kader/KTA');
  };

  const handleButtonHapus = async (id) => {
    const confirmation = window.confirm("Apakah anda yakin ingin menghapus data?");
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:8000/kader/${id}`);
        // Update kembali data setelah hapus
        fetchKaderData();
        console.log("Data kader berhasil dihapus");
      } catch (error) {
        console.error('Error deleting kader data:', error);
      }
    } else {
      console.log("Hapus data kader dibatalkan.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-4 shadow-lg rounded-lg bg-white border-1">
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
                <a type="button" onClick={handleTambahKader} className="bg-green-600 text-white font-medium py-1 px-3 rounded mr-2">
                  Tambah Kader
                </a>
              </div>
            </div>
          </div>
        </div>

        <table className="items-center w-full bg-white border-collapse">
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
                No Telepon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Alamat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                No Urut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                ID Kecamatan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Kota
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Provinsi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium                     text-gray-700 uppercase tracking-wider">
                Aksi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                KTA
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {kaderData
              .filter((kader) => filterKota === "All" || kader.kota === filterKota)
              .map((kader, index) => (
                <tr key={kader.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.no_induk}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.nama}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.jenis_kelamin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.no_telp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.alamat}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.no_urut}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.id_kecamatan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.kota}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{kader.provinsi}</td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    <button onClick={() => handleEditKader(kader.id)} className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Ubah
                    </button>
                    <button onClick={() => handleButtonHapus(kader.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Hapus
                    </button>
                  </td>
                  <td>
                    <div>
                      <button
                        type="button"
                        onClick={handleLihatKTA}
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

