import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from 'axios';

export default function TableDK() {
  const [filterProvinsi, setFilterProvinsi] = useState("All");
  const [filterKabupaten, setFilterKabupaten] = useState("All");
  const [filterKecamatan, setFilterKecamatan] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [kaderData, setKaderData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [provinsiData, setProvinsiData] = useState([]);
  const [kabupatenData, setKabupatenData] = useState([]);
  const [kecamatanData, setKecamatanData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const router = useRouter();
  const itemsPerPage = 25;
  const totalPages = Math.ceil(kaderData.length / itemsPerPage);

  useEffect(() => {
    fetchProvinsiData();
    fetchKabupatenData(); // Untuk mengambil semua kabupaten
    fetchKecamatanData(); // Untuk mengambil semua kecamatan
  }, []);

  useEffect(() => {
    fetchKaderData();
    fetchProvinsiData();
  }, []);

  const fetchKaderData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/kader');
      setKaderData(response.data);
    } catch (error) {
      console.error('Error fetching kader data:', error);
    }
  };

  
  const fetchProvinsiData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/filter-options');
      setProvinsiData(response.data.provinsi);
    } catch (error) {
      console.error('Error fetching provinsi data:', error);
    }
  };
  
  const fetchKabupatenData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/filter-options');
      setKabupatenData(response.data.kota);
    } catch (error) {
      console.error('Error fetching kabupaten data:', error);
    }
  };
  
  const fetchKecamatanData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/filter-options');
      setKecamatanData(response.data.kecamatan);
    } catch (error) {
      console.error('Error fetching kecamatan data:', error);
    }
  };
  

  const handleFilterChange = async (e) => {
    const { name, value } = e.target;
    if (name === 'filterProvinsi') {
      setFilterProvinsi(value);
      setFilterKabupaten('All');
      setFilterKecamatan('All');
      if (value !== 'All') {
        await fetchKabupatenData(value);
      } else {
        setKabupatenData([]);
        setKecamatanData([]);
      }
    } else if (name === 'filterKabupaten') {
      setFilterKabupaten(value);
      setFilterKecamatan('All');
      if (value !== 'All') {
        await fetchKecamatanData(value);
      } else {
        setKecamatanData([]);
      }
    } else if (name === 'filterKecamatan') {
      setFilterKecamatan(value);
    }
      else if (name === 'filterStatus') { // Tambahkan handler untuk filter status
      setFilterStatus(value);
  }
  };
  
  // Memperbarui data kabupaten setelah mendapatkan opsi baru dari filter provinsi
  useEffect(() => {
    if (filterProvinsi !== 'All') {
      fetchKabupatenData(filterProvinsi);
    } else {
      setKabupatenData([]);
      setKecamatanData([]);
    }
  }, [filterProvinsi]);
  
  // Memperbarui data kecamatan setelah mendapatkan opsi baru dari filter kabupaten
  useEffect(() => {
    if (filterKabupaten !== 'All') {
      fetchKecamatanData(filterKabupaten);
    } else {
      setKecamatanData([]);
    }
  }, [filterKabupaten]);;

  const handleSearchChange = async (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    try {
      const response = await axios.get(`http://localhost:8000/filter-kader?search=${value}`);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
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
    }
  };

  const handleButtonUnggahfoto = (id) => {
    router.push(`/ssr/kader/upload?id=${id}`);
  };

  const handleButtonKTAClick = () => {
    router.push('/ssr/kader/KTA');
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

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    let buttons = [];

    if (totalPages <= 1) return null;

    buttons.push(
      <button
        key="prev"
        className="bg-blue-500 hover:bg-blue-700 text-black py-2 px-4 rounded-l"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
    );

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`bg-${currentPage === i ? 'blueGray-200' : 'blue-500'} hover:bg-blue-700 text-green-500 py-2 px-4 rounded mr-2 ${currentPage === i ? 'text-blueGray-700 font-bold' : ''}`}
            onClick={() => goToPage(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      buttons.push(
        <button
          key={1}
          className={`bg-${currentPage === 1 ? 'blueGray-200' : 'blue-500'} hover:bg-blue-700 text-green-500 py-2 px-4 rounded mr-2 ${currentPage === 1 ? 'text-blueGray-700 font-bold' : ''}`}
          onClick={() => goToPage(1)}
        >
          1
        </button>
      );
      if (currentPage > 4) {
        buttons.push(<span key="dots1" className="py-2 px-4">...</span>);
      }
      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);
      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            className={`bg-${currentPage === i ? 'blueGray-200' : 'blue-500'} hover:bg-blue-700 text-green-500 py-2 px-4 rounded mr-2 ${currentPage === i ? 'text-blueGray-700 font-bold' : ''}`}
            onClick={() => goToPage(i)}
          >
            {i}
          </button>
        );
      }
      if (currentPage < totalPages - 3) {
        buttons.push(<span key="dots2" className="py-2 px-4">...</span>);
      }
      buttons.push(
        <button
          key={totalPages}
          className={`bg-${currentPage === totalPages ? 'blueGray-200' : 'blue-500'} hover:bg-blue-700 text-green-500 py-2 px-4 rounded mr-2 ${currentPage === totalPages ? 'text-blueGray-700 font-bold' : ''}`}
          onClick={() => goToPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        className="bg-blue-500 hover:bg-blue-700 text-black py-2 px-4 rounded-r"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    );

    return buttons;
  };

  const filteredData = kaderData.filter((kader) => {
    let filterResult = true;
  
    if (filterProvinsi !== "All" && kader.nama_provinsi !== filterProvinsi) {
      filterResult = false;
    }
  
    if (filterKabupaten !== "All" && kader.nama_kota !== filterKabupaten) {
      filterResult = false;
    }
  
    if (filterKecamatan !== "All" && kader.nama_kecamatan !== filterKecamatan) {
      filterResult = false;
    }
  
    if (filterStatus !== "All" && (filterStatus === "Active" ? kader.status !== "Aktif" : kader.status === "Aktif")) {
      filterResult = false;
    }
  
    if (searchTerm !== "" && !(
      kader.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kader.jenis_kader.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kader.jenis_kelamin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kader.nama_kecamatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kader.nama_kota.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kader.nama_provinsi.toLowerCase().includes(searchTerm.toLowerCase())
    )) {
      filterResult = false;
    }
  
    return filterResult;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  

  return (
    <div className="overflow-x-auto">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-4 shadow-lg rounded-lg bg-white border-1">
        <div className="mt-6 mx-4 mb-4 flex justify-between">
          <div className="flex space-x-4">
            <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
              <label htmlFor="filterProvinsi" className="block text-sm font-medium text-gray-700">
                Provinsi
              </label>
              <select
                id="filterProvinsi"
                name="filterProvinsi"
                className="mt-1 block w-full py-2 px-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={filterProvinsi}
                onChange={handleFilterChange}
              >
                <option value="All">All</option>
                {provinsiData.map((provinsi) => (
                  <option key={provinsi.id} value={provinsi.nama}>{provinsi.nama}</option>
                ))}
              </select>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
              <label htmlFor="filterKabupaten" className="block text-sm font-medium text-gray-700">
                Kabupaten
              </label>
              <select
                id="filterKabupaten"
                name="filterKabupaten"
                className="mt-1 block w-full py-2 px-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={filterKabupaten}
                onChange={handleFilterChange}
                disabled={filterProvinsi === "All"}
              >
                <option value="All">All</option>
                {kabupatenData.map((kabupaten) => (
                  <option key={kabupaten.id} value={kabupaten.nama}>{kabupaten.nama}</option>
                ))}
              </select>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
              <label htmlFor="filterKecamatan" className="block text-sm font-medium text-gray-700">
                Kecamatan
              </label>
              <select
                id="filterKecamatan"
                name="filterKecamatan"
                className="mt-1 block w-full py-2 px-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={filterKecamatan}
                onChange={handleFilterChange}
                disabled={filterKabupaten === "All"}
              >
                <option value="All">All</option>
                {kecamatanData.map((kecamatan) => (
                  <option key={kecamatan.id} value={kecamatan.nama}>{kecamatan.nama}</option>
                ))}
              </select>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select name="filterStatus" value={filterStatus} onChange={handleFilterChange} className="mt-1 block w-full py-2 px-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="All">Semua Status</option>
                <option value="Active">Aktif</option>
                <option value="Inactive">Tidak Aktif</option>
              </select>
            </div>
          </div>
          <div className="w-1/2 sm:w-1/2 md:w-1/4 px-2 mb-4">
            <input
              type="text"
              placeholder="Cari..."
              className="w-full mt-5 py-2 pl-10 pr-4 border border-gray-900 rounded-full leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="absolute top-0 right-0 mt-3 mr-6 lg:mt-4 lg:mr-8">
              <svg
                className="text-gray-600 h-6 lg:h-8 w-6 lg:w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 1 0-16 8         .5 8 0 0 1 0 16zm7.7-1.3l-3-3a5.5 5.5 0 1 0-.7.7l3 3a.5.5 0 0 0 .7-.7zM16 10a6 6 0 1 1-6 6 6 6 0 0 1 6-6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="rounded-t bg-white mb-1 px-3 py-3 border-collapse">
            <div className="flex justify-between items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h6 className="text-green-700 text-xl font-bold">
                  Daftar Kader ILS
                </h6>
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
              {/* <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider">
                Nomor Induk Anggota
              </th> */}
              <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider">
                Nama
              </th>
              <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider">
                Jenis Kader
              </th>
              <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider">
                Jenis Kelamin
              </th>
              {/* <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider">
                No Telepon
              </th> */}
              <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider">
                Kecamatan
              </th>
              <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider">
                Kota
              </th>
              <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider">
                Provinsi
              </th>
              <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider">
                Status Aktif
              </th>
              <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider">
                Aksi
              </th>
              <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider">
                KTA
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
          {currentItems.map((kader, index) => (
            <tr key={kader.id}>
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-900">
          {(currentPage - 1) * itemsPerPage + index + 1}
        </td>
        {/* <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{kader.no_induk}</td> */}
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{kader.nama}</td>
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{kader.jenis_kader}</td>
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{kader.jenis_kelamin}</td>
        {/* <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{kader.no_telp}</td> */}
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{kader.nama_kecamatan}</td>
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{kader.nama_kota}</td>
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{kader.nama_provinsi}</td>
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{kader.status}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
          <button onClick={() => handleEditKader(kader.id)} className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Ubah
          </button>
          <button onClick={() => handleButtonHapus(kader.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Hapus
          </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
          <button
              onClick={() => handleButtonUnggahfoto(kader.id)}
              className="ml-2 mr-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Unggah Foto
          </button>
          <button onClick={handleButtonKTAClick} className="bg-orange-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Lihat KTA
          </button>
        </td>
        </tr>
              ))}
          </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
        {renderPaginationButtons()}
      </div>
      </div>
    );
  }