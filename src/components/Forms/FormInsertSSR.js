import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
const axios = require('axios');

// Initial form data
const initialFormData = {
  nama: '',
  kota_kabupaten: '',
  nama_pengguna: '',
  kata_sandi: '',
  role: '',
};

export default function FormInsertSSR() {
  const [formData, setFormData] = useState(initialFormData);
  const [kotaKabupatenList, setKotaKabupatenList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchKotaKabupaten = async () => {
      try {
        const response = await axios.get('http://localhost:8000/nama-kota');
        setKotaKabupatenList(response.data);
      } catch (error) {
        console.error('Error fetching kota/kabupaten:', error);
        setError('Failed to load kota/kabupaten data');
      }
    };
    fetchKotaKabupaten();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm("Apakah anda yakin ingin menambahkan akun?");
    if (confirmation) {
      try {
        const response = await axios.post('http://localhost:8000/akun', formData);
        console.log(response.data); // Menampilkan respon dari server
      } catch (error) {
        console.error('Error creating account:', error);
      }
      setFormData(initialFormData);
    } else {
      console.log("Account creation cancelled.");
    }
  };

  const router = useRouter();
  const handleButtonKembaliClick = () => {
    router.push('/admin/ssr/');
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-green-700 text-xl font-bold">
              Tambah Akun SSR
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap mt-3">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="selectKotaKabupaten">
                    Kota/Kabupaten
                  </label>
                  <select
                    id="selectKotaKabupaten"
                    name="kota_kabupaten"
                    value={formData.kota_kabupaten}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="">Pilih Kota/Kabupaten</option>
                    {kotaKabupatenList.map((kota) => (
                      <option key={kota.nama_kota} value={kota.nama_kota}>
                        {kota.nama_kota}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="selectNama">
                    Nama
                  </label>
                  <input
                    type="text" id="nama" name="nama" value={formData.nama} onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="selectRole">
                    Role
                  </label>
                  <select
                    id="selectRole"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="">Pilih Role</option>
                    <option value="Admin">Admin</option>
                    <option value="SSR">SSR</option>
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="selectNamaPengguna">
                    Nama Pengguna
                  </label>
                  <input
                    type="text" id="username" name="nama_pengguna" value={formData.nama_pengguna} onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="selectPassword">
                    Kata Sandi
                  </label>
                  <input
                    type="password" id="password" name="kata_sandi" value={formData.kata_sandi} onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
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
