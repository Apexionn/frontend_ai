import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function HistoryChart({ history }) {
  const data = {
    labels: history.map((_, i) => `#${i + 1}`),
    datasets: [{
      label: "Prediksi Yield (ton)",
      data: history,
      borderColor: "#16a34a",
      backgroundColor: "rgba(16,163,127,0.08)",
      fill: true,
      tension: 0.2
    }]
  };

  return (
    <div className="mt-10 bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-3">Riwayat Prediksi</h2>
      <Line data={data} height={200} />
    </div>
  );
}
