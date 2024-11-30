const BorrarFallecido = ({ idFallecido, token }) => {
  const handleDelete = async () => {
    const confirmDelete = confirm(
      "¿Estás seguro de que deseas borrar este fallecido?"
    )

    if (!confirmDelete) return

    try {
      const response = await fetch(
        `http://localhost:8080/fallecidos/eliminar/${idFallecido}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.ok) {
        alert("Fallecido eliminado exitosamente.")
        window.location.reload()
      } else {
        const errorData = await response.json()
        alert(`Error al eliminar fallecido: ${errorData.message}`)
      }
    } catch (error) {
      console.error("Error al eliminar fallecido:", error)
      alert("Hubo un error al intentar eliminar el fallecido.")
    }
  }

  return (
    <button className="btn btn-danger btn-sm" onClick={handleDelete}>
      Borrar
    </button>
  )
}

export default BorrarFallecido
