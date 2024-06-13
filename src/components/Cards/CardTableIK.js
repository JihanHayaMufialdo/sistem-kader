import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
const axios = require("axios");

export default function TableIK({ color }) {
  const router = useRouter();
  const [laporan, setLaporan] = useState([]);
  const [totalBelumIK, setTotalBelumIK] = useState([]);
  const [totalBelumIKUnknown, setTotalBelumIKUnknown] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const totalPages = Math.ceil(laporan.length / itemsPerPage);

  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        const response = await axios.get("http://localhost:8000/total_laporan_sudah_ik_Perwilayah");
        setLaporan(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLaporan();
  }, []);

  useEffect(() => {
    const fetchBelumIKData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/menampilkan_status_ik");
        const dataBelumIK = response.data.pembagian_kota.total_belumik_by_city || [];
        
        // Separate data with known and unknown kota
        const knownKota = dataBelumIK.filter(item => item.kota);
        const unknownKotaCount = dataBelumIK.reduce((acc, item) => {
          return item.kota ? acc : acc + item.total_belumik;
        }, 0);
        
        setTotalBelumIK(knownKota);
        setTotalBelumIKUnknown(unknownKotaCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBelumIKData();
  }, []);

  const handleButtonDetailClick = () => {
    router.push('/admin/laporan/DetailIK');
  };

  const handleButtonLihatClick = (kota) => {
    router.push({
        pathname: '/admin/laporan/DetailIK',
        query: { kota },
    });
  };

  const handleButtonExportClick = () => {
    console.log(`Export ke Excel`);
  };

  const handleButtonTambahClick = () => {
    router.push('/admin/laporan/InsertLaporan');
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = laporan.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total count for "Belum IK"
  const totalBelumIKCount = totalBelumIK.reduce((acc, item) => acc + item.total_belumik, 0) + totalBelumIKUnknown;

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="overflow-x-auto">
          <div className="rounded-t bg-white mb-1 px-6 py-6 border-2">
            <div className="flex justify-between items-center">
              <div className="relative w-full px-3 max-w-full flex-grow flex-1">
                <h6 className="text-green-700 text-xl font-bold">
                  Belum IK
                </h6>
              </div>
              <div className="flex justify-end mr-2">
                <button type="button" onClick={handleButtonTambahClick} className="bg-green-600 text-white font-medium py-1 px-3 rounded mr-2">
                  Tambah Laporan
                </button>
                <button type="button" onClick={handleButtonDetailClick} className="bg-green-600 text-white font-medium py-1 px-3 rounded mr-2">
                  Detail Belum IK
                </button>
              </div>
            </div>
          </div>

          {/* Tabel Laporan IK */}
          <table className="items-center w-full bg-white border-collapse">
            <thead className="bg-blueGray-50">
              <tr>
                <th
                  style={{ width: "40px" }}
                  scope="col"
                  className="px-4 py-2 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  No
                </th>
                <th
                  style={{ width: "120px" }}
                  scope="col"
                  className="px-4 py-2 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Kabupaten/Kota
                </th>
                <th
                  style={{ width: "100px" }}
                  scope="col"
                  className="px-4 py-2 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Total Belum IK
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((item, index) => {
                const belumIKData = totalBelumIK?.find(bel => bel.kota === item.Kabupaten_Kota);
                const totalBelumIKCount = belumIKData ? belumIKData.total_belumik : 0;
                return (
                  <tr key={index}>
                    <td style={{ width: "40px" }} className="px-2 py-2 whitespace-nowrap text-center text-sm font-semibold text-gray-900">{index + 1}</td>
                    <td style={{ width: "120px" }} className="px-2 py-2 whitespace-nowrap text-center text-sm font-semibold text-gray-800">{item.Kabupaten_Kota}</td>
                    <td style={{ width: "100px" }} className="px-2 py-2 whitespace-nowrap text-center text-sm font-semibold text-gray-800">{totalBelumIKCount}</td>
                  </tr>
                );
              })}
              <tr>
                <td style={{ width: "40px" }} className="px-2 py-2 whitespace-nowrap text-center text-sm font-bold text-gray-900">N/A</td>
                <td style={{ width: "120px" }} className="px-2 py-2 whitespace-nowrap text-center text-sm font-semibold text-gray-800">Kabupaten Pasien Tidak Diketahui</td>
                <td style={{ width: "100px" }} className="px-2 py-2 whitespace-nowrap text-center text-sm font-semibold text-gray-800">{totalBelumIKUnknown}</td>
              </tr>
              <tr className="bg-gray-200">
                <td colSpan="3" className="px-4 py-2 whitespace-nowrap text-center text-m font-bold text-gray-900">
                  Total Belum IK: {totalBelumIKCount}
                </td>
              </tr>
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
