import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";


export default function TableIK({ color }) {
  const router = useRouter();
  const [laporan, setLaporan] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const [totalPages, setTotalPages] = useState(1);
  const apiUrl = "http://localhost:8000/menampilkan_status_ik_belum";
  const [filterKota, setFilterKota] = useState("All");
  const [kotaData, setKotaData] = useState([]);

  useEffect(() => {
    const fetchKotaData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/filter-options');
        setKotaData(response.data.kota);
      } catch (error) {
        console.error(error);
      }
    };

    fetchKotaData();
  }, []);

  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        const response = await axios.get(apiUrl, {
          params: { kota: filterKota },
        });
        const data = response.data.data_belumik || [];
        const totalItems = data.length;
        setLaporan(data);
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchLaporan();
  }, [filterKota]);

  const handleFilterChange = (event) => {
    setFilterKota(event.target.value);
  };

  const handleButtonLihatClick = (personId) => {
    router.push({
      pathname: '/admin/laporan/DetailIK',
      query: { personId },
    });
  };

  const handleButtonExportClick = async () => {
    try {
      const response = await axios.get("http://localhost:8000/export_excel", {
        params: { kota: filterKota },
      });
      const data = response.data;

      // Convert JSON to Excel
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");

      // Export Excel file
      XLSX.writeFile(workbook, "Laporan_Belum_IK.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handleBackClick = () => {
    router.push('/admin/laporan');
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentItems = laporan.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="overflow-x-auto">
          <div className="rounded-t bg-white mb-1 px-6 py-6 border-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-left">
                <FontAwesomeIcon icon={faCircleChevronLeft} className="cursor-pointer text-green-700 text-xl mr-2" onClick={handleBackClick} />
                <h6 className="text-green-700 text-xl font-bold">
                  Laporan Belum IK
                </h6>
              </div>
              <div className="relative w-full px-3 max-w-full flex-grow flex-1 text-right">
          <div className="inline-block">
            <select
              id="filterKota"
              name="filterKota"
              className="mt-1 block w-full py-2 px-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={filterKota}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              {kotaData.map((kota) => (
                <option key={kota.nama} value={kota.nama}>{kota.nama}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
          <table className="items-center w-full bg-white border-collapse">
            <thead className="bg-blueGray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider">
                  Person ID
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider">
                  Kecamatan
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider">
                  Kota
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider">
                  Fasyankes
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider">
                  Alamat
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-900">{indexOfFirstItem + index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{item.person_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{item.nama}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{item.kecamatan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{item.kota}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{item.fasyankes}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{item.alamat}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
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
      <div className="flex justify-end mr-2">
        <a type="button" onClick={handleButtonExportClick} className="bg-blueGray-700 text-white font-medium py-1 px-3 rounded mr-2">
          Export Excel
        </a>
      </div>
    </>
  );
}
