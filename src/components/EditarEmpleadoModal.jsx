import { useState, useEffect } from "react";
import "@/styles/editempl.css";

const EditarEmpleadoModal = ({ empleado, onClose }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [cargo, setCargo] = useState("");
  const [horaEntrada, setHoraEntrada] = useState("");
  const [horaSalida, setHoraSalida] = useState("");

  const CARGOS = [
    { cargo: "Gerente", horaEntrada: "08:00", horaSalida: "17:00" },
    { cargo: "Contador", horaEntrada: "08:00", horaSalida: "16:00" },
    { cargo: "Asistente", horaEntrada: "09:00", horaSalida: "18:00" },
    { cargo: "Limpieza", horaEntrada: "06:00", horaSalida: "14:00" },
  ];

  useEffect(() => {
    if (empleado) {
      setNombre(empleado.nombre);
      setApellido(empleado.apellido);
      setDni(empleado.dni);
      setCargo(empleado.cargo.cargo); // Solo asignamos el nombre del cargo
      setHoraEntrada(empleado.cargo.horaEntrada);
      setHoraSalida(empleado.cargo.horaSalida);
    }
  }, [empleado]);

  const handleCargoChange = (e) => {
    const selectedCargo = CARGOS.find((c) => c.cargo === e.target.value);
    setCargo(selectedCargo.cargo);
    setHoraEntrada(selectedCargo.horaEntrada);
    setHoraSalida(selectedCargo.horaSalida);
  };

  const handleGuardar = async () => {
    const datosActualizados = {
      nombre,
      apellido,
      dni, // DNI permanece sin cambios
      cargo: {
        id: empleado.cargo.id, // Mantiene el ID del cargo actual sin cambios
        cargo,
        horaEntrada,
        horaSalida,
      },
    };

    try {
      const response = await fetch(`http://localhost:8080/trabajador/actualizar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosActualizados),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el empleado");
      }

      console.log("Empleado actualizado con éxito");
      onClose();
      window.location.reload()
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Empleado</h2>
        <form>
          <div className="form-field">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="dni">DNI:</label>
            <input
              type="number"
              id="dni"
              name="dni"
              value={dni}
              disabled
            />
          </div>
          <div className="form-field">
            <label htmlFor="cargo">Cargo:</label>
            <select
              id="cargo"
              name="cargo"
              value={cargo}
              onChange={handleCargoChange}
            >
              <option value="" disabled>
                Seleccionar cargo
              </option>
              {CARGOS.map((cargoOption) => (
                <option key={cargoOption.cargo} value={cargoOption.cargo}>
                  {cargoOption.cargo}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={handleGuardar}>
              Guardar
            </button>
            <button type="button" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarEmpleadoModal;
