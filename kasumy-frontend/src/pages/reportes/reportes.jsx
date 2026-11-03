import { useEffect, useState } from "react";
import "./reportes.css";

export default function ReportesPage() {
    const [stats, setStats] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL;

        fetch(`${API_URL}/reports`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setStats(data.data);
                setCargando(false);
            })
            .catch(err => {
                console.error(err);
                setCargando(false);
            });
    }, []);

    if (cargando) return <p style={{ padding: "40px" }}>Calculando estadísticas...</p>;

    return (
        <div>
            <div style={{ backgroundColor: "#E91E63", color: "white", padding: "15px", borderRadius: "8px", marginBottom: "20px", textAlign: "center" }}>
                <h2 style={{ margin: 0 }}>📊 Reportes en Tiempo Real</h2>
            </div>

            <p><strong>Datos extraídos directamente de MySQL</strong></p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>

                {/* Ventas Totales */}
                <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: "15px" }}>
                    <div style={{ fontSize: "30px", backgroundColor: "#FCE4EC", padding: "15px", borderRadius: "50%" }}>💰</div>
                    <div>
                        <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>Ingresos (Completadas)</p>
                        <h3 style={{ margin: 0, fontSize: "24px" }}>${stats?.totalVentas.toLocaleString('es-CO')}</h3>
                    </div>
                </div>

                {/* Total Citas */}
                <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: "15px" }}>
                    <div style={{ fontSize: "30px", backgroundColor: "#FCE4EC", padding: "15px", borderRadius: "50%" }}>📅</div>
                    <div>
                        <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>Citas Totales</p>
                        <h3 style={{ margin: 0, fontSize: "24px" }}>{stats?.totalCitas}</h3>
                    </div>
                </div>

                {/* Total Clientes */}
                <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: "15px" }}>
                    <div style={{ fontSize: "30px", backgroundColor: "#FCE4EC", padding: "15px", borderRadius: "50%" }}>👤</div>
                    <div>
                        <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>Clientes Registrados</p>
                        <h3 style={{ margin: 0, fontSize: "24px" }}>{stats?.totalClientes}</h3>
                    </div>
                </div>

                {/* Servicio Top */}
                <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: "15px" }}>
                    <div style={{ fontSize: "30px", backgroundColor: "#FCE4EC", padding: "15px", borderRadius: "50%" }}>🏆</div>
                    <div>
                        <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>Servicio Top</p>
                        <h3 style={{ margin: 0, fontSize: "20px" }}>{stats?.topServicio}</h3>
                    </div>
                </div>

            </div>
        </div>
    );
}