import { useState } from "react";
import "@/styles/formnewpersonal.css"

const FormNewPersonal = () => {
  const CARGOS = [
    { id: "1", cargo: "Gerente", horaEntrada: "08:00", horaSalida: "17:00" },
    { id: "2", cargo: "Contador", horaEntrada: "08:00", horaSalida: "16:00" },
    { id: "3", cargo: "Asistente", horaEntrada: "09:00", horaSalida: "18:00" },
    { id: "4", cargo: "Limpieza", horaEntrada: "06:00", horaSalida: "14:00" }
  ];

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    cargo: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCargo = CARGOS.find((c) => c.id === formData.cargo);

    const dniNumber = parseInt(formData.dni, 10);

    const payload = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      dni: dniNumber,
      cargo: {
        cargo: selectedCargo.cargo,
        horaEntrada: selectedCargo.horaEntrada,
        horaSalida: selectedCargo.horaSalida
      }
    };

    console.log(JSON.stringify(payload));

    try {
      const response = await fetch("http://localhost:8080/trabajador/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Error al crear el empleado");
      }

      console.log("Empleado creado exitosamente");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <form className="new-employee-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>
      <div className="form-field">
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
        />
      </div>
      <div className="form-field">
        <label htmlFor="dni">DNI:</label>
        <input
          type="number"
          id="dni"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
        />
      </div>
      <div className="form-field">
        <label htmlFor="cargo">Cargo:</label>
        <select
          id="cargo"
          name="cargo"
          value={formData.cargo}
          onChange={handleChange}
        >
          <option value="" disabled>
            Seleccionar cargo
          </option>
          {CARGOS.map((cargo) => (
            <option key={cargo.id} value={cargo.id}>
              {cargo.cargo}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="submit-button">Registrar Nuevo Personal</button>
    </form>


    // <form className="new-employee-form" onSubmit={handleSubmit}>
    //   <div className="column-1">
    //     <label htmlFor="nombre">Nombre:</label>
    //     <input
    //       type="text"
    //       id="nombre"
    //       name="nombre"
    //       value={formData.nombre}
    //       onChange={handleChange}
    //     />

    //     <label htmlFor="apellido">Apellido:</label>
    //     <input
    //       type="text"
    //       id="apellido"
    //       name="apellido"
    //       value={formData.apellido}
    //       onChange={handleChange}
    //     />
    //   </div>
    //   <div className="column-2">
    //     <label htmlFor="dni">DNI:</label>
    //     <input
    //       type="number"
    //       id="dni"
    //       name="dni"
    //       value={formData.dni}
    //       onChange={handleChange}
    //     />

    //     <label htmlFor="cargo">Cargo:</label>
    //     <select
    //       id="cargo"
    //       name="cargo"
    //       value={formData.cargo}
    //       onChange={handleChange}
    //     >
    //       <option value="" disabled>
    //         Seleccionar cargo
    //       </option>
    //       {CARGOS.map((cargo) => (
    //         <option key={cargo.id} value={cargo.id}>
    //           {cargo.cargo}
    //         </option>
    //       ))}
    //     </select>
    //   </div>
    //   <button type="submit">Registrar Nuevo Personal</button>
    // </form>
  );
};

export default FormNewPersonal;
