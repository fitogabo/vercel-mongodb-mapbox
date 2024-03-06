// app/page.js
import React, { useEffect, useState } from 'react';
import Map from './map/page.js';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/getMarkers')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <main className="w-full h-full">
      <h1>Mapa Referencial</h1>
      <Map data={data} />
    </main>
  );
}