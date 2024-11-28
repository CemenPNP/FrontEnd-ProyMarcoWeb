// src/utils/alerts.js
export function showCustomAlert(type, message) {
  const container = document.getElementById("alert-container");
  if (!container) return;

  // Crear el elemento de alerta
  const alertElement = document.createElement("div");
  alertElement.className = `alert alert-${type} alert-dismissible fade show`;
  alertElement.role = "alert";
  alertElement.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  // Agregar al contenedor
  container.appendChild(alertElement);

  // Remover automáticamente después de 5 segundos
  setTimeout(() => {
    alertElement.classList.remove("show");
    alertElement.addEventListener("transitionend", () => {
      alertElement.remove();
    });
  }, 5000);
}
