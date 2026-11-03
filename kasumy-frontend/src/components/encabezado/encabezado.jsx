import "./encabezado.css";

function Encabezado() {
    return (
        <header className="encabezado" style={{ backgroundColor: "#E91E63", color: "white", padding: "20px", textAlign: "center" }}>
            <h1>🌸 Kasumi</h1>
            <p>Sistema de Gestión de Citas</p>
        </header>
    );
}

export default Encabezado;