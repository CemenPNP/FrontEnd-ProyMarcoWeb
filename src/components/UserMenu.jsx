import { useEffect } from "react"
import { signOut } from "auth-astro/client"
import useAuthStore from "@/stores/authStore"
import "@/styles/userMenu.css"

const UserMenu = ({ userImage }) => {
  const { isAuthenticated, checkAuth, user } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut()
      await fetch("/api/logout", { method: "POST" })
      await checkAuth()
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  return isAuthenticated ? (
    <div className="align-items-center gap-2 d-lg-flex d-none">
      <img
        src={userImage || "/user-icon.svg"}
        alt="Foto del usuario"
        className="rounded-circle"
        width="40"
        height="40"
      />
      <div className="dropdown">
        <button
          className="btn btn-primary text-white dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        />
        <ul
          className="dropdown-menu dropdown-menu-end"
          style={{
            minWidth: "max-content",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <li>
            <span>
              <strong className="text-primary">USUARIO: </strong> {user.nombre}{" "}
              {user.apellido}
            </span>
          </li>
          <li>
            <span>
              <strong className="text-primary">CORREO : </strong>
              {user.correo}
            </span>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="/usuario">
              Usuario
            </a>
          </li>
          <li>
            <button
              className="dropdown-item"
              data-bs-toggle="modal"
              data-bs-target="#contFallecidos"
            >
              Fallecidos
            </button>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm mx-auto d-block"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <a
      href="/login"
      className="login-button text-decoration-none text-white rounded-4 px-3 py-2 d-lg-block d-none"
    >
      Iniciar sesión
    </a>
  )
}

export default UserMenu
