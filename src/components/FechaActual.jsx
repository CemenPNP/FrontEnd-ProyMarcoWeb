const FechaActual = () => {
  const fecha = new Date()
  const dia = String(fecha.getDate()).padStart(2, "0")
  const mes = String(fecha.getMonth() + 1).padStart(2, "0")
  const año = fecha.getFullYear()

  const fechaFormateada = `${dia}/${mes}/${año}`

  return <span style={{ fontSize: "1.3rem" }}>{fechaFormateada}</span>
}

export default FechaActual
