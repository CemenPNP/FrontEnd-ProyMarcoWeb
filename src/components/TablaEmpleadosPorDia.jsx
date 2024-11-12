import "@/styles/tablaempleadospordia.css"

const TablaEmpleadosPorDia = ({ empleados }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cargo</th>
            <th>Hora de Ingreso</th>
            <th>Hora de Salida</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado, index) => (
            <tr key={index}>
              <td>{empleado.nombre}</td>
              <td>{empleado.apellido}</td>
              <td>{empleado.cargo}</td>
              <td>{empleado.horaIngreso}</td>
              <td>{empleado.horaSalida}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaEmpleadosPorDia
