import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const AdminBarChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
        color: "#0084ff",
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
        color: "#00e396",
      },
      {
        name: "series3",
        data: [20, 10, 35, 25, 18, 27, 30],
        color: "#feb019",
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={500}
        width={900}
      />
    </div>
  );
};

export default AdminBarChart;
