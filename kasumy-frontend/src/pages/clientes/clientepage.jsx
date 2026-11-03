import { useEffect, useState } from "react";
import { obtenerClientes, crearCliente } from "../../services/clientservice";
import ClientForm from "../../components/clientes/clienteform/clientform";
import "./clientepage.css";

export default function ClientesPage() {
    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [mensaje, setMensaje] = useState("");

    async function cargarClientes() {
        try {
            const datos = await obtenerClientes();
            setClientes(datos);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        cargarClientes();
    }, []);

    async function handleGuardar(datos) {
        setGuardando(true);
        setError("");
        setMensaje("");
        try {
            await crearCliente(datos);
            setMensaje("¡Cliente creado exitosamente!");
            setMostrarFormulario(false);
            await cargarClientes();
        } catch (err) {
            setError(err.message);
        } finally {
            setGuardando(false);
        }
    }

    if (cargando) return <p style={{ padding: "40px" }}>Cargando clientes...</p>;

    return (
        <div>
            <div style={{ backgroundColor: "#E91E63", color: "white", padding: "15px", borderRadius: "8px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ margin: 0 }}>👤 Gestión de Clientes</h2>
                <button
                    onClick={() => setMostrarFormulario(!mostrarFormulario)}
                    style={{ backgroundColor: "white", color: "#E91E63", padding: "8px 15px", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
                >
                    {mostrarFormulario ? "Cancelar" : "+ Nuevo Cliente"}
                </button>
            </div>

            {mensaje && <p style={{ color: "green", fontWeight: "bold" }}>{mensaje}</p>}
            {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

            {mostrarFormulario && (
                <ClientForm
                    onGuardar={handleGuardar}
                    onCancelar={() => setMostrarFormulario(false)}
                    guardando={guardando}
                />
            )}

            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#FCE4EC", color: "#333", textAlign: "left" }}>
                            <th style={{ padding: "10px", borderBottom: "2px solid #E91E63" }}>ID</th>
                            <th style={{ padding: "10px", borderBottom: "2px solid #E91E63" }}>Nombre</th>
                            <th style={{ padding: "10px", borderBottom: "2px solid #E91E63" }}>Teléfono</th>
                            <th style={{ padding: "10px", borderBottom: "2px solid #E91E63" }}>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.length === 0 ? (
                            <tr><td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>No hay clientes registrados.</td></tr>
                        ) : (
                            clientes.map((cliente) => (
                                <tr key={cliente.id_cliente} style={{ borderBottom: "1px solid #eee" }}>
                                    <td style={{ padding: "10px" }}>{cliente.id_cliente}</td>
                                    <td style={{ padding: "10px" }}>{cliente.nombre}</td>
                                    <td style={{ padding: "10px" }}>{cliente.telefono || "-"}</td>
                                    <td style={{ padding: "10px" }}>{cliente.email || "-"}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}