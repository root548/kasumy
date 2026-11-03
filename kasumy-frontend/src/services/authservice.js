import { apiRequest } from "./apiClient";

export async function iniciarSesion(email, password) {
    const result = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, contrasena: password }),
    });

    // IMPORTANTE: Verifica en Postman cómo devuelve el token tu backend.
    // Asumimos que devuelve { success: true, data: { token, usuario } } o similar.
    const token = result.data?.token || result.token;
    const usuario = result.data?.usuario || result.data?.user || result.usuario;

    if (!token) throw new Error("Respuesta de login incompleta: falta el token");

    // Guardamos el token en la sesión del navegador
    sessionStorage.setItem("kasumi_token", token);
    sessionStorage.setItem("kasumi_user", JSON.stringify(usuario));

    return usuario;
}

export function cerrarSesion() {
    sessionStorage.removeItem("kasumi_token");
    sessionStorage.removeItem("kasumi_user");
}