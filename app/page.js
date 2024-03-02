import { useState } from 'react';
import Map from './map/page.js';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const refreshData = async () => {
    setLoading(true);
    const res = await fetch('/api/getMarkers');
    const newData = await res.json();
    setData(newData);
    setLoading(false);
  };

  return (
    <main className="w-full h-full">
      <h1>Mapa Referencial</h1>
      <button onClick={refreshData} disabled={loading}>
        {loading ? 'Cargando...' : 'Refrescar base de datos'}
      </button>
      <Map data={data} />
    </main>
  );
}