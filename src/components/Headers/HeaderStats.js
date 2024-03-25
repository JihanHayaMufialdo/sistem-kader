import React from "react";

// components

import CardStats from "../Cards/CardStats.js";

export default function HeaderStats() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-green-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full"> 
          <div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="LAPORAN TPT"
                  statTitle="350,897"
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Perbulan"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="LAPORAN SUDAH IKRT"
                  statTitle="2,356"
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Perbulan"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="LAPORAN BELUM IKRT"
                  statTitle="924"
                  statArrow="up"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Perbulan"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="LAPORAN TERNOTIFIKASI"
                  statTitle="49,65%"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Perbulan"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
