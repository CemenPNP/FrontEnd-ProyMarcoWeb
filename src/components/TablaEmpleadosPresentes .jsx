import { useEffect, useState } from "react"
import BotonSalida from "./BotonSalida"
import "@/styles/tablaempleadospresentes.css"

const getColorBasedOnTime = (horaIngreso, horaEntrada) => {
  if (!horaIngreso || !horaEntrada)
    return { color: "gray", text: "Sin registro" }

  const [ingresoH, ingresoM] = horaIngreso.split(":").map(Number)
  const [entradaH, entradaM] = horaEntrada.split(":").map(Number)

  const dateIngreso = new Date()
  dateIngreso.setHours(ingresoH, ingresoM)

  const dateEntrada = new Date()
  dateEntrada.setHours(entradaH, entradaM)

  const differenceInMinutes = (dateIngreso - dateEntrada) / (1000 * 60)

  if (differenceInMinutes < 0) return { color: "green", text: "Llegó a tiempo" }
  if (differenceInMinutes <= 10)
    return { color: "orange", text: "Retraso menor a 10 min" }
  return { color: "red", text: "Retraso mayor a 10 min" }
}

const TablaEmpleadosPresentes = () => {
  const [empleados, setEmpleados] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([])

  useEffect(() => {
    const obtenerEmpleados = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/asistencia/empleados"
        )
        if (!response.ok) throw new Error("Error al obtener los empleados")

        const empleadosData = await response.json()
        const fechaActual = new Date().toISOString().split("T")[0]

        const empleadosPresentes = empleadosData.filter((empleado) =>
          empleado.registroHorarios.some(
            (registro) => registro.fecha === fechaActual && registro.horaIngreso
          )
        )

        setEmpleados(empleadosPresentes)
        setEmpleadosFiltrados(empleadosPresentes)
      } catch (error) {
        console.error("Error:", error.message)
      }
    }

    obtenerEmpleados()
  }, [])

  const handleBusqueda = (e) => {
    const valor = e.target.value.toLowerCase()
    setBusqueda(valor)

    const filtrados = empleados.filter((empleado) =>
      [empleado.nombre, empleado.apellido, empleado.dni.toString()].some(
        (dato) => dato.toLowerCase().includes(valor)
      )
    )

    setEmpleadosFiltrados(filtrados)
  }

  return (
    <div className="tabla-empleados-container">
      <input
        type="text"
        className="tabla-empleados-busqueda"
        placeholder="Buscar por nombre, apellido o DNI"
        value={busqueda}
        onChange={handleBusqueda}
      />
      <div className="tabla-empleados-wrapper">
        <table className="tabla-empleados">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>Hora de Ingreso</th>
              <th>Hora de Salida</th>
            </tr>
          </thead>
          <tbody>
            {empleadosFiltrados.length > 0 ? (
              empleadosFiltrados.map((empleado) => {
                const registroHoy = empleado.registroHorarios.find(
                  (registro) =>
                    registro.fecha === new Date().toISOString().split("T")[0]
                )
                const horaEntrada = empleado.cargo.horaEntrada
                const { color, text } = getColorBasedOnTime(
                  registroHoy.horaIngreso,
                  horaEntrada
                )

                return (
                  <tr key={empleado.id}>
                    <td>{empleado.nombre}</td>
                    <td>{empleado.apellido}</td>
                    <td>{empleado.dni}</td>
                    <td>
                      <span
                        className={`tooltip tooltip-${color}`}
                        data-tooltip={text}
                      ></span>
                      {registroHoy.horaIngreso}
                    </td>
                    <td>
                      {registroHoy.horaSalida ? (
                        registroHoy.horaSalida
                      ) : (
                        <BotonSalida
                          key={empleado.id}
                          dni={empleado.dni}
                          client:load
                        />
                      )}
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="5">No hay empleados presentes</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TablaEmpleadosPresentes
