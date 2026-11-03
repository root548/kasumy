const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerCitas() {
    // Recuerda que en tu Node.js la ruta es /api/citas
    const respuesta = await fetch(`${API_URL}/citas`);

    if (!respuesta.ok) {
        throw new Error(`Error al consultar citas: ${respuesta.status}`);
    }

    const resultado = await respuesta.json();
    return resultado.data;
}

export async function crearCita(data) {
    const respuesta = await fetch(`${API_URL}/citas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!respuesta.ok) {
        // Si el backend devuelve un error (ej. especialista ocupado), lo mostramos
        const errorData = await respuesta.json();
        throw new Error(errorData.message || "Error al crear la cita");
    }
    return await respuesta.json();
}