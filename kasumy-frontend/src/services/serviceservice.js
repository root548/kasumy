
const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerServicios() {
    const respuesta = await fetch(`${API_URL}/services`);

    if (!respuesta.ok) {
        throw new Error(`Error al consultar servicios: ${respuesta.status}`);
    }

    const resultado = await respuesta.json();
    return resultado.data;
}





