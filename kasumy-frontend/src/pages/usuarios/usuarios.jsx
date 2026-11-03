import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
// Importamos TODAS las funciones de una vez (sin duplicar)
import {
    listarUsuarios,
    crearUsuario,
    eliminarUsuario,
    cambiarEstadoUsuario,
    actualizarUsuario,
    consultarUsuario
} from "../../services/userService";
import UserForm from "../../components/users/UserForm/UserForm";
import "./usuarios.css";

export default function UsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [usuarioAEditar, setUsuarioAEditar] = useState(null);

    // Recibimos la búsqueda del Layout
    const { busqueda } = useOutletContext();

    // Filtramos los usuarios según el texto
    const usuariosFiltrados = usuarios.filter(user =>
        user.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        user.email.toLowerCase().includes(busqueda.toLowerCase())
    );

    async function cargarUsuarios() {
        try {
            const respuesta = await listarUsuarios();
            setUsuarios(respuesta.data || respuesta);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        cargarUsuarios();
    }, []);

    async function handleGuardar(datos) {
        setGuardando(true);
        setError("");
        setMensaje("");
        try {
            if (usuarioAEditar) {
                await actualizarUsuario(usuarioAEditar.id_usuario, datos);
                setMensaje("¡Usuario actualizado exitosamente!");
            } else {
                await crearUsuario(datos);
                setMensaje("¡Usuario creado exitosamente!");
            }
            setMostrarFormulario(false);
            setUsuarioAEditar(null); // Limpiamos el estado
            await cargarUsuarios();
        } catch (err) {
            setError(err.message);
        } finally {
            setGuardando(false);
        }
    }

    async function handleEditar(id) {
        try {
            const respuesta = await consultarUsuario(id);
            setUsuarioAEditar(respuesta.data || respuesta);
            setMostrarFormulario(true);
        } catch (err) {
            setError(err.message);
        }
    }


// eliminarusuario
    async function handleEliminar(id) {
        if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
        try {
            await eliminarUsuario(id);
            setMensaje("Usuario eliminado correctamente");
            await cargarUsuarios();
        } catch (err) {
            setError(err.message);
        }
    }
// cambiar estado
    async function handleEstado(id, estadoActual) {
        if (!window.confirm("¿Seguro que deseas cambiar el estado de este usuario?")) return;
        try {
            const nuevoEstado = estadoActual === 1 ? 0 : 1;
            await cambiarEstadoUsuario(id, { estado: nuevoEstado });
            setMensaje("Estado actualizado");
            await cargarUsuarios();
        } catch (err) {
            setError(err.message);
        }
    }

    if (cargando) return <p style={{ padding: "40px" }}>Cargando usuarios...</p>;

    return (
        <main style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1 style={{ color: "#E91E63" }}>👥 Gestión de Usuarios</h1>
                <button
                    onClick={() => setMostrarFormulario(!mostrarFormulario)}
                    style={{ backgroundColor: "#2196F3", color: "white", padding: "10px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}
                >
                    {mostrarFormulario ? "Cancelar" : "+ Nuevo Usuario"}
                </button>
            </div>

            {mensaje && <p style={{ color: "green", fontWeight: "bold" }}>{mensaje}</p>}
            {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

            {mostrarFormulario && (
                <UserForm
                    onGuardar={handleGuardar}
                    onCancelar={() => setMostrarFormulario(false)}
                    guardando={guardando}
                    usuarioAEditar={usuarioAEditar}
                />
            )}

            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginTop: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#FCE4EC", color: "#333", textAlign: "left" }}>
                            <th style={{ padding: "10px", borderBottom: "2px solid #E91E63" }}>ID</th>
                            <th style={{ padding: "10px", borderBottom: "2px solid #E91E63" }}>Nombre</th>
                            <th style={{ padding: "10px", borderBottom: "2px solid #E91E63" }}>Email</th>
                            <th style={{ padding: "10px", borderBottom: "2px solid #E91E63" }}>Rol</th>
                            <th style={{ padding: "10px", borderBottom: "2px solid #E91E63" }}>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuariosFiltrados.map((user) => (
                            <tr key={user.id_usuario} style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "10px" }}>{user.id_usuario}</td>
                                <td style={{ padding: "10px" }}>{user.nombre}</td>
                                <td style={{ padding: "10px" }}>{user.email}</td>
                                <td style={{ padding: "10px" }}>{user.id_rol}</td>

                                <td style={{ padding: "10px", display: "flex", gap: "5px" }}>

                                    {/* boton editar */}
                                    <button
                                        onClick={() => handleEditar(user.id_usuario)}
                                        style={{ backgroundColor: "#FFC107", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
                                    >
                                        Editar
                                    </button>

                                    {/* Aquí conectamos la función de Estado */}
                                    <button
                                        onClick={() => handleEstado(user.id_usuario, user.activo)}
                                        style={{ backgroundColor: "#17A2B8", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", color: "white" }}
                                    >
                                        Estado
                                    </button>


                                    

                                    {/* Aquí conectamos la función de Eliminar */}
                                    <button
                                        onClick={() => handleEliminar(user.id_usuario)}
                                        style={{ backgroundColor: "#DC3545", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", color: "white" }}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}