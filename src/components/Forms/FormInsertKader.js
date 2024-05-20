import React, { useState } from "react";
import { useRouter } from 'next/router';
import axios from 'axios';

const initialFormData = {
  no_induk: '', 
  no_urut: '', 
  nama: '',
  jenis_kelamin: '',
  no_telp: '',
  alamat: '',
  id_kecamatan: '',
  provinsi: '',
  kota: ''
};

export default function InsertKader() {
  const [formData, setFormData] = useState(initialFormData);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm("Apakah anda yakin ingin menambahkan data kader?");
    if (confirmation) {
      try {
        const response = await axios.post('http://localhost:8000/kader', formData);
        console.log(response.data); // Menampilkan respon dari server
        setFormData(initialFormData);
        router.push('/admin/kader/');
      } catch (error) {
        console.error('Error creating account:', error);
      }
    } else {
      console.log("Menambahkan data gagal.");
    }
  };

  const handleButtonKembaliClick = () => {
    router.push('/admin/kader/');
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-green-700 text-xl font-bold">
              Tambah Anggota Kader
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
                    type="text" id="provinsi" name="provinsi" value={formData.provinsi} onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="kota">
                    Kota
                  </label>
                  <input
                    type="text" id="kota" name="kota" value={formData.kota} onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="id_kecamatan">
                    ID Kecamatan
                  </label>
                  <input
                    type="text" id="id_kecamatan" name="id_kecamatan" value={formData.id_kecamatan} onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="no_urut">
                    No Urut
                  </label>
                  <input
                    type="text" id="no_urut" name="no_urut" value={formData.no_urut} onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="nama">
                    Nama
                  </label>
                  <input
                    type="text" id="nama" name="nama" value={formData.nama} onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="no_induk">
                    Nomor Induk Anggota
                  </label>
                  <input
                    type="text" id="no_induk" name="no_induk" value={formData.no_induk} onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="jenis_kelamin">
                    Jenis Kelamin
                  </label>
                  <select
                    id="jenis_kelamin" name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="no_telp">
                    Nomor Telepon
                  </label>
                  <input
                    type="text" id="no_telp" name="no_telp" value={formData.no_telp} onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="alamat">
                    Alamat
                  </label>
                  <input
                    type="text" id="alamat" name="alamat" value={formData.alamat} onChange={handleChange}
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
