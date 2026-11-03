import { useState } from "react";
import "./clientform.css";

export default function ClientForm({ onGuardar, onCancelar, guardando }) {
    const [form, setForm] = useState({
        nombre: "",
        telefono: "",
        email: "",
        direccion: ""
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onGuardar({
            nombre: form.nombre.trim(),
            telefono: form.telefono.trim(),
            email: form.email.trim(),
            direccion: form.direccion.trim()
        });
    }

    return (
        <form className="client-form" onSubmit={handleSubmit}>
            <h3>Registrar Nuevo Cliente</h3>

            <label>Nombre completo
                <input name="nombre" required value={form.nombre} onChange={handleChange} />
            </label>

            <label>Teléfono
                <input name="telefono" value={form.telefono} onChange={handleChange} />
            </label>

            <label>Correo electrónico
                <input name="email" type="email" value={form.email} onChange={handleChange} />
            </label>

            <label>Dirección
                <input name="direccion" value={form.direccion} onChange={handleChange} />
            </label>

            <div className="form-buttons">
                <button type="submit" disabled={guardando} className="btn-guardar">
                    {guardando ? "Guardando..." : "Guardar Cliente"}
                </button>
                <button type="button" onClick={onCancelar} className="btn-cancelar">
                    Cancelar
                </button>
            </div>
        </form>
    );
}