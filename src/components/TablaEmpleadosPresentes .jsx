import { useEffect, useState } from "react";
import BotonSalida from "./BotonSalida";

const TablaEmpleadosPresentes = () => {
  const [empleados, setEmpleados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);

  useEffect(() => {
    const obtenerEmpleados = async () => {
      try {
        const response = await fetch("http://localhost:8080/asistencia/empleados");
        if (!response.ok) {
          throw new Error("Error al obtener los empleados");
        }

        const empleadosData = await response.json();
        const fechaActual = new Date().toISOString().split("T")[0];

        const empleadosPresentes = empleadosData.filter((empleado) => {
          const registroHoy = empleado.registroHorarios.find(
            (registro) => registro.fecha === fechaActual
          );
          return registroHoy && registroHoy.horaIngreso;
        });

        setEmpleados(empleadosPresentes);
        setEmpleadosFiltrados(empleadosPresentes);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    obtenerEmpleados();
  }, []);

  const handleBusqueda = (e) => {
    const valor = e.target.value.toLowerCase();
    setBusqueda(valor);

    const filtrados = empleados.filter((empleado) => {
      return (
        empleado.nombre.toLowerCase().includes(valor) ||
        empleado.apellido.toLowerCase().includes(valor) ||
        empleado.dni.toString().includes(valor)
      );
    });

    setEmpleadosFiltrados(filtrados);
  };

  return (
    <div>
      <h2>Empleados Presentes</h2>
      <input
        type="text"
        placeholder="Buscar por nombre, apellido o DNI"
        value={busqueda}
        onChange={handleBusqueda}
        style={{ padding: "10px", marginBottom: "20px", width: "95%", marginLeft: "auto", marginRight: "auto" }}
      />
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Nombre</th>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Apellido</th>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>DNI</th>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Hora de Ingreso</th>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Hora de Salida</th>
          </tr>
        </thead>
        <tbody>
          {empleadosFiltrados.length > 0 ? (
            empleadosFiltrados.map((empleado) => {
              const registroHoy = empleado.registroHorarios.find(
                (registro) => registro.fecha === new Date().toISOString().split("T")[0]
              );

              return (
                <tr key={empleado.id}>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{empleado.nombre}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{empleado.apellido}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{empleado.dni}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{registroHoy.horaIngreso}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                    {registroHoy.horaSalida ? (
                      registroHoy.horaSalida
                    ) : (
                      <BotonSalida key={empleado.id} dni={empleado.dni} client:load/>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" style={{ padding: "10px", textAlign: "center" }}>
                No hay empleados presentes
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaEmpleadosPresentes;