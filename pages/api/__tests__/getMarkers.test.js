// Importamos la biblioteca axios para realizar solicitudes HTTP
import axios from 'axios';

// Definimos un test utilizando la función 'test' de Jest
test('getMarkers route returns GeoJSON', async () => {
    // Realizamos una solicitud GET a la ruta de la API 'getMarkers' en nuestro servidor local
    const res = await axios.get('http://localhost:3000/api/getMarkers');

    // Esperamos que el estado de la respuesta sea 200, lo que indica una respuesta exitosa
    expect(res.status).toBe(200);

    // Esperamos que la propiedad 'success' en los datos de la respuesta sea 'true'
    expect(res.data.success).toBe(true);

    // Esperamos que la propiedad 'type' en los datos de la respuesta sea 'FeatureCollection'.
    // Esto verifica que los datos devueltos son en formato GeoJSON.
    expect(res.data.data.type).toBe('FeatureCollection');
});