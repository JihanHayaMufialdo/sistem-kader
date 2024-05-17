import React from "react"; 
import { useRouter } from "next/router";
const axios = require("axios");

export default function TableProvinsi() {

  return (
    <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="overflow-x-auto">
                <div className="rounded-t bg-white mb-1 px-6 py-6 border-2">
                    <div className="flex justify-between items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h6 className="text-green-700 text-xl font-bold">
                        Daftar Provinsi
                        </h6>
                    </div>
                    </div>
                </div>

                <table className="items-center w-full bg-white border-collapse">
                    <thead className="bg-blueGray-50">
                        <tr>
                            <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                            >
                            No
                            </th>
                            <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                            >
                            Provinsi 
                            </th>
                            <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                            >
                            Jumlah Kota/Kabupaten
                            </th>
                            <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                            >
                            Jumlah Kecamatan
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-900">
                            1
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                            Lampung
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                            9
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                            123
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
  );
}

