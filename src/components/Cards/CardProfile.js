import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function CardProfile() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditingFoto, setIsEditingFoto] = useState(false);
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState("");
  const [fotoURL, setFotoURL] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { nama_pengguna, role } = JSON.parse(storedUser);
      fetchUserData(nama_pengguna);
      setRole(role);
    }
  }, []);

  const fetchUserData = async (namaPengguna) => {
    try {
      const response = await axios.get(`http://localhost:8000/akun/${namaPengguna}`);
      setUserData(response.data);
      if (response.data.foto_url) {
        setFotoURL(`http://localhost:8000${response.data.foto_url}`);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEditProfile = (nama_pengguna) => {
    const path = role === "Admin" ? `/admin/profil/edit/` : `/ssr/profil/edit/`;
    router.push({
      pathname: path,
      query: { nama_pengguna: nama_pengguna },
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setFotoURL(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUploadFoto = async () => {
    if (!selectedFile) {
      alert("Pilih file foto terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("foto", selectedFile);

    try {
      const response = await axios.post(`http://localhost:8000/upload_foto_profil/${userData?.nama_pengguna}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFotoURL(response.data.fotoURL); // Update URL foto setelah berhasil diunggah
      setIsEditingFoto(false); // Tutup form edit foto setelah selesai
      alert("Foto berhasil diunggah");
    } catch (error) {
      console.error(error);
      alert("Error uploading photo");
    }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-10">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center relative">
              <div className="absolute top-0 right-0 mt-5 mr-6">
                <i className="fas fa-pen text-lg text-blueGray-600 cursor-pointer" onClick={() => handleEditProfile(userData?.nama_pengguna)}></i>
              </div>
              <div className="relative flex items-center justify-center">
              <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} accept="image/*" />
                <label htmlFor="fileInput">
                  <img
                    alt="  "
                    src={fotoURL || '/img/team-2-800x800.jpg'}
                    className="shadow-xl rounded-full h-auto align-middle border-none max -m-16 -ml-20 lg:-ml-16 max-w-150-px cursor-pointer"
                    onClick={() => setIsEditingFoto(true)}
                  />
                </label>
              </div>
            </div>
            <div className="w-full px-4 text-center mt-20">
              {isEditingFoto && (
                <button className="bg-green-700 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" onClick={handleUploadFoto}>
                  Simpan Foto
                </button>
              )}
            </div>
          </div>
          <div className="text-center mt-5">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
              {userData ? userData.nama : "Loading..."}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
              {userData ? userData.kota_kabupaten : "Loading..."}
            </div>
            <div className="mb-2 text-blueGray-600 mt-10">
              <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
              {"Inisiatif Lampung Sehat"}
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
              {"Bakrie Center Foundation"}
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="text-lg leading-relaxed text-blueGray-700">
                  {userData ? userData.biografi : "Loading..."}
                </p>
                <a
                  href="https://maps.app.goo.gl/wyC6W67RL8GNhJKm6"
                  className="font-normal text-sm text-lightBlue-500"
                >
                  Jl. Imam Bonjol No.164 LK.1 RT.002 RW.00 Kel. Gedong Air Kec. Tanjung Karang Barat Bandar Lampung, Bandar Lampung 35151
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
