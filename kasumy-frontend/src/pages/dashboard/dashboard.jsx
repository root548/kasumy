import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
    const { user } = useAuth();

    const [stats, setStats] = useState({ totalCitas: 0, totalClientes: 0, totalEspecialistas: 0, totalServicios: 0 });

    useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL;
        fetch(`${API_URL}/reports/dashboard`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setStats(data.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            {/* Título de la página */}
            <div style={{ backgroundColor: "#E91E63", color: "white", padding: "15px", borderRadius: "8px", marginBottom: "20px", textAlign: "center" }}>
                <h2 style={{ margin: 0 }}>📊 Dashboard</h2>
            </div>

            <p><strong>Bienvenido, {user?.nombre || "Administrador"}</strong></p>

            {/* Tarjetas de estadísticas */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "30px" }}>

                <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: "15px" }}>
                    <div style={{ fontSize: "30px", backgroundColor: "#FCE4EC", padding: "15px", borderRadius: "50%" }}>📅</div>
                    <div>
                        <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>Citas</p>
                        <h3 style={{ margin: 0, fontSize: "24px" }}>{stats.totalCitas}</h3>
                        <a href="/citas" style={{ fontSize: "12px", color: "#E91E63", textDecoration: "none" }}>+ Nueva</a>
                    </div>
                </div>

                <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: "15px" }}>
                    <div style={{ fontSize: "30px", backgroundColor: "#FCE4EC", padding: "15px", borderRadius: "50%" }}>👤</div>
                    <div>
                        <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>Clientes</p>
                        <h3 style={{ margin: 0, fontSize: "24px" }}>{stats.totalClientes}</h3>
                        <a href="/clientes" style={{ fontSize: "12px", color: "#E91E63", textDecoration: "none" }}>+ Nuevo</a>
                    </div>
                </div>

                <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: "15px" }}>
                    <div style={{ fontSize: "30px", backgroundColor: "#FCE4EC", padding: "15px", borderRadius: "50%" }}>💇</div>
                    <div>
                        <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>Especialistas</p>
                        <h3 style={{ margin: 0, fontSize: "24px" }}>{stats.totalEspecialistas}</h3>
                    </div>
                </div>

                <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: "15px" }}>
                    <div style={{ fontSize: "30px", backgroundColor: "#FCE4EC", padding: "15px", borderRadius: "50%" }}>💅</div>
                    <div>
                        <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>Servicios</p>
                        <h3 style={{ margin: 0, fontSize: "24px" }}>{stats.totalServicios}</h3>
                        <a href="/servicios" style={{ fontSize: "12px", color: "#E91E63", textDecoration: "none" }}>+ Nuevo</a>
                    </div>
                </div>

            </div>

            {/* Tabla de Citas */}
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", width: "100%", overflow: "hidden" }}>
                <h3>📋 Citas de hoy</h3>

                {/* CONTENEDOR DEL SCROLL CORREGIDO */}
                <div style={{ overflowX: "auto", width: "100%", maxWidth: "100%" }}>

                    {/* TABLA CON ANCHO MINIMO REDUCIDO */}
                    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px", minWidth: "500px" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#FCE4EC", textAlign: "left" }}>
                                <th style={{ padding: "10px" }}>Hora</th>
                                <th style={{ padding: "10px" }}>Cliente</th>
                                <th style={{ padding: "10px" }}>Servicio</th>
                                <th style={{ padding: "10px" }}>Estado</th>
                                <th style={{ padding: "10px" }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "10px" }}>10:00</td>
                                <td style={{ padding: "10px" }}>María Pérez</td>
                                <td style={{ padding: "10px" }}>Manicura</td>
                                <td style={{ padding: "10px" }}><span style={{ backgroundColor: "#E8F5E9", color: "#4CAF50", padding: "4px 8px", borderRadius: "12px", fontSize: "12px", whiteSpace: "nowrap" }}>✅ Confirmada</span></td>
                                <td style={{ padding: "10px" }}>✏️ 🗑️</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "10px" }}>11:30</td>
                                <td style={{ padding: "10px" }}>Juan Gómez</td>
                                <td style={{ padding: "10px" }}>Pedicura</td>
                                <td style={{ padding: "10px" }}><span style={{ backgroundColor: "#FFF8E1", color: "#FF9800", padding: "4px 8px", borderRadius: "12px", fontSize: "12px", whiteSpace: "nowrap" }}>⏳ Pendiente</span></td>
                                <td style={{ padding: "10px" }}>✏️ 🗑️</td>
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>

        </div>
    );
}