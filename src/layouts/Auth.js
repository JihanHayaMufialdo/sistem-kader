import React from "react";

// components

import Navbar from "../components/Navbars/AuthNavbar.js";
import FooterSmall from "../components/Footers/FooterSmall.js";

export default function Auth({ children }) {
  return (
    <>
      <main>
        <section className="relative w-full h-full pb-40 min-h-screen">
        <img src="/img/brand/logo-ils.png" alt="Logo" className="w-24 h-24 mx-auto mb-4" />
          <div
            className="absolute top-0 w-full h-full bg-green-800 bg-no-repeat bg-full"
            style={{
               backgroundImage: "url('/img/bglogin6.Jpg')",
            }}
          ></div>
          {children}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
