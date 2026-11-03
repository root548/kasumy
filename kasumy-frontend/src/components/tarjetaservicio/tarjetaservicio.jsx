import "./tarjetaservicio.css";

function TarjetaServicio({ nombre, precio, descripcion }) {
    return (
        <article className="tarjeta-servicio">
            {/* Imagen genérica de uñas/spa traída de internet */}
            <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt={nombre} />

            <div className="contenido">
                <h2>{nombre}</h2>
                <p className="descripcion">{descripcion || "Disfruta de nuestro servicio profesional."}</p>
                <p className="precio">${precio.toLocaleString('es-CO')}</p>
            </div>
        </article>
    );
}

export default TarjetaServicio;