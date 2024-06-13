import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
const axios = require("axios");

export default function TableLaporan({ color }) {
  const router = useRouter();
  const [laporan, setLaporan] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    const fetchLaporan = async () => {
        try {
            const response = await axios.get("http://localhost:8000/menampilkan_laporan");
            setLaporan, setData (response.data);
        } catch (error) {
            console.error(error);
        }
    };
    
    fetchLaporan();
  }, []);

  const handleButtonExportClick = () => {
    console.log(`Export ke Excel`);
  };

  const handleButtonTambahClick = () => {
    router.push('/admin/laporan/InsertLaporan');
  };

  const handleButtonDetailClick = () => {
    router.push('/admin/laporan/DetailLaporan');
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="overflow-x-auto">
          <div className="rounded-t bg-white mb-1 px-6 py-6 border-2">
            <div className="flex justify-between items-center">
              <div className="relative w-full px-3 max-w-full flex-grow flex-1">
                <h6 className="text-green-700 text-xl font-bold">
                  TPT | IK RT | IK NON-RT | TERDUGA
                </h6>
              </div>
              <div className="flex justify-end mr-2">
                <button type="button" onClick={handleButtonTambahClick} className="bg-green-600 text-white font-medium py-1 px-3 rounded mr-2">
                  Tambah Laporan
                </button>
                <button type="button" onClick={handleButtonDetailClick} className="bg-orange-500 text-white font-medium py-1 px-3 rounded mr-2">
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
                  style={{ width: "40px" }}
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  No
                </th>
                <th
                  style={{ width: "120px" }}
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Nama Kader
                </th>
                <th
                  style={{ width: "120px" }}
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Kabupaten/Kota
                </th>
                <th
                  style={{ width: "120px" }}
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Kecamatan
                </th>
                <th
                  style={{ width: "60px" }}
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  TPT
                </th>
                <th
                  style={{ width: "100px" }}
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  IK RT
                </th>
                <th
                  style={{ width: "100px" }}
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  IK NON-RT
                </th>
                <th
                  style={{ width: "50px" }}
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Ternotifikasi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {[...laporan, ...currentItems].map((item, index) => (
                <tr key={index}>
                  <td style={{ width: "40px" }} className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-900">{index + 1}</td>
                  <td style={{ width: "120px" }} className="px-7 py-4 whitespace-nowrap text-center text-sm text-gray-800">{item.Nama_Kader}</td>
                  <td style={{ width: "120px" }} className="px-7 py-4 whitespace-nowrap text-center text-sm text-gray-800">{item.Kabupaten_Kota}</td>
                  <td style={{ width: "120px" }} className="px-7 py-4 whitespace-nowrap text-center text-sm text-gray-800">{item.Kecamatan}</td>
                  <td style={{ width: "60px" }} className="px-10 py-4 whitespace-nowrap text-center text-sm text-gray-800">{item.TPT}</td>
                  <td style={{ width: "100px" }} className="px-10 py-4 whitespace-nowrap text-center text-sm text-gray-800">{item.IK}</td>
                  <td style={{ width: "100px" }} className="px-10 py-4 whitespace-nowrap text-center text-sm text-gray-800">{item.IK_Nonrt}</td>
                  <td style={{ width: "50px" }} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{item.Ternotifikasi}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-black py-2 px-4 rounded-l"
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
            key={index}
            className={`bg-${currentPage === index + 1 ? 'blueGray-200' : 'blue-500'} hover:bg-blue-700 text-green-500 py-2 px-4 rounded mr-2 ${currentPage === index + 1 ? 'text-blueGray-700 font-bold' : ''}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
            </button>
          ))}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-black py-2 px-4 rounded-r"
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        </div>
      </div>
    </>
  );
}
