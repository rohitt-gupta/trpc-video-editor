"use client";

import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

function AreaChart() {
  const chartRef = useRef(null);

  const options = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      show: false,
      type: 'category', // Ensure xaxis type is category
      categories: [] // Empty categories array
    },
    yaxis: {
      show: false
    },
    legend: {
      show: false
    },
    grid: {
      show: false
    },
    series: [{
      name: 'data',
      data: [31, 40, 28, 51, 42, 82, 56],
      color : "#16A34A"
    }]
  };

  useEffect(() => {
    if (chartRef.current) {
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [options]);

  return <div ref={chartRef} />;
}

export default AreaChart;
