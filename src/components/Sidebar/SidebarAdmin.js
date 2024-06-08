import React, {useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();
  console.log(router.pathname);

  const handleLogout = () => {
    // localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    // Redirect ke halaman login atau halaman lain setelah logout
    router.push("/auth/login");
  };

  // Gunakan useEffect untuk menyembunyikan sidebar setelah logout
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      // setCollapseShow("hidden");
    }
  }, []);


  return <>
    <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
       
        {/* Toggler */}
        {/* <button
          className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
          type="button"
          onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
        >
          <i className="fas fa-bars"></i>
        </button> */}

        <div className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
          <img src="/img/brand/logo-ils.png" alt="Logo" className="h-20 w-40 mr-2 inline" />
        </div>

        {/* Collapse */}
        <div
          className={
            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
            collapseShow
          }
        >

          {/* Divider */}
          <hr className="my-4 md:min-w-full" />

          {/* Menu */}
          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <Link
                href="/admin/dashboard/"
                className={
                  "text-sm uppercase py-3 font-bold block " +
                  (router.pathname.indexOf("/admin/dashboard") !== -1
                    ? "text-green-500 hover:text-green-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }
              >
                <i
                  className={
                    "fas fa-chart-simple mr-2 text-sm " +
                    (router.pathname.indexOf("/admin/dashboard") !== -1
                      ? "opacity-75"
                      : "text-blueGray-300")
                  }>
                </i>{" "}BERANDA
              </Link>
            </li>

            <li className="items-center">
              <Link
                href="/admin/ssr/"
                className={
                  "text-sm uppercase py-3 font-bold block " +
                  (router.pathname.indexOf("/admin/ssr") !== -1
                    ? "text-green-500 hover:text-green-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }>

                <i
                  className={
                    "fas fa-tools mr-2 text-sm " +
                    (router.pathname.indexOf("/admin/ssr") !== -1
                      ? "opacity-75"
                      : "text-blueGray-300")
                  }
                ></i>{" "}Akun SSR
              </Link>
            </li>

            <li className="items-center">
              <Link
                href="/admin/kader/"
                className={
                  "text-sm uppercase py-3 font-bold block " +
                  (router.pathname.indexOf("/admin/kader") !== -1
                    ? "text-green-500 hover:text-green-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }>

                <i
                  className={
                    "fas fa-table mr-2 text-sm " +
                    (router.pathname.indexOf("/admin/kader") !== -1
                      ? "opacity-75"
                      : "text-blueGray-300")
                  }
                ></i>{" "}Data Kader
              </Link>
            </li>

            <li className="items-center">
              <Link
                href="/admin/laporan/"
                className={
                  "text-sm uppercase py-3 font-bold block " +
                  (router.pathname.indexOf("/admin/laporan") !== -1
                    ? "text-green-500 hover:text-green-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }>

                <i
                  className={
                    "fas fa-map-marked mr-2 text-sm " +
                    (router.pathname.indexOf("/admin/laporan") !== -1
                      ? "opacity-75"
                      : "text-blueGray-300")
                  }
                ></i>{" "}Laporan
              </Link>
            </li>

            <li className="items-center">
              <Link
                href="/admin/kota/"
                className={
                  "text-sm uppercase py-3 font-bold block " +
                  (router.pathname.indexOf("/admin/kota") !== -1
                  ? "text-green-500 hover:text-green-600"
                  : "text-blueGray-700 hover:text-blueGray-500")
                }>

                <i
                  className={
                    "fas fa-map-marked mr-2 text-sm" +
                    (router.pathname.indexOf("/admin/kota") !== -1
                    ? "opacity-75"
                      : "text-blueGray-300")
                  }
                ></i>{" "}Sebaran Wilayah
              </Link>
            </li>

            <li className="items-center">
              <button
                onClick={handleLogout}
                  className={
                    "text-sm uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/auth/login") !== -1
                      ? "text-green-500 hover:text-green-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
              >
                <i
                  className={
                    "fas fa-map-marked mr-2 text-sm " +
                    (router.pathname.indexOf("/auth/login") !== -1
                      ? "opacity-75"
                      : "text-blueGray-300")
                  }
                ></i>{" "}
                Keluar
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>;
}
// import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";

// const SidebarAdmin = () => {
//   const router = useRouter();

//   // State untuk menyimpan rute yang aktif
//   const [activeRoute, setActiveRoute] = useState("");

//   // Daftar menu dengan rute dan ikon yang sesuai
//   const menuItems = [
//     { route: "/admin/dashboard", label: "Beranda", icon: "fas fa-tv" },
//     { route: "/admin/ssr/", label: "Akun SSR", icon: "fas fa-tools" },
//     { route: "/admin/kader/", label: "Data Kader", icon: "fas fa-table" },
//     { route: "/admin/laporan/", label: "Laporan", icon: "fas fa-map-marked" },
//     { route: "/logout", label: "Keluar", icon: "fas fa-sign-out-alt" }
//   ];

//   // Fungsi untuk menandai menu yang aktif
//   const handleSetActiveRoute = (route) => {
//     setActiveRoute(route);
//   };

//   return (
//     <ul className="md:flex-col md:min-w-full flex flex-col list-none">
//       {menuItems.map((item, index) => (
//         <li className="items-center" key={index}>
//           <Link
//             href={item.route}
//             className={
//               "text-xs uppercase py-3 font-bold block " +
//               (router.pathname === item.route
//                 ? "text-green-600 hover:text-green-700"
//                 : "text-blueGray-700 hover:text-blueGray-500")
//             }
//             onClick={() => handleSetActiveRoute(item.route)} // Setelah klik, set rute yang aktif
//           >
//             <i
//               className={
//                 `${item.icon} mr-2 text-sm ` +
//                 (router.pathname === item.route
//                   ? "opacity-75"
//                   : "text-blueGray-300")
//               }
//             ></i>{" "}
//             {item.label}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default SidebarAdmin;
