import { useRouter } from 'next/router';
import React, { useState } from 'react';
import axios from 'axios';

const initialFormData = {
  nama_provinsi: '',
  kode_provinsi: '',
  nama_kota: '',
  kode_kota: '',
  nama_kecamatan: '',
  kode_kecamatan: ''
};

export default function FormTambahKota() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm("Apakah anda yakin ingin menambahkan kota?");
    if (confirmation) {
      try {
        const response = await axios.post('http://localhost:8000/tambah-data', formData);
        console.log(response.data); // Menampilkan respon dari server
        setFormData(initialFormData);
        router.push('/admin/kota/');
      } catch (error) {
        console.error('Error creating kota:', error);
      }
    }
  };

  const handleButtonKembaliClick = () => {
    router.push('/admin/kota/');
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-green-700 text-xl font-bold">
              Tambah Kota/Kabupaten
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap mt-3">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="provinsi">
                    Provinsi
                  </label>
                  <input
                    type="text"
                    id="provinsi"
                    name="nama_provinsi"
                    value={formData.nama_provinsi}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="kode_kota">
                    Kota/Kabupaten
                  </label>
                  <input
                    type="text"
                    id="nama_kota"
                    name="nama_kota"
                    value={formData.nama_kota}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="kode_kota">
                    Kecamatan
                  </label>
                  <input
                    type="text"
                    id="nama_kecamatan"
                    name="nama_kecamatan"
                    value={formData.nama_kecamatan}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="nama_kota">
                    Kode Provinsi
                  </label>
                  <input
                    type="text"
                    id="kode_provinsi"
                    name="kode_provinsi"
                    value={formData.kode_provinsi}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="nama_kota">
                  kode Kota
                  </label>
                  <input
                    type="text"
                    id="kode_kota"
                    name="kode_kota"
                    value={formData.kode_kota}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="nama_kota">
                    Kode Kecamatan
                  </label>
                  <input
                    type="text"
                    id="kode_kecamatan"
                    name="kode_kecamatan"
                    value={formData.kode_kecamatan}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
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
                Kembali
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
