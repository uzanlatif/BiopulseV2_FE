import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
} from "chart.js";
import 'chartjs-adapter-date-fns';
import type { ChartData, ChartOptions } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
);

interface SensorChartProps {
  data: { x: Date; y: number }[] | undefined;
  timeRange: "1h" | "6h" | "24h";
  color: string;
  simplified?: boolean;
  notch60Hz?: boolean;
  compactView?: boolean;
}

const SensorChart: React.FC<SensorChartProps> = ({
  data,
  timeRange,
  color,
  simplified = false,
  notch60Hz = false,
  compactView = false,
}) => {
  // 💡 Pastikan data tersedia dan valid
  const cleanedData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];

    return data;
  }, [data]);

  const chartData: ChartData<"line", { x: Date; y: number }[], unknown> = useMemo(() => ({
    datasets: [
      {
        label: "Sensor Data",
        data: cleanedData,
        borderColor: color,
        backgroundColor: `${color}33`,
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 3,
        fill: true,
        tension: 0.3,
      },
    ],
  }), [cleanedData, color]);

  const chartOptions: ChartOptions<"line"> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: !simplified,
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        type: "time",
        grid: { display: false },
        time: {
          tooltipFormat: "HH:mm:ss",
          unit: "second",
          displayFormats: { second: "HH:mm:ss" },
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10,
          font: { size: 10 },
        },
      },
      y: {
        grid: { color: "#E5E7EB" },
        ticks: { font: { size: 10 } },
      },
    },
    animation: false,
    normalized: true,
  }), [simplified]);

  if (cleanedData.length === 0) {
    return <div className="text-gray-400 text-sm px-2 py-1">No data available.</div>;
  }

  return (
    <div style={{ height: compactView ? "100px" : "150px" }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default SensorChart;
