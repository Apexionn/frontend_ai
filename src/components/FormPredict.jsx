import { useState } from "react";
import { API_BASE } from "../utils/constant";

const daftarProvinsi = [
  "Jawa Timur",
  "Sulawesi Selatan",
  "Jawa Barat",
  "Jawa Tengah",
  "Sumatera Selatan"
];

const daftarMusim = [
  "Kemarau (Apr-Sep)",
  "Hujan (Okt-Mar)"
];

export default function FormPredict({ onResult }) {
  const [luas, setLuas] = useState("");
  const [provinsi, setProvinsi] = useState("Jawa Timur");
  const [musim, setMusim] = useState("Hujan (Okt-Mar)");
  const [tanggalTanam, setTanggalTanam] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePredict() {
    setError("");

    // VALIDASI FORM
    if (!luas || !provinsi || !musim || !tanggalTanam) {
      setError("Semua field wajib diisi, termasuk tanggal tanam.");
      return;
    }
    if (!daftarProvinsi.includes(provinsi)) {
      setError("Provinsi tidak tersedia dalam dataset.");
      return;
    }
    if (!daftarMusim.includes(musim)) {
      setError("Musim tidak tersedia dalam dataset.");
      return;
    }

    setLoading(true);

    const payload = {
      luas_lahan: parseFloat(luas),
      provinsi,
      musim,
      tanggal_tanam: tanggalTanam
    };

    try {
      const res = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Server error");
        setLoading(false);
        return;
      }

      // KIRIM HASIL KE PARENT COMPONENT
      onResult(data);

    } catch (err) {
      console.error("Frontend Error:", err);
      setError("Gagal terhubung ke server backend.");
    }

    setLoading(false);
  }

  // ==============================
  //      HANDLE RESET
  // ==============================
  function handleClear() {
    setLuas("");
    setProvinsi("Jawa Timur");
    setMusim("Hujan (Okt-Mar)");
    setTanggalTanam("");
    setError("");
    onResult(null);
  }

  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <div className="grid md:grid-cols-3 gap-4">

        <div>
          <label className="text-sm font-medium">Luas Lahan (ha)</label>
          <input
            type="number"
            value={luas}
            onChange={e => setLuas(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="2.5"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Provinsi</label>
          <select
            value={provinsi}
            onChange={e => setProvinsi(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
          >
            {daftarProvinsi.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Musim</label>
          <select
            value={musim}
            onChange={e => setMusim(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
          >
            {daftarMusim.map(m => <option key={m}>{m}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Tanggal Tanam</label>
          <input
            type="date"
            value={tanggalTanam}
            onChange={e => setTanggalTanam(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading && (
        <div className="mt-4 text-blue-600 font-medium animate-pulse">
          Memproses prediksi...
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <button
          onClick={handlePredict}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Prediksi
        </button>

        <button
          onClick={handleClear}
          className="bg-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-400 transition"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
