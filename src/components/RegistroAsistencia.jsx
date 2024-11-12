import { useState } from "react"
import "@/styles/registroAsistencia.css"

const RegistroAsistencia = () => {
  const [dni, setDni] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fechaActual = new Date().toISOString().split("T")[0]
    const now = new Date()
    const horas = now.getHours().toString().padStart(2, "0")
    const minutos = now.getMinutes().toString().padStart(2, "0")
    const horaActual = `${horas}:${minutos}`

    const datosAsistencia = {
      dni: parseInt(dni, 10),
      fecha: fechaActual,
      hora: horaActual,
    }

    try {
      const response = await fetch("http://localhost:8080/asistencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosAsistencia),
      })

      if (!response.ok) {
        throw new Error("Error al registrar la asistencia")
      }

      setDni("")
      alert("Asistencia registrada con éxito")
      setIsModalOpen(false)
      window.location.reload()
    } catch (error) {
      console.error("Error:", error.message)
      alert("No se pudo registrar la asistencia: " + error.message)
    }
  }

  return (
    <div>
      <button className="card-btn" onClick={() => setIsModalOpen(true)}>
        <h2>Registrar Asistencia</h2>
        <span>→</span>
      </button>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Registrar Asistencia</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="dni">DNI:</label>
              <input
                type="number"
                id="dni"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                required
              />
              <button type="submit">Registrar</button>
              <button
                type="button"
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                Cerrar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default RegistroAsistencia
