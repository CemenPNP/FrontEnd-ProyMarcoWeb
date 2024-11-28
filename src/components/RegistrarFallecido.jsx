import { showCustomAlert } from "@/utils/alerts"
import { useState } from "react"

const RegistrarFallecido = ({ correo, token }) => {
  const [nombre, setNombre] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [fechaNacimiento, setFechaNacimiento] = useState("")
  const [fechaFallecimiento, setFechaFallecimiento] = useState("")

  const validarTexto = (texto) => /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(texto)
  const validarFechas = () => {
    const nacimiento = new Date(fechaNacimiento)
    const fallecimiento = new Date(fechaFallecimiento)
    const hoy = new Date()

    if (nacimiento > hoy) {
      showCustomAlert("warning","La fecha de nacimiento no puede ser en el futuro.")
      return false
    }
    if (fallecimiento < nacimiento) {
      showCustomAlert("warning","La fecha de fallecimiento no puede ser anterior a la fecha de nacimiento.")
      return false
    }
    if (fallecimiento > hoy) {
      showCustomAlert("warning","La fecha de fallecimiento no puede ser en el futuro.")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validarTexto(nombre)) {
      showCustomAlert("warning","El nombre solo debe contener letras y espacios.")
      return
    }
    if (!validarTexto(apellidos)) {
      showCustomAlert("warning","Los apellidos solo deben contener letras y espacios.")
      return
    }

    if (!validarFechas()) {
      return
    }

    const datos = {
      correo,
      nombre,
      apellidos,
      fechaNacimiento,
      fechaFallecimiento,
    }

    try {
      const response = await fetch("http://localhost:8080/fallecidos/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datos),
      })

      if (response.ok) {
        showCustomAlert("success","Difunto registrado correctamente!")
        window.location.reload()
      } else {
        showCustomAlert("danger","Error al agregar el difunto")
        throw new Error("Error al agregar el difunto")
      }
    } catch (error) {
      console.error("Error:", error.message)
      showCustomAlert("danger",`No se pudo agregar el difunto: ${error.message}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-body">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingName"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <label htmlFor="floatingName">Nombre</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingLastName"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required
          />
          <label htmlFor="floatingLastName">Apellido</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            id="floatingBirthDate"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
          <label htmlFor="floatingBirthDate">Fecha de nacimiento</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            id="floatingDeathDate"
            value={fechaFallecimiento}
            onChange={(e) => setFechaFallecimiento(e.target.value)}
            required
          />
          <label htmlFor="floatingDeathDate">Fecha de fallecimiento</label>
        </div>
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-danger"
          data-bs-dismiss="modal"
          type="button"
        >
          Cerrar
        </button>
        <button className="btn btn-success" type="submit">
          Registrar
        </button>
      </div>
    </form>
  )
}

export default RegistrarFallecido
