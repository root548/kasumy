import { useEffect, useState } from "react";
import { obtenerCitas, crearCita } from "../../services/appointmentservice";
import ModalCita from "../../components/modalcita/modalcita"; // <-- Importamos tu modal
import "./citaspage.css";

export default function CitasPage() {
    const [citas, setCitas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [mensaje, setMensaje] = useState("");

    async function cargarCitas() {
        try {
            const datos = await obtenerCitas();
            setCitas(datos);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        cargarCitas();
    }, []);

    async function handleGuardar(datos) {
        setGuardando(true);
        setError("");
        setMensaje("");
        try {
            await crearCita(datos);
            setMensaje("¡Cita agendada exitosamente!");
            setMostrarFormulario(false);
            await cargarCitas();
        } catch (err) {
            setError(err.message);
        } finally {
            setGuardando(false);
        }
    }

    if (cargando) return <p style={{ padding: "40px" }}>Cargando citas...</p>;

    return (
        <div>
            <div style={{ backgroundColor: "#E91E63", color: "white", padding: "15px", borderRadius: "8px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ margin: 0 }}>📅 Gestión de Citas</h2>
                <button
                    onClick={() => setMostrarFormulario(true)} // Abre el modal
                    style={{ backgroundColor: "white", color: "#E91E63", padding: "8px 15px", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
                >
                    + Agendar Cita
                </button>
            </div>

            {mensaje && <p style={{ color: "green", fontWeight: "bold" }}>{mensaje}</p>}
            {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

            {/* Aquí se muestra tu Modal Flotante */}
            {mostrarFormulario && (
                <ModalCita
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
                            <th style={{ padding: "10px", borderBottom: "2px solid #E91E63" }}>Fecha</th>
                            <th style={{ padding: "10px", borderBottom: "2px solid #E91E63" }}>Hora</th>
                            <th style={{ padding: "10px", borderBottom: "2px solid #E91E63" }}>Cliente</th>
                            <th style={{ padding: "10px", borderBottom: "2px solid #E91E63" }}>Servicio</th>
                            <th style={{ padding: "10px", borderBottom: "2px solid #E91E63" }}>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.length === 0 ? (
                            <tr><td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>No hay citas registradas.</td></tr>
                        ) : (
                            citas.map((cita) => (
                                <tr key={cita.id_cita} style={{ borderBottom: "1px solid #eee" }}>
                                    <td style={{ padding: "10px" }}>{cita.id_cita}</td>
                                    <td style={{ padding: "10px" }}>{cita.fecha}</td>
                                    <td style={{ padding: "10px" }}>{cita.hora}</td>
                                    <td style={{ padding: "10px" }}>{cita.nombre_cliente}</td>
                                    <td style={{ padding: "10px" }}>{cita.nombre_servicio}</td>
                                    <td style={{ padding: "10px" }}>
                                        <span style={{
                                            padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold",
                                            backgroundColor: cita.estado === 'AGENDADA' ? '#FFF8E1' : (cita.estado === 'COMPLETADA' ? '#E8F5E9' : '#FFEBEE'),
                                            color: cita.estado === 'AGENDADA' ? '#FF9800' : (cita.estado === 'COMPLETADA' ? '#4CAF50' : '#F44336')
                                        }}>
                                            {cita.estado}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}