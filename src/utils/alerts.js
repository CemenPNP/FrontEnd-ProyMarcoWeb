export function showCustomAlert(type, message) {
  const container = document.getElementById("alert-container")
  if (!container) return

  const alertElement = document.createElement("div")
  alertElement.className = `alert alert-${type} alert-dismissible fade show`
  alertElement.role = "alert"
  alertElement.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `

  container.appendChild(alertElement)

  setTimeout(() => {
    alertElement.classList.remove("show")
    setTimeout(() => {
      alertElement.remove()
    }, 150)
  }, 5000)
}
