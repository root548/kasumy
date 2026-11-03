import { useState, useEffect } from "react";
import "./UserForm.css";

export default function UserForm({ onGuardar, onCancelar, guardando, usuarioAEditar }) {
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        contrasena: "",
        id_rol: "1"
    });

    // Si nos pasan un usuario para editar, llenamos el formulario
    useEffect(() => {
        if (usuarioAEditar) {
            setForm({
                nombre: usuarioAEditar.nombre || "",
                email: usuarioAEditar.email || "",
                contrasena: "", // La contraseña se deja vacía por seguridad
                id_rol: usuarioAEditar.id_rol?.toString() || "1"
            });
        }
    }, [usuarioAEditar]);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const datos = {
            nombre: form.nombre.trim(),
            email: form.email.trim(),
            id_rol: Number(form.id_rol)
        };

        // Si escribió una contraseña nueva, la enviamos
        if (form.contrasena.trim() !== "") {
            datos.contrasena = form.contrasena;
        }

        onGuardar(datos);
    }

    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <h3>{usuarioAEditar ? "Editar Usuario" : "Registrar Nuevo Usuario"}</h3>

            <label>Nombre completo
                <input name="nombre" required value={form.nombre} onChange={handleChange} />
            </label>

            <label>Correo electrónico
                <input name="email" type="email" required value={form.email} onChange={handleChange} />
            </label>

            <label>Contraseña {usuarioAEditar && "(dejar en blanco para no cambiar)"}
                <input name="contrasena" type="password" required={!usuarioAEditar} value={form.contrasena} onChange={handleChange} />
            </label>

            <label>Rol de Usuario
                <select name="id_rol" required value={form.id_rol} onChange={handleChange}>
                    <option value="1">Administrador</option>
                    <option value="2">Recepcionista</option>
                </select>
            </label>

            <div className="form-buttons">
                <button type="submit" disabled={guardando} className="btn-guardar">
                    {guardando ? "Guardando..." : "Guardar"}
                </button>
                <button type="button" onClick={onCancelar} className="btn-cancelar">
                    Cancelar
                </button>
            </div>
        </form>
    );
}