import { useEffect, useState } from "react";
import "@/styles/editempl.css"

const CARGOS = [
  { id: "1", cargo: "Gerente", horaEntrada: "08:00", horaSalida: "17:00" },
  { id: "2", cargo: "Contador", horaEntrada: "08:00", horaSalida: "16:00" },
  { id: "3", cargo: "Asistente", horaEntrada: "09:00", horaSalida: "18:00" },
  { id: "4", cargo: "Limpieza", horaEntrada: "06:00", horaSalida: "14:00" },
  { id: "5", cargo: "Otros", horaEntrada: "00:00", horaSalida: "00:00" },
];

const EditarEmpleadoModal = ({ empleado, onClose, onUpdate }) => {
  const [nombre, setNombre] = useState(empleado.nombre);
  const [apellido, setApellido] = useState(empleado.apellido);
  const [cargo, setCargo] = useState("");

  useEffect(() => {
    // Buscar el cargo del empleado y establecer el ID correcto para el select
    const cargoEmpleado = CARGOS.find((c) => c.cargo === empleado.cargo.cargo);
    if (cargoEmpleado) {
      setCargo(cargoEmpleado.id);
    }
  }, [empleado.cargo.cargo]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const cargoSeleccionado = CARGOS.find((c) => c.id === cargo);
  //   const dniNumber = parseInt(empleado.dni, 10);
  //   const empleadoActualizado = {
  //     nombre,
  //     apellido,
  //     dni: dniNumber,
  //     cargo: {
  //       cargo: cargoSeleccionado.cargo,
  //       horaEntrada: cargoSeleccionado.horaEntrada,
  //       horaSalida: cargoSeleccionado.horaSalida,
  //     },
  //   };

  //   try {
  //     const response = await fetch("http://localhost:8080/trabajador/actualizar", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(empleadoActualizado),
  //     });

  //     if (!response.ok) {
  //       console.log(JSON.stringify(empleadoActualizado))
  //       throw new Error("Error al actualizar el empleado");
  //     }

  //     onUpdate(empleadoActualizado);
  //     onClose();
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Busca el cargo seleccionado por ID en la lista de cargos
    const cargoSeleccionado = CARGOS.find((c) => c.id === cargo);
    const dniNumber = parseInt(empleado.dni, 10);
    const cargoNumber = parseInt(cargoSeleccionado.id, 10);
  
    // Crea el objeto de empleado actualizado con el ID del cargo
    const empleadoActualizado = {
      nombre,
      apellido,
      dni: dniNumber,
      Cargo: {
        id: cargoNumber,
      },
    };
  
    try {
      const response = await fetch("http://localhost:8080/trabajador/actualizar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(empleadoActualizado),
      });
  
      if (!response.ok) {
        throw new Error("Error al actualizar el empleado");
      }
  
      onUpdate(empleadoActualizado);
      onClose();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Empleado</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </label>
          <label>
            Apellido:
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </label>
          <label>
            DNI:
            <input type="text" value={empleado.dni} disabled />
          </label>
          <label>
            Cargo:
            <select value={cargo} onChange={(e) => setCargo(e.target.value)}>
              {CARGOS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.cargo}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarEmpleadoModal;
