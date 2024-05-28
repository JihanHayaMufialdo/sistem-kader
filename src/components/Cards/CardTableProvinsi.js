import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';

export default function TableProvinsi() {
  const [provinsiData, setProvinsiData] = useState([]);
  const [deleteError, setDeleteError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProvinsiData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/provinsi');
        setProvinsiData(response.data);
      } catch (error) {
        console.error('Error fetching provinsi data:', error);
      }
    };

    fetchProvinsiData();
  }, []);

  const handleEdit = (nama_provinsi) => {
    router.push(`/admin/kota/edit-provinsi/${nama_provinsi}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus provinsi ini?')) {
      try {
        await axios.delete(`http://localhost:8000/provinsi/${id}`);
        const updatedProvinsiData = provinsiData.filter((provinsi) => provinsi.id !== id);
        setProvinsiData(updatedProvinsiData);
        alert('Provinsi berhasil dihapus.');
      } catch (error) {
        console.error('Error deleting provinsi:', error);
        setDeleteError('Masih Terdapat Kota/Kabupaten/Kecamatan dalam Provinsi.');
      }
    }
  };
  

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="overflow-x-auto">
          <div className="rounded-t bg-white mb-1 px-6 py-6 border-2">
            <div className="flex justify-between items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h6 className="text-green-700 text-xl font-bold">
                  Daftar Provinsi
                </h6>
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
                  Provinsi (Kode)
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Jumlah Kota/Kabupaten
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Jumlah Kecamatan
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
              {provinsiData.map((provinsi, index) => (
                <tr key={provinsi.id_provinsi}>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                    {provinsi.nama_provinsi} ({provinsi.kode_provinsi})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                    {provinsi.jumlah_kota}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                    {provinsi.jumlah_kecamatan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                    <button
                      type="button"
                      onClick={() => handleDelete(provinsi.id)}
                      className="bg-red-500 text-white font-medium py-1 px-3 rounded mr-2"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {deleteError && (
        <div className="bg-red-200 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
          <strong className="font-bold">Error deleting provinsi!</strong>
          <span className="block sm:inline">{deleteError}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setDeleteError('')}>&times;</span>
        </div>
      )}
    </>
  );
}
