import React, { useState } from "react";
import { useRouter } from 'next/router';

export default function TambahLaporan() {
  const [file, setFile] = useState(null);
  const [notification, setNotification] = useState('');
  const router = useRouter();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleImportClick = async (endpoint) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await fetch(`http://localhost:8000/${endpoint}`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        setNotification("File berhasil diimpor");
        setTimeout(() => {
          setNotification('');
          router.push('/admin/laporan/');
        }, 3000); // Notification disappears after 3 seconds
      } else {
        // Handle non-OK response
        const errorMessage = await response.text(); // Get the error message from the response
        throw new Error(errorMessage);
      }
    } catch (error) {
      // Handle fetch or other errors
      setNotification(`Error: ${error.message}`);
      setTimeout(() => setNotification(''), 3000); // Notification disappears after 3 seconds
    }
  };  

  // const handleImportClick = async (endpoint) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     const response = await fetch(`http://localhost:8000/${endpoint}`, {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       setNotification("File berhasil diimpor");
  //       setTimeout(() => {
  //         setNotification('');
  //         router.push('/admin/laporan/');
  //       }, 3000); // Notification disappears after 3 seconds
  //     } else {
  //       throw new Error('Gagal mengimpor file');
  //     }
  //   } catch (error) {
  //     setNotification(`Error: ${error.message}`);
  //     setTimeout(() => setNotification(''), 3000); // Notification disappears after 3 seconds
  //   }
  // };

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
              <div className="w-full lg:w-6/8 px-4">
                <div className="relative w-full mb-3 flex justify-between items-center">
                  <input
                    type="file" id="fileInput" name="fileInput"
                    className=" border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleFileChange}
                  />
                  <button
                    className="w-1/3 h-12 bg-green-700 active:bg-blueGray-600 text-white font-bold text-xs px-3 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleImportClick('laporantpt')}
                  >
                    Import TPT ANAK
                  </button>
                </div>
                <div className="relative w-full mb-3 flex justify-between items-center">
                  <input
                    type="file" id="fileInputIKRT" name="fileInputIKRT"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleFileChange}
                  />
                  <button
                    className="w-1/3 h-12 bg-green-700 active:bg-blueGray-600 text-white font-bold text-xs px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleImportClick('laporanikrt')}
                  >
                    Import IK RT
                  </button>
                </div>
                <div className="relative w-full mb-3 flex justify-between items-center">
                  <input
                    type="file" id="fileInputNonRT" name="fileInputNonRT"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleFileChange}
                  />
                  <button
                    className="w-1/3 h-12 bg-green-700 active:bg-blueGray-600 text-white font-bold text-xs px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleImportClick('laporaniknonrt')}
                  >
                    Import IK NON-RT
                  </button>
                </div>
                <div className="relative w-full mb-3 flex justify-between items-center">
                  <input
                    type="file" id="fileInputTernotifikasi" name="fileInputTernotifikasi"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleFileChange}
                  />
                  <button
                    className="w-1/3 h-12 bg-green-700 active:bg-blueGray-600 text-white font-bold text-xs px-1 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleImportClick('laporanterduga')}
                  >
                    Import TERNOTIFIKASI
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center mt-6 ">
              <button
                className="bg-green-700 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleButtonKembaliClick}
              >
                Kembali
              </button>
            </div>
            {notification && (
              <div className="text-center mt-4 text-green-700 font-bold">
                {notification}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
