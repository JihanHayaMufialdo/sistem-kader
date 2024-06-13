import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Navbar() {
  const router = useRouter();
  const [namaPengguna, setNamaPengguna] = useState('');
  const [role, setRole] = useState('');
  const [fotoURL, setFotoURL] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { nama_pengguna, role } = JSON.parse(storedUser);
      setNamaPengguna(nama_pengguna);
      setRole(role);
      fetchUserData(nama_pengguna);
    }
  }, []);

  const fetchUserData = async (namaPengguna) => {
    try {
      const response = await axios.get(`http://localhost:8000/akun/${namaPengguna}`);
      setFotoURL(`http://localhost:8000${response.data.foto_url}`);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleButtonClick = () => {
    if (role === 'Admin') {
      router.push(`/admin/profil?namaPengguna=${namaPengguna}`);
    } else if (role === 'SSR') {
      router.push(`/ssr/profil?namaPengguna=${namaPengguna}`);
    } else {
      // Handle other roles or show an error message
      console.error('Role not recognized');
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-lg uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            SIDAK (Sistem Data Kader)
          </a>
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <div className="items-center flex mt-3">
              <h6
                className="text-white text-base font-bold mr-3 cursor-pointer"
                onClick={handleButtonClick}
              >
                {namaPengguna}
              </h6>
              <span
                className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full cursor-pointer"
                onClick={handleButtonClick}
              >
                <img
                  alt="..."
                  className="w-full rounded-full align-middle border-none shadow-lg"
                  src={fotoURL || '/img/team-2-800x800.jpg'}
                />
              </span>
            </div>
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
