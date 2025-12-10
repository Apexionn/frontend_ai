export default function ResultCard({ data }) {
  if (!data) return null;

  return (
    <div className="grid gap-4 mt-8 ">

      {/* HASIL UTAMA */}
      <div className="bg-white border-l-4 border-green-600 shadow rounded-lg p-5">
        <h2 className="text-xl font-semibold text-green-700">
          🌾 Hasil Prediksi Utama
        </h2>

        <div className="mt-4 grid md:grid-cols-2 gap-4">

          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-sm text-green-700">Perkiraan Produksi</div>
            <div className="text-2xl font-bold text-green-800">
              {data.prediksi_yield_ton} ton
            </div>
          </div>

          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-sm text-green-700">Range Yield</div>
            <div className="text-lg font-semibold text-green-800">
              {data.range_yield[0]} — {data.range_yield[1]}
            </div>
          </div>

        </div>
      </div>

      {/* CARD REKOMENDASI */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="p-4 bg-white shadow rounded-lg border">
          <div className="text-sm text-slate-500">Rekomendasi Pupuk</div>
          <div className="text-2xl font-semibold mt-1">
            {data.rekomendasi_pupuk_kg} kg
          </div>
        </div>

        <div className="p-4 bg-white shadow rounded-lg border">
          <div className="text-sm text-slate-500">Rekomendasi Pestisida</div>
          <div className="text-2xl font-semibold mt-1">
            {data.rekomendasi_pestisida_l} L
          </div>
        </div>

      </div>

      {/* INFORMASI TAMBAHAN */}
      <div className="bg-white shadow rounded-lg p-5 border">
        <h2 className="text-lg font-semibold mb-4">
          📌 Informasi Tambahan
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-sm text-slate-600">Estimasi Tanggal Panen</div>
            <div className="text-lg font-semibold">
              {data.estimasi_tanggal_panen}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-sm text-slate-600">Risiko Pasca Panen</div>
            <div className="text-lg font-semibold">
              {data.risiko_pasca_panen}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-sm text-slate-600">Curah Hujan</div>
            <div className="text-lg font-semibold">
              {Number(data.data_lookup.curah_hujan_mm).toFixed(2)} mm
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-sm text-slate-600">Suhu Udara</div>
            <div className="text-lg font-semibold">
              {Number(data.data_lookup.suhu_c).toFixed(2)}°C
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-sm text-slate-600">Jenis Tanah</div>
            <div className="text-lg font-semibold">
              {data.data_lookup.jenis_tanah}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
