import { useState, useEffect } from "react";
import "./modalcita.css";

export default function ModalCita({ onGuardar, onCancelar, guardando }) {
    // Estados para guardar las listas que vienen de la base de datos
    const [clientes, setClientes] = useState([]);
    const [especialistas, setEspecialistas] = useState([]);
    const [servicios, setServicios] = useState([]);

    const [form, setForm] = useState({
        fecha: "",
        hora: "",
        id_cliente: "",
        id_especialista: "",
        id_servicio: "",
        observaciones: ""
    });

    const API_URL = import.meta.env.VITE_API_URL;

    // Al abrir el modal, cargamos las listas desde el backend
    useEffect(() => {
        async function cargarDatos() {
            try {
                const resClientes = await fetch(`${API_URL}/clientes`).then(r => r.json());
                const resEspecialistas = await fetch(`${API_URL}/specialists`).then(r => r.json());
                const resServicios = await fetch(`${API_URL}/services`).then(r => r.json());

                // Validamos si la respuesta viene en .data o directo
                setClientes(resClientes.data || resClientes);
                setEspecialistas(resEspecialistas.data || resEspecialistas);
                setServicios(resServicios.data || resServicios);
            } catch (err) {
                console.error("Error cargando datos para el modal", err);
            }
        }
        cargarDatos();
    }, []);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onGuardar({
            fecha: form.fecha,
            hora: form.hora,
            id_cliente: Number(form.id_cliente),
            id_especialista: Number(form.id_especialista),
            id_servicio: Number(form.id_servicio),
            observaciones: form.observaciones
        });
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Agendar Nueva Cita</h3>

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label>Fecha
                            <input name="fecha" type="date" required value={form.fecha} onChange={handleChange} />
                        </label>
                        <label>Hora
                            <input name="hora" type="time" required value={form.hora} onChange={handleChange} />
                        </label>
                    </div>

                    <label>Seleccionar Cliente
                        <select name="id_cliente" required value={form.id_cliente} onChange={handleChange}>
                            <option value="">-- Seleccione un cliente --</option>
                            {clientes.map(c => (
                                <option key={c.id_cliente} value={c.id_cliente}>{c.nombre}</option>
                            ))}
                        </select>
                    </label>

                    <label>Seleccionar Especialista
                        <select name="id_especialista" required value={form.id_especialista} onChange={handleChange}>
                            <option value="">-- Seleccione un especialista --</option>
                            {especialistas.map(e => (
                                <option key={e.id_especialista} value={e.id_especialista}>{e.nombre}</option>
                            ))}
                        </select>
                    </label>

                    <label>Seleccionar Servicio
                        <select name="id_servicio" required value={form.id_servicio} onChange={handleChange}>
                            <option value="">-- Seleccione un servicio --</option>
                            {servicios.map(s => (
                                <option key={s.id_servicio} value={s.id_servicio}>{s.nombre} - ${s.precio}</option>
                            ))}
                        </select>
                    </label>

                    <label>Observaciones (Opcional)
                        <textarea name="observaciones" value={form.observaciones} onChange={handleChange} />
                    </label>

                    <div className="modal-buttons">
                        <button type="submit" disabled={guardando} className="btn-guardar">
                            {guardando ? "Agendando..." : "Guardar Cita"}
                        </button>
                        <button type="button" onClick={onCancelar} className="btn-cancelar">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}