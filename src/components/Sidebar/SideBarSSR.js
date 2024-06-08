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
                href="/ssr/dashboard/"
                className={
                  "text-sm uppercase py-3 font-bold block " +
                  (router.pathname.indexOf("/ssr/dashboard") !== -1
                    ? "text-green-500 hover:text-green-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }
              >
                <i
                  className={
                    "fas fa-chart-simple mr-2 text-sm " +
                    (router.pathname.indexOf("/ssr/dashboard") !== -1
                      ? "opacity-75"
                      : "text-blueGray-300")
                  }>
                </i>{" "}BERANDA
              </Link>
            </li>
            <li className="items-center">
              <Link
                href="/ssr/kader/"
                className={
                  "text-sm uppercase py-3 font-bold block " +
                  (router.pathname.indexOf("/ssr/kader") !== -1
                    ? "text-green-500 hover:text-green-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }>

                <i
                  className={
                    "fas fa-map-marked mr-2 text-sm " +
                    (router.pathname.indexOf("/ssr/kader") !== -1
                      ? "opacity-75"
                      : "text-blueGray-300")
                  }
                ></i>{" "}Data Kader
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
