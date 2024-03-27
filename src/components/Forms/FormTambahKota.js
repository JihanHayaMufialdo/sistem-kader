import React from "react";
import { useRouter } from 'next/router';

// Function to handle confirmation before creating account
function handleTambahKota() {
  const confirmation = window.confirm("Apakah anda yakin ingin menambahkan kota?");
  if (confirmation) {
    // Handle positive confirmation (account creation logic)
    // console.log("Creating account...");
  } else {
    // Handle negative confirmation (do nothing)
    // console.log("Account creation cancelled.");
  }
}

export default function FormTambahKota() {

  const router = useRouter();
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
          <form className="flex flex-wrap mt-3">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="selectKotaKabupaten">
                  Provinsi
                </label>
                <input
                  type="text" id="id_provinsi" name="id_provinsi"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue={'18 - Lampung'}
                  readOnly
                />
              </div>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="selectKotaKabupaten">
                  Kode Kota/Kabupaten
                </label>
                <input
                  type="text" id="kode_kota" name="kode_kota"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="grid-password">
                  Kota/Kabupaten
                </label>
                <input
                  type="text" id="nama_kota" name="nama_kota"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="text-center flex justify-end mr-3 mt-3 w-full">
              <button
                className="bg-green-700 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ml-auto"
                type="submit"
                onClick={handleTambahKota}
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
