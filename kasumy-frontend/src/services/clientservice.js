const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerClientes() {
    // La ruta en tu backend Node es /api/clientes
    const respuesta = await fetch(`${API_URL}/clientes`);

    if (!respuesta.ok) {
        throw new Error(`Error al consultar clientes: ${respuesta.status}`);
    }

    const resultado = await respuesta.json();
    return resultado.data;
}

export async function crearCliente(data) {
    const respuesta = await fetch(`${API_URL}/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!respuesta.ok) {
        throw new Error(`Error al crear cliente: ${respuesta.status}`);
    }
    return await respuesta.json();
}