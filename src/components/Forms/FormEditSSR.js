import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function FormEditSSR() {
  const router = useRouter();
  const { nama_pengguna } = router.query;
  const [kotaKabupatenList, setKotaKabupatenList] = useState([]);


  const [formData, setFormData] = useState({
    nama: "",
    kota_kabupaten: "",
    nama_pengguna: "",
    kata_sandi: "",
    role: "", 
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (nama_pengguna) {
          const response = await axios.get(`http://localhost:8000/akun/${nama_pengguna}`);
          const dataToEdit = response.data;
          setFormData({
            nama: dataToEdit.nama,
            kota_kabupaten: dataToEdit.kota_kabupaten,
            nama_pengguna: dataToEdit.nama_pengguna,
            role: dataToEdit.role,
          });
        }
      } catch (error) {
        console.error("Error fetching data for edit:", error);
      }
    };
    fetchData();
  }, [nama_pengguna]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.put(`http://localhost:8000/akun/${formData.nama_pengguna}`, formData);
    if (response.status === 200) {
      alert("Data updated successfully");
      router.push("/admin/ssr"); // Redirect ke halaman lain setelah perubahan berhasil
    } else {
      throw new Error("Error updating data");
    }
  } catch (error) {
    console.error("Error updating data:", error);
    alert("Error updating data");
  }
};

  const handleButtonKembaliClick = () => {
    router.push('/admin/ssr/');
};

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


  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-green-700 text-xl font-bold">Edit Data Akun SSR</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap mt-3">
              <div className="w-full lg:w-6/12 px-4">
               <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="selectKotaKabupaten">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={formData.nama}
                    onChange={handleChange}
                  />
                </div>
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
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="SSR">SSR</option>
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
               <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Nama Pengguna
                  </label>
                  <input
                    type="text"
                    id="nama_pengguna"
                    name="nama_pengguna"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={formData.nama_pengguna}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    id="kata_sandi"
                    name="kata_sandi"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={formData.kata_sandi}
                    onChange={handleChange}
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
