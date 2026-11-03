import { useEffect, useState } from "react";
import { obtenerServicios } from "../../services/serviceservice"; // Importa la función que creaste
import TarjetaServicio from "../../components/tarjetaservicio/tarjetaservicio";
import "./servicios.css";

function ServiciosPage() {
    // Estados de React
    const [servicios, setServicios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    // useEffect se ejecuta al abrir la página
    useEffect(() => {
        async function cargarDatos() {
            try {
                const datos = await obtenerServicios(); // Llama al backend
                setServicios(datos);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false); // Deja de cargar
            }
        }
        cargarDatos();
    }, []);

    // Renderizado condicional
    if (cargando) return <p style={{ padding: "20px" }}>Cargando servicios...</p>;
    if (error) return <p style={{ padding: "20px", color: "red" }}>Error: {error}</p>;

    return (
        <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
            <h1>💅 Catálogo de Servicios</h1>

            {servicios.length === 0 ? (
                <p>No hay servicios registrados en Kasumi.</p>
            ) : (
                <div className="lista-servicios">
                    {servicios.map((serv) => (
                        <TarjetaServicio
                            key={serv.id_servicio}
                            nombre={serv.nombre}
                            precio={serv.precio}
                            descripcion={serv.descripcion}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}

export default ServiciosPage;