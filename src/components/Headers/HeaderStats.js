import React, { useState, useEffect } from "react";
import axios from "axios";
import CardStats from "../Cards/CardStats.js";

export default function HeaderStats() {
  const [totalLaporan, setTotalLaporan] = useState({});
  const [totalBelumIk, setTotalBelumIk] = useState("Loading...");

  useEffect(() => {
    const fetchTotalLaporan = async () => {
      try {
        const response = await axios.get("http://localhost:8000/jumlah_total_laporan");
        setTotalLaporan(response.data);
      } catch (error) {
        console.error("Error fetching total laporan data:", error);
      }
    };

    const fetchTotalBelumIk = async () => {
      try {
        const response = await axios.get("http://localhost:8000/menampilkan_status_ik_belum");
        setTotalBelumIk(response.data.total_belumik);
      } catch (error) {
        console.error("Error fetching total belum IK data:", error);
      }
    };

    fetchTotalLaporan();
    fetchTotalBelumIk();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="relative bg-green-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex flex-wrap justify-between">
            <div className="w-full lg:w-3/12 xl:w-2/12 px-4">
              <CardStats
                statSubtitle="TOTAL LAPORAN TPT"
                statTitle={totalLaporan.Total_TPT || "Loading..."}
                statIconColor="bg-red-500"
              />
            </div>
            <div className="w-full lg:w-3/12 xl:w-2/12 px-4">
              <CardStats
                statSubtitle="TOTAL LAPORAN SUDAH IK"
                statTitle={totalLaporan.Total_IK_RT || "Loading..."}
                statIconColor="bg-orange-500"
              />
            </div>
            <div className="w-full lg:w-3/12 xl:w-2/12 px-4">
              <CardStats
                statSubtitle="TOTAL LAPORAN BELUM IK"
                statTitle={totalBelumIk}
                statIconColor="bg-lightBlue-500"
              />
            </div>
            <div className="w-full lg:w-3/12 xl:w-2/12 px-4">
              <CardStats
                statSubtitle="TOTAL LAPORAN IK NON-RT"
                statTitle={totalLaporan.Total_IK_Nonrt || "Loading..."}
                statIconColor="bg-pink-500"
              />
            </div>
            <div className="w-full lg:w-3/12 xl:w-2/12 px-4 mt-8">
              <CardStats
                statSubtitle="TOTAL LAPORAN TERNOTIFIKASI"
                statTitle={totalLaporan.Total_Terdeteksi || "Loading..."}
                statIconColor="bg-green-600"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
