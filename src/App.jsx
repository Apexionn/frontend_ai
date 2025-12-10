// src/App.jsx
import { useState } from "react";
import FormPredict from "./components/FormPredict";
import ResultCard from "./components/ResultCard";
import HistoryChart from "./components/HistoryChart";

export default function App() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  function handleResult(res) {
    if (!res) {
      setResult(null);
      return;
    }
    setResult(res);
    setHistory(prev => [...prev, res.prediksi_yield_ton]);
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        PATANI - Prediksi Hasil Panen Padi
      </h1>

      <FormPredict onResult={handleResult} />

      <ResultCard data={result} />

      <HistoryChart history={history} />
    </div>
  );
}
