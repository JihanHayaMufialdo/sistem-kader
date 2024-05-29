import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function EditKader() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    jenis_kader: "",
    nama: "",
    no_induk: "",
    jenis_kelamin: "",
    no_telp: "",
    id_kecamatan: "",
    nama_provinsi: "",
    nama_kota: "",
    nama_kecamatan: "",
  });

  const [jenisKaderList, setJenisKaderList] = useState([]);
  const [kecamatanList, setKecamatanList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8000/kader/${id}`);
          const dataToEdit = response.data;
          setFormData({
            jenis_kader: dataToEdit.jenis_kader,
            nama: dataToEdit.nama,
            no_induk: dataToEdit.no_induk,
            jenis_kelamin: dataToEdit.jenis_kelamin,
            no_telp: dataToEdit.no_telp,
            id_kecamatan: dataToEdit.id_kecamatan,
            nama_kecamatan: dataToEdit.nama_kecamatan,
            nama_kota: dataToEdit.nama_kota,
            nama_provinsi: dataToEdit.nama_provinsi,
          });
        }

        const response = await axios.get('http://localhost:8000/data');
        
        // Set kecamatan list
        setKecamatanList(response.data.kecamatan);
    
        // Filter duplikat jenis kader
        const uniqueJenisKader = response.data.jenisKader.reduce((acc, current) => {
          const x = acc.find(item => item.jenis_kader === current.jenis_kader);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        
        // Set jenis kader list
        setJenisKaderList(uniqueJenisKader);
    
        // Filter duplikat kecamatan
        const uniqueKecamatan = response.data.kecamatan.reduce((acc, current) => {
          const x = acc.find(item => item.nama_kecamatan === current.nama_kecamatan);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        
        // Set kecamatan list yang unik
        setKecamatanList(uniqueKecamatan);
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('Error fetching data');
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      let updatedFormData = { ...prevFormData, [name]: value };

      if (name === "id_kecamatan") {
        const selectedKecamatan = kecamatanList.find(kecamatan => kecamatan.id === parseInt(value));
        if (selectedKecamatan) {
          updatedFormData = {
            ...updatedFormData,
            nama_kota: selectedKecamatan.nama_kota,
            nama_provinsi: selectedKecamatan.nama_provinsi,
            nama_kecamatan: selectedKecamatan.nama_kecamatan
          };
        }
      }

      return updatedFormData;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/kader/${id}`, formData);
      if (response.status === 200) {
        alert("Data updated successfully");
        router.push("/ssr/kader");
      } else {
        throw new Error("Error updating data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setErrorMessage("Error updating data");
    }
  };

  const handleCancel = () => {
    router.push("/ssr/kader");
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-green-700 text-xl font-bold">Edit Data Kader</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          {errorMessage && (
            <div className="text-red-500 text-center mb-4">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap mt-3">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="jenis_kader">
                    Jenis Kader
                  </label>
                  <select
                    id="jenis_kader"
                    name="jenis_kader"
                    value={formData.jenis_kader}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    {jenisKaderList.map((jenisKader) => (
                      <option key={jenisKader.id} value={jenisKader.jenis_kader}>
                        {jenisKader.jenis_kader}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="nama">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="no_induk">
                    Nomor Induk
                  </label>
                  <input
                    type="text"
                    id="no_induk"
                    name="no_induk"
                    value={formData.no_induk}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="jenis_kelamin">
                    Jenis Kelamin
                  </label>
                  <select
                    id="jenis_kelamin"
                    value={formData.jenis_kelamin}
                    name="jenis_kelamin"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleChange}
                  >
                    <option value="P">Perempuan</option>
                    <option value="L">Laki-laki</option>
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="no_telp">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    id="no_telp"
                    name="no_telp"
                    value={formData.no_telp}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="id_kecamatan">
                    Kecamatan
                  </label>
                  <select
                    id="id_kecamatan"
                    name="id_kecamatan"
                    value={formData.id_kecamatan}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    {kecamatanList.map((kecamatan) => (
                      <option key={kecamatan.id} value={kecamatan.id}>
                        {kecamatan.nama_kecamatan}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="nama_kota">
                    Kota
                  </label>
                  <input
                    type="text"
                    id="nama_kota"
                    name="nama_kota"
                    value={formData.nama_kota}
                    onChange={handleChange}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="nama_provinsi">
                    Provinsi
                  </label>
                  <input
                    type="text"
                    id="nama_provinsi"
                    name="nama_provinsi"
                    value={formData.nama_provinsi}
                    onChange={handleChange}
                    readOnly
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>
            <div className="text-center flex justify-end mr-3 mt-3">
              <button
                className="bg-green-700 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Simpan
              </button>
              <button
                className="bg-blueGray-400 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleCancel}
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
