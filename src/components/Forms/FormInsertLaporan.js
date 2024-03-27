import React, { useState } from "react";
import { useRouter } from 'next/router';

export default function TambahLaporan() {
  const [file, setFile] = useState(null);
  const router = useRouter();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleImportClick = async () => {
    // Lakukan logika impor file di sini (contoh: kirim file ke server untuk diproses)
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Kirim formData ke server menggunakan fetch atau axios
      const response = await fetch('https://example.com/import', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log("File berhasil diimpor");
        // Setelah impor selesai, navigasi kembali ke halaman laporan
        router.push('/admin/laporan/');
      } else {
        throw new Error('Gagal mengimpor file');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleButtonKembaliClick = () => {
    router.push('/admin/laporan/');
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-green-700 text-xl font-bold">
              Import Data Excel
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <div className="flex flex-wrap mt-3">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="fileInput">
                    Pilih File Excel
                  </label>
                  <input
                    type="file" id="fileInput" name="fileInput"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
            <div className="text-center mt-6">
              <button
                className="bg-green-700 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleImportClick}
              >
                Import
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
