import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";

export default function FormEditKecamatan() {
  const router = useRouter();
  const { nama_kecamatan, id_kota } = router.query;

  const [kecamatan, setKecamatan] = useState({
    kode_kecamatan: "",
    nama_kecamatan: "",
    id_kota: ""
  });

  useEffect(() => {
    if (nama_kecamatan && id_kota) {
      fetchData(nama_kecamatan, id_kota);
    }
  }, [nama_kecamatan, id_kota]);

  const fetchData = async (nama_kecamatan, id_kota) => {
    try {
      const response = await axios.get(`http://localhost:8000/kecamatan-by-nama/${nama_kecamatan}/${id_kota}`);
      const data = response.data;
      setKecamatan(data);
    } catch (error) {
      console.error("Error fetching kecamatan data for edit:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKecamatan((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/kecamatan/${kecamatan.id}`, kecamatan);
      alert("Kecamatan updated successfully");
      router.back(); // Kembali ke halaman sebelumnya
    } catch (error) {
      console.error("Error updating kecamatan:", error);
      alert("Error updating kecamatan");
    }
  };

  const handleButtonKembaliClick = () => {
    router.back();
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-green-700 text-xl font-bold">
              Edit Kecamatan
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form className="flex flex-wrap mt-3" onSubmit={handleSubmit}>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="kode_kecamatan">
                  Kode Kecamatan
                </label>
                <input
                  type="text"
                  id="kode_kecamatan"
                  name="kode_kecamatan"
                  value={kecamatan.kode_kecamatan}
                  onChange={handleChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="nama_kecamatan">
                  Kecamatan
                </label>
                <input
                  type="text"
                  id="nama_kecamatan"
                  name="nama_kecamatan"
                  value={kecamatan.nama_kecamatan}
                  onChange={handleChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="text-center flex justify-end mr-3 mt-3 w-full">
              <button
                className="bg-green-700 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ml-auto"
                type="submit"
              >
                Simpan
              </button>
              <button
                className="bg-blueGray-400 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleButtonKembaliClick}
              >
                Batal 
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
