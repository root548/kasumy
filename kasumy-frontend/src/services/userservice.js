import { apiRequest } from "./apiClient";

export const listarUsuarios = () => apiRequest("/users");

export const crearUsuario = (data) => apiRequest("/users", {
    method: "POST",
    body: JSON.stringify(data),
});

export const consultarUsuario = (id) => apiRequest(`/users/${id}`);

export const actualizarUsuario = (id, data) => apiRequest(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
});

export const cambiarEstadoUsuario = (id, data) => apiRequest(`/users/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify(data),
});

export const eliminarUsuario = (id) => apiRequest(`/users/${id}`, {
    method: "DELETE",
});