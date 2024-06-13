import React, { useState, useEffect, useCallback } from "react";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const months = [
  { value: 1, label: "Januari" },
  { value: 2, label: "Februari" },
  { value: 3, label: "Maret" },
  { value: 4, label: "April" },
  { value: 5, label: "Mei" },
  { value: 6, label: "Juni" },
  { value: 7, label: "Juli" },
  { value: 8, label: "Agustus" },
  { value: 9, label: "September" },
  { value: 10, label: "Oktober" },
  { value: 11, label: "November" },
  { value: 12, label: "Desember" }
];

export default function CardPieChart() {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [year, setYear] = useState("");
  const [apiData, setApiData] = useState([]);
  const [uniqueRegions, setUniqueRegions] = useState([]);
  const [totalLaporan, setTotalLaporan] = useState(0); // Tambahkan state untuk total laporan

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Laporan",
        backgroundColor: ["#4c51bf", "#ff0000", "#00ff00", "#fbcb3a"],
        borderColor: "#ffffff",
        data: [],
        fill: false,
      },
    ],
  });

  const mergeData = (rawData) => {
    const mergedData = {};

    rawData.forEach(item => {
      const tpt = parseInt(item.TPT, 10);
      const ik = parseInt(item.IK, 10);
      const ikNonrt = parseInt(item.IK_Nonrt, 10);
      const ternotifikasi = parseInt(item.Ternotifikasi, 10);

      if (!mergedData[item.Kabupaten_Kota]) {
        mergedData[item.Kabupaten_Kota] = {
          ...item,
          TPT: tpt,
          IK: ik,
          IK_Nonrt: ikNonrt,
          Ternotifikasi: ternotifikasi,
        };
      } else {
        mergedData[item.Kabupaten_Kota].TPT += tpt;
        mergedData[item.Kabupaten_Kota].IK += ik;
        mergedData[item.Kabupaten_Kota].IK_Nonrt += ikNonrt;
        mergedData[item.Kabupaten_Kota].Ternotifikasi += ternotifikasi;
      }
    });

    return Object.values(mergedData);
  };

  const updateChartData = useCallback((rawData, region, startMonth, endMonth, year) => {
    let filteredData = rawData;
    
    if (startMonth && endMonth && year) {
      const startDate = new Date(year, startMonth - 1);
      const endDate = new Date(year, endMonth - 1);

      filteredData = rawData.filter(item => {
        const itemDate = new Date(item.Tahun, item.Bulan - 1);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    if (region !== "All") {
      filteredData = filteredData.filter(item => item.Kabupaten_Kota === region);
    }

    filteredData = mergeData(filteredData);

    const labels = ["TPT", "IKRT", "IKNONRT", "Laporan Ternotifikasi"];
    const tptData = filteredData.reduce((sum, item) => sum + item.TPT, 0);
    const ikrtData = filteredData.reduce((sum, item) => sum + item.IK, 0);
    const iknonrtData = filteredData.reduce((sum, item) => sum + item.IK_Nonrt, 0);
    const ternotifikasiData = filteredData.reduce((sum, item) => sum + item.Ternotifikasi, 0);

    const dataValues = [tptData, ikrtData, iknonrtData, ternotifikasiData];

    // Hitung total laporan
    const total = dataValues.reduce((acc, val) => acc + val, 0);
    setTotalLaporan(total);

    setData({
      labels,
      datasets: [
        {
          label: "Laporan",
          backgroundColor: ["#4c51bf", "#ff0000", "#00ff00", "#fbcb3a"],
          borderColor: "#ffffff",
          data: dataValues,
          fill: false,
        },
      ],
    });
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/peringkat_perwilayah");
        const result = await response.json();
        setApiData(result);
        
        const uniqueCities = [...new Set(result.map(item => item.Kabupaten_Kota))];
        setUniqueRegions(uniqueCities);

        updateChartData(result, selectedRegion, startMonth, endMonth, year);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [updateChartData, selectedRegion, startMonth, endMonth, year]);

  useEffect(() => {
    const ctx = document.getElementById("pie-chart").getContext("2d");
    if (window.myPie) {
      window.myPie.destroy();
    }
    window.myPie = new Chart(ctx, {
      type: "pie",
      data,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let sum = 0;
              const dataArr = ctx.chart.data.datasets[0].data;
              dataArr.forEach((data) => {
                sum += data;
              });
              const percentage = ((value / sum) * 100).toFixed(2) + "%";
              return percentage;
            },
            color: "#fff",
          },
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
      },
      plugins: [ChartDataLabels],
    });
  }, [data]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Diagram
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Total Laporan Provinsi Lampung
              </h2>
            </div>
            <div className="relative w-full max-w-full flex-grow flex-1">
              <select
                className="form-select block w-full bg-white border-gray-300 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  updateChartData(apiData, e.target.value, startMonth, endMonth, year);
                }}
                value={selectedRegion}
              >
                <option value="All">All</option>
                {uniqueRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <select
              className="bg-indigo-100 text-black px-3 py-1 mr-2 bg-white border-gray-300 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={startMonth}
              onChange={(e) => {
                setStartMonth(e.target.value);
                updateChartData(apiData, selectedRegion, e.target.value, endMonth, year);
              }}
            >
              <option value="">Mulai Bulan</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <select
              className="bg-indigo-100 text-black px-3 py-1 mr-2 bg-white border-gray-300 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={endMonth}
              onChange={(e) => {
                setEndMonth(e.target.value);
                updateChartData(apiData, selectedRegion, startMonth, e.target.value, year);
              }}
            >
              <option value="">Akhir Bulan</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <select
              className="bg-indigo-100 text-black px-3 py-1 bg-white border-gray-300 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                updateChartData(apiData, selectedRegion, startMonth, endMonth, e.target.value);
              }}
            >
              <option value="">Tahun</option>
              {[...new Set(apiData.map((item) => item.Tahun))].map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="p-4 flex-auto">
          <div className="relative h-350-px">
            <canvas id="pie-chart"></canvas>
          </div>
        </div>
        {/* Keterangan Total Laporan */}
        <div className="p-4 mt-4 border-t border-gray-300 text-center">
          <p className="text-base font-semibold text-gray-700">Total Laporan: {totalLaporan}</p>
        </div>
      </div>
    </>
  );
}

