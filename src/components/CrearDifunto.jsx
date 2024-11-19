import { useState } from "react"
import "@/styles/crearDifunto.css"

const AgregarDifunto = ({ correo, token }) => {
  const [nombre, setNombre] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [fechaNacimiento, setFechaNacimiento] = useState("")
  const [fechaFallecimiento, setFechaFallecimiento] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const datos = {
      correo,
      nombre,
      apellidos,
      fechaNacimiento,
      fechaFallecimiento,
    }

    try {
      console.log(JSON.stringify(datos))
      const response = await fetch("http://localhost:8080/fallecidos/crear", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      })

      if (!response.ok) {
        throw new Error("Error al agregar el difunto")
      }

      alert("Difunto agregado con éxito")
      setNombre("")
      setApellidos("")
      setFechaNacimiento("")
      setFechaFallecimiento("")
    } catch (error) {
      console.error("Error:", error.message)
      alert("No se pudo agregar el difunto: " + error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="apellidos">Apellidos:</label>
        <input
          type="text"
          id="apellidos"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
        <input
          type="date"
          id="fechaNacimiento"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="fechaFallecimiento">Fecha de Fallecimiento:</label>
        <input
          type="date"
          id="fechaFallecimiento"
          value={fechaFallecimiento}
          onChange={(e) => setFechaFallecimiento(e.target.value)}
          required
        />
      </div>
      <div className="form-buttons">
        <button type="submit">Agregar Difunto</button>
      </div>
    </form>
  )
}

export default AgregarDifunto