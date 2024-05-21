import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function EditKader() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    no_urut: "",
    nama: "",
    no_induk: "",
    jenis_kelamin: "",
    no_telp: "",
    alamat: "",
    id_kecamatan: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8000/kader/${id}`);
          const dataToEdit = response.data;
          setFormData({
            no_urut: dataToEdit.no_urut,
            nama: dataToEdit.nama,
            no_induk: dataToEdit.no_induk,
            jenis_kelamin: dataToEdit.jenis_kelamin,
            no_telp: dataToEdit.no_telp,
            alamat: dataToEdit.alamat,
            id_kecamatan: dataToEdit.id_kecamatan,
          });
        }
      } catch (error) {
        console.error("Error fetching data for edit:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`${name}: ${value}`); // Menambahkan log untuk memeriksa nilai yang diubah
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log('Data yang dikirim:', formData); // Tambahkan log ini
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
        alert("Error updating data");
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
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap mt-3">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="no_urut">
                    No Urut
                  </label>
                  <input
                    type="text"
                    id="no_urut"
                    name="no_urut"
                    value={formData.no_urut}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
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
                    name="jenis_kelamin"
                    value={formData.jenis_kelamin}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
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
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="alamat">
                    Alamat
                  </label>
                  <input
                    type="text"
                    id="alamat"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="id_kecamatan">
                    ID Kecamatan
                  </label>
                  <input
                    type="text"
                    id="id_kecamatan"
                    name="id_kecamatan"
                    value={formData.id_kecamatan}
                    onChange={handleChange}
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

