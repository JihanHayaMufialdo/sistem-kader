import React from "react";

export default function Navbar() {
  const navbarStyle = {
    backgroundImage: `url('/img/bglogin6.Jpg')`, // Atur latar belakang dengan gambar yang diimpor
    backgroundSize: "cover", // Sesuaikan ukuran gambar agar mencakup seluruh area navbar
    backgroundRepeat: "no-repeat", // Hindari pengulangan gambar
    padding: "10px 20px", // Sesuaikan padding sesuai kebutuhan
    // Tambahkan gaya lainnya sesuai kebutuhan
  };
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-lg uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Beranda
          </a>
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <div className="items-center flex mt-3">
              <h6 className="text-white text-base font-bold mr-3 ">
                ADMIN
              </h6>
              <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                <img
                  alt="..."
                  className="w-full rounded-full align-middle border-none shadow-lg"
                  src="/img/profiladmin.jpg"
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
