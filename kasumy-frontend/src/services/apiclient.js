const API_URL = import.meta.env.VITE_API_URL;

export async function apiRequest(path, options = {}) {
    // Buscamos el token que guardaremos cuando el usuario inicie sesión
    const token = sessionStorage.getItem("kasumi_token");

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });

    const body = await response.json().catch(() => null);

    if (!response.ok) {
        const error = new Error(body?.message || `Error HTTP ${response.status}`);
        error.status = response.status;
        throw error;
    }

    return body;
}