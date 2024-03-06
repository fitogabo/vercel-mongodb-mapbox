import { useEffect, useState } from 'react';

const Map = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/getMarkers');
            const json = await res.json();
            setData(json.data);
        };

        fetchData();
    }, []);

    // Aquí puedes usar los datos para renderizar tu mapa
    // ...
};

export default Map;