import React, { useState } from "react";
import Chart from "chart.js";

export default function CardBarChart() {
  const [selectedRegion, setSelectedRegion] = useState("All"); // State untuk menyimpan daerah yang dipilih

  React.useEffect(() => {
    let config = {
      type: "bar",
      data: {
        labels: [
          "Januari",
          "Februari",
          "Maret",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember",
        ],
        datasets: [
          {
            label: "TPT",
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [65, 78, 66, 44, 56, 67, 75, 60, 43, 22, 78, 98],
            fill: false,
          },
          {
            label: "IKRT",
            backgroundColor: "#ff0000",
            borderColor: "#ff0000",
            data: [40, 68, 86, 74, 56, 60, 87, 45, 77, 34, 28, 70],
            fill: false,
          },
          {
            label: "Laporan Ternotifikasi",
            backgroundColor: "#fbcb3a",
            borderColor: "#fbcb3a",
            data: [44, 62, 6, 71, 48, 10, 17, 11, 56, 78, 92, 34, 24],
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: "Month",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, []);

  // Fungsi untuk memfilter data berdasarkan daerah yang dipilih
  const filterDataByRegion = (region) => {
    // Implementasi logika filter di sini
    // Misalnya, jika ingin memfilter data berdasarkan daerah yang dipilih
    // Anda dapat mengubah dataset sesuai dengan logika yang diinginkan
    console.log("Filter by region:", region);
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Pemeringkatan
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Laporan PerDaerah
              </h2>
            </div>
            {/* Dropdown untuk memilih daerah */}
            <div className="relative w-full max-w-full flex-grow flex-1">
              <select
                className="form-select block w-full bg-white border-gray-300 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  filterDataByRegion(e.target.value);
                }}
                value={selectedRegion}
              >
                <option value="All">All</option>
                <option value="Bandar Lampung">Bandar Lampung</option>
                <option value="Pringsewu">Pringsewu</option>
                <option value="Pesawaran">Pesawaran</option>
                <option value="Tanggamus">Tanggamus</option>
                <option value="Lampung Tengah">Lampung Tengah</option>
                <option value="Lampung Selatan">Lampung Selatan</option>
                <option value="Lampung Timur">Lampung Timur</option>
                <option value="Lampung Utara">Lampung Utara</option>
                <option value="Tulang Bawang Barat">Tulang Bawang Barat</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
