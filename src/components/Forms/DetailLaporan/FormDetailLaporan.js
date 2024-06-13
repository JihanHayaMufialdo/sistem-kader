import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'; // Tambahkan impor ini
import axios from 'axios';

export default function NewPage({ color }) {
  const router = useRouter();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/filelaporan')
      .then(response => setFiles(response.data))
      .catch(error => console.error('Failed to fetch files:', error));
  }, []);

  const handleButtonUbahClick = () => {
    router.push('/admin/laporan/UbahDetail');
  };

  const handleDeleteClick = (id) => {
    const confirmation = window.confirm("Apakah anda yakin ingin menghapus laporan?");
    if (confirmation) {
      axios.delete(`http://localhost:8000/delete-file/${id}`)
        .then(response => {
          setFiles(files.filter(file => file.id !== id));
        })
        .catch(error => console.error('Failed to delete file:', error));
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
                <div className="flex items-center justify-left">
                  <FontAwesomeIcon icon={faCircleChevronLeft} className="cursor-pointer text-green-700 mr-2" onClick={handleBackClick} style={{ fontSize: '2rem' }} />
                  <h6 className="text-green-700 text-xl font-bold">
                    Detail Laporan
                  </h6>
                </div>
              </div>
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
                Nama File
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
            {files.map((file, index) => (
              <tr key={file.id}>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  {file.nama_file}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  {file.jenis_laporan}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  {new Date(file.tanggal_entry).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  <button onClick={() => handleDeleteClick(file.id)} className="bg-red-700 hover:bg-red-700 text-white font-medium py-1 px-3 rounded">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
