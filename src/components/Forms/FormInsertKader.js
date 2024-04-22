import React from "react";
import { useRouter } from 'next/router';

// Function to handle confirmation before creating account
function handleCreateData(handleSimpanDataKader) {
  const confirmation = window.confirm("Apakah anda yakin ingin menambahkan data kader?");
  if (confirmation) {
    // Handle positive confirmation (account creation logic)
    console.log("Menambahkan data...");

    // Contoh data kader baru yang akan ditambahkan, sesuaikan dengan data yang diinputkan pengguna
    const dataKaderBaru = {
      id: 16, // Atur ID secara dinamis sesuai dengan jumlah data kader saat ini
      nama: "Nama Kader Baru",
      jenisKelamin: "Laki-laki",
      tanggalLahir: "1990-01-01", // Contoh tanggal lahir, sesuaikan dengan input pengguna
      noTelepon: "08123456789",
      alamat: "Alamat Kader Baru",
      kecamatan: "Kecamatan Baru",
      kota: "Kota Baru",
      provinsi: "Provinsi Baru"
    };

    // Panggil fungsi untuk menyimpan data kader baru
    //handleSimpanDataKader(dataKaderBaru);
  } else {
    // Handle negative confirmation (do nothing)
    console.log("Menambahkan data gagal.");
  }
}

export default function InsertKader({ handleSimpanDataKader }) {

  const router = useRouter();
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
          <form>
            <div className="flex flex-wrap mt-3">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="selectProvinsi">
                    Provinsi
                  </label>
                  <input
                    type="text" id="provinsi" name="provinsi"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="selectKota">
                    Kota
                  </label>
                  <input
                    type="text" id="kota" name="kota"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="selectKecamatan">
                    Kecamatan
                  </label>
                  <input
                    type="text" id="kecamatan" name="kecamatan"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="noUrut">
                    No Urut
                  </label>
                  <input
                    type="text" id="noUrut" name="noUrut"
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
                    type="text" id="nama" name="nama"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="nomorIndukAnggota">
                    Nomor Induk Anggota
                  </label>
                  <input
                    type="text" id="nomorIndukAnggota" name="nomorIndukAnggota"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="jenisKelamin">
                    Jenis Kelamin
                  </label>
                  <select
                    id="jenisKelamin" name="jenisKelamin"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="tanggalLahir">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date" id="tanggalLahir" name="tanggalLahir"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="noTelepon">
                    Nomor Telepon
                  </label>
                  <input
                    type="text" id="noTelepon" name="noTelepon"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="alamat">
                    Alamat
                  </label>
                  <input
                    type="text" id="alamat" name="alamat"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>
            <div className="text-center flex justify-end mr-3 mt-3">
            <button
            className="bg-green-700 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="submit"
            onClick={() => handleCreateData(handleSimpanDataKader)}
          >
            Simpan
          </button>
              <a
                className="bg-blueGray-400 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleButtonKembaliClick}
              >
                Kembali
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
