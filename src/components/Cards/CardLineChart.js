import React, { useState, useEffect } from "react";
import Chart from "chart.js";

const months = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const monthMap = {
  "Januari": 1,
  "Februari": 2,
  "Maret": 3,
  "April": 4,
  "Mei": 5,
  "Juni": 6,
  "Juli": 7,
  "Agustus": 8,
  "September": 9,
  "Oktober": 10,
  "November": 11,
  "Desember": 12,
};

export default function CardLineChart() {
  const [startMonth, setStartMonth] = useState("Januari");
  const [endMonth, setEndMonth] = useState("Desember");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/peringkat_perwilayah');
        const data = await response.json();

        const startMonthNum = monthMap[startMonth];
        const endMonthNum = monthMap[endMonth];

        const filteredData = data.filter(item => {
          const monthNum = item.Bulan;
          return (
            monthNum >= startMonthNum &&
            monthNum <= endMonthNum &&
            item.Tahun === parseInt(selectedYear)
          );
        });

        const labels = months.slice(startMonthNum - 1, endMonthNum);
        const tptData = new Array(labels.length).fill(0);
        const ikrtData = new Array(labels.length).fill(0);
        const ikNonrtData = new Array(labels.length).fill(0);
        const ternotifikasiData = new Array(labels.length).fill(0);

        filteredData.forEach(item => {
          const monthIndex = item.Bulan - startMonthNum;
          tptData[monthIndex] += parseInt(item.TPT) || 0;
          ikrtData[monthIndex] += parseInt(item.IK) || 0;
          ikNonrtData[monthIndex] += parseInt(item.IK_Nonrt) || 0;
          ternotifikasiData[monthIndex] += parseInt(item.Ternotifikasi) || 0;
        });

        setChartData({
          labels,
          datasets: [
            {
              label: "TPT",
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: tptData,
              fill: false,
            },
            {
              label: "IKRT",
              backgroundColor: "#ff0000",
              borderColor: "#ff0000",
              data: ikrtData,
              fill: false,
            },
            {
              label: "IK Non RT",
              backgroundColor: "#00ff00",
              borderColor: "#00ff00",
              data: ikNonrtData,
              fill: false,
            },
            {
              label: "Laporan Ternotifikasi",
              backgroundColor: "#fbcb3a",
              borderColor: "#fbcb3a",
              data: ternotifikasiData,
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [startMonth, endMonth, selectedYear]);

  useEffect(() => {
    var config = {
      type: "line",
      data: chartData,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "black",
        },
        legend: {
          labels: {
            fontColor: "black",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(128, 128, 128, .7)",
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Bulan",
                fontColor: "black",
              },
              gridLines: {
                display: false,
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
              ticks: {
                fontColor: "rgba(128, 128, 128, .7)",
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Jumlah Laporan",
                fontColor: "black",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
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
    var ctx = document.getElementById("line-chart").getContext("2d");
    if (window.myLine) window.myLine.destroy(); // Destroy the previous chart instance
    window.myLine = new Chart(ctx, config);
  }, [chartData]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                TREN
              </h6>
              <h2 className="text-black text-xl font-semibold">Capaian Bulanan</h2>
            </div>
            <div className="relative w-full max-w-full flex-grow flex-1 text-right bg-indigo-100 text-black px-3 py-1 mr-2 bg-white border-gray-300 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <select
                value={startMonth}
                onChange={(e) => setStartMonth(e.target.value)}
                className="mr-3 p-1  border rounded"
              >
                <option value="">Mulai Bulan </option> 
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={endMonth}
                onChange={(e) => setEndMonth(e.target.value)}
                className="mr-3 p-1 border rounded "
              >
                <option value="">Akhir Bulan</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)} 
                className="p-1 border rounded"
                placeholder="Year"
              />
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px ">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
