import { create } from "zustand"

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  setAuthenticated: (value: boolean) => void
  setUser: (user: User | null) => void
  checkAuth: () => Promise<void>
}

interface User {
  nombre: string
  apellido: string
  correo: string
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
  setUser: (user: User | null) => set({ user }),
  checkAuth: async () => {
    try {
      const response = await fetch("/api/check-auth")
      const { authenticated, user } = await response.json()
      set({ isAuthenticated: authenticated, user: user || null })
    } catch (error) {
      console.error("Error al verificar autenticación:", error)
      set({ isAuthenticated: false, user: null })
    }
  },
}))

export default useAuthStore
