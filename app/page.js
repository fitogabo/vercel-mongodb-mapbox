// app/page.js
import Map from './map/page.js';

export default function Home() {
  return (
    <main className="w-full h-full">
      <h1>Mapa Referencial</h1>
      <Map />
    </main>
  );
}