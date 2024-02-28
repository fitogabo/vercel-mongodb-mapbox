// app/layout.js  
'use client'
import { Inter } from "next/font/google";
import 'mapbox-gl/dist/mapbox-gl.css';
import "./globals.css";
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useEffect, useRef } from 'react';

const inter = Inter({ subsets: ["latin"] });

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

function Footer({ map }) { // Recibe la instancia del mapa como prop
  const geocoderContainer = useRef(null);

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    });

    // Asociar el geocoder con la instancia del mapa
    if (map && geocoderContainer.current) {
      geocoderContainer.current.appendChild(geocoder.onAdd(map));
    }
  }, [map]);

  return (
    <footer className="w-full text-center border-t border-grey p-4 pin-b">
      <div ref={geocoderContainer} /> {/* Geocoder container */}
    </footer>
  );
}

export default function RootLayout({ children, map }) { // Recibe la instancia del mapa como prop
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer map={map} /> {/* Pasar la instancia del mapa al Footer */}
      </body>
    </html>
  );
}