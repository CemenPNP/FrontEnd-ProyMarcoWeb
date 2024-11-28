import { useState, useEffect } from "react"
import {showCustomAlert} from "@/utils/alerts"
import useAuthStore from "@/stores/authStore"

const ReservarMisa = ({ token }) => {
  const { isAuthenticated, checkAuth, user } = useAuthStore()
  const [fallecidos, setFallecidos] = useState([])
  const [loading, setLoading] = useState(false)
  const [fecha, setFecha] = useState("")
  const [horaInicio, setHoraInicio] = useState("")
  const [tipoMisa, setTipoMisa] = useState("Misas de Réquiem")
  const [intencion, setIntencion] = useState("")
  const [idFallecido, setIdFallecido] = useState("")
  const [horasDisponibles, setHorasDisponibles] = useState([])
  const [loadingHorarios, setLoadingHorarios] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    const fetchFallecidos = async () => {
      setLoading(true)
      if (!user || !user.correo) {
        console.warn("El correo del usuario no está disponible.")
        return
      }

      try {
        const response = await fetch(
          `http://localhost:8080/fallecidos/lista?correo=${user.correo}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        if (response.ok) {
          const data = await response.json()
          setFallecidos(data)
        } else {
          setFallecidos([])
        }
      } catch (error) {
        console.error("Error al obtener fallecidos:", error)
        setFallecidos([])
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchFallecidos()
    }
  }, [token, user, isAuthenticated])

  useEffect(() => {
    if (fallecidos && fallecidos.length > 0) {
      setIdFallecido(fallecidos[0].idFallecido.toString())
    }
  }, [fallecidos])

  useEffect(() => {
    if (horasDisponibles.length > 0 && !horaInicio) {
      setHoraInicio(horasDisponibles[0])
    }
  }, [horasDisponibles])

  const handleFechaChange = async (event) => {
    const selectedFecha = event.target.value
    setFecha(selectedFecha)

    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!fechaRegex.test(selectedFecha)) {
      console.warn("Fecha incompleta o inválida:", selectedFecha)
      return
    }

    const fechaSeleccionada = new Date(selectedFecha)
    const fechaActual = new Date()
    if (fechaSeleccionada <= fechaActual) {
      setHorasDisponibles([])
      console.warn("La fecha seleccionada debe ser mayor a la fecha actual.")
      return
    }

    setHorasDisponibles([])
    setLoadingHorarios(true)

    try {
      const response = await fetch(
        `http://localhost:8080/servicio/horarios?fecha=${selectedFecha}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.ok) {
        const data = await response.json()
        const horasOcupadas = data.map((horario) => horario.horaInicio)
        setHorasDisponibles(getHorasDisponibles(horasOcupadas))
      } else {
        console.error("Error al obtener horarios:", response.status)
        setHorasDisponibles([])
      }
    } catch (error) {
      console.error("Error al obtener horarios:", error)
      setHorasDisponibles([])
    } finally {
      setLoadingHorarios(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!horaInicio || !/^\d{2}:\d{2}$/.test(horaInicio)) {
      showCustomAlert("warning", "Por favor, selecciona una hora válida.");
      return
    }
    const horaFin = calcularHoraFin(horaInicio)
    const payload = {
      fechaReserva: fecha,
      horaInicio,
      horaFin,
      intencion,
      nombreServicio: tipoMisa,
      idFallecido: parseInt(idFallecido, 10),
      correoUsuario: user.correo,
    }

    try {
      const response = await fetch("http://localhost:8080/servicio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        showCustomAlert("success", "Reserva realizada con éxito, se le enviara un correo con los datos de su reserva.");
        window.location.reload()
      } else {
        const errorData = await response.json()
        showCustomAlert("danger", `Error: ${errorData.message}`)
      }
    } catch (error) {
      console.error("Error al enviar la reserva:", error)
      showCustomAlert("danger", "Hubo un error al enviar la reserva")
    }
  }

  const calcularHoraFin = (horaInicio) => {
    const [horas, minutos] = horaInicio.split(":").map(Number)
    const nuevaHora = horas + 1
    return `${nuevaHora.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}`
  }

  const getHorasDisponibles = (horasOcupadas) => {
    const todasLasHoras = [
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
    ]
    return todasLasHoras.filter((hora) => !horasOcupadas.includes(hora))
  }

  const getFechaMinima = () => {
    const hoy = new Date()
    hoy.setDate(hoy.getDate() + 1)
    const year = hoy.getFullYear()
    const month = (hoy.getMonth() + 1).toString().padStart(2, "0")
    const day = hoy.getDate().toString().padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  if (loading) {
    return <p>Cargando...</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-body">
        {isAuthenticated === true ? (
          fallecidos.length > 0 ? (
            <>
              <div className="form-floating mb-3">
                <textarea
                  id="floatingIntencion"
                  className="form-control"
                  value={intencion}
                  onChange={(e) => setIntencion(e.target.value)}
                  required
                ></textarea>
                <label htmlFor="floatingIntencion">Intención</label>
              </div>

              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floatingTipoMisa"
                  value={tipoMisa}
                  onChange={(e) => setTipoMisa(e.target.value)}
                  required
                >
                  <option value="Misas de Réquiem">
                    Misa de Réquiem (S/ 350)
                  </option>
                  <option value="Misa de Aniversario">
                    Misa de Aniversario (S/ 300)
                  </option>
                  <option value="Misa de Cuerpo Presente">
                    Misa de Cuerpo Presente (S/ 500)
                  </option>
                  <option value="Misa de Acción de Gracias">
                    Misa de Acción de Gracias (S/ 200)
                  </option>
                  <option value="Misa de Intenciones Especiales">
                    Misa de Intenciones Especiales (S/ 250)
                  </option>
                </select>
                <label htmlFor="floatingTipoMisa">Tipo de misa</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="floatingDate"
                  value={fecha}
                  onChange={handleFechaChange}
                  min={getFechaMinima()}
                  required
                />
                <label htmlFor="floatingDate">Fecha de reserva</label>
              </div>

              <div className="form-floating mb-3">
                {loadingHorarios ? (
                  <p>Cargando horarios...</p>
                ) : (
                  <select
                    className="form-select"
                    id="floatingTime"
                    value={horaInicio}
                    onChange={(e) => setHoraInicio(e.target.value)}
                    disabled={!fecha || horasDisponibles.length === 0}
                    required
                  >
                    {horasDisponibles.length > 0 ? (
                      horasDisponibles.map((hora) => (
                        <option key={hora} value={hora}>
                          {hora}
                        </option>
                      ))
                    ) : (
                      <option disabled>No hay horas disponibles</option>
                    )}
                  </select>
                )}
                <label htmlFor="floatingTime">Hora de reserva</label>
              </div>

              <div className="form-floating">
                <select
                  className="form-select"
                  id="floatingFallecido"
                  value={idFallecido}
                  onChange={(e) => setIdFallecido(e.target.value)}
                  required
                >
                  {fallecidos.map((fallecido) => (
                    <option
                      key={fallecido.idFallecido}
                      value={fallecido.idFallecido}
                    >
                      {fallecido.nombre} {fallecido.apellidos}
                    </option>
                  ))}
                </select>
                <label htmlFor="floatingFallecido">Fallecido</label>
              </div>
              <button
                className="form-text mt-0 btn p-0 text-center d-block mx-auto"
                data-bs-toggle="modal"
                data-bs-target="#formRegistrarFallecido"
                type="button"
              >
                ¿Quiere registrar un nuevo difunto?
              </button>
            </>
          ) : (
            <>
              <h5 className="text-center">
                Registra un fallecido para hacer una reserva
              </h5>
              <button
                className="btn btn-primary text-white d-block mx-auto"
                style={{ width: "fit-content" }}
                data-bs-toggle="modal"
                data-bs-target="#formRegistrarFallecido"
                type="button"
              >
                Registrar nuevo difunto
              </button>
            </>
          )
        ) : (
          <>
            <h5 className="text-center">
              Inicia sesión para hacer una reserva
            </h5>
            <a
              href="/login"
              className="btn btn-primary text-white d-block mx-auto"
              style={{ width: "fit-content" }}
            >
              Iniciar sesión
            </a>
          </>
        )}
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-danger"
          data-bs-dismiss="modal"
          type="button"
        >
          Cerrar
        </button>
        {isAuthenticated && fallecidos.length > 0 && (
          <button className="btn btn-success" type="submit">
            Solicitar
          </button>
        )}
      </div>
    </form>
  )
}

export default ReservarMisa
