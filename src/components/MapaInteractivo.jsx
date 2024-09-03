import { useState } from 'react'

// Simulación de datos de nichos
const nichos = {
  "Juan Pérez": { x: 80, y: 40 },
  "María García": { x: 150, y: 80 },
  "Carlos López": { x: 220, y: 120 },
}

export default function MapaInteractivo() {
  const [busqueda, setBusqueda] = useState('')
  const [nichoEncontrado, setNichoEncontrado] = useState(null)

  const buscarNicho = () => {
    const nicho = nichos[busqueda]
    if (nicho) {
      setNichoEncontrado(nicho)
    } else {
      alert("Difunto no encontrado")
      setNichoEncontrado(null)
    }
  }

  return (
    <section>
      <header>
        <h3>Mapa Interactivo del Camposanto Santa Rosa</h3>
      </header>
      <div>
        <div>
          <input
            type="text"
            placeholder="Buscar difunto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button onClick={buscarNicho}>Buscar</button>
        </div>
        <div>
          <svg width="300" height="200" viewBox="0 0 300 200">
            {/* Fondo del cementerio */}
            <rect width="300" height="200" fill="#e6e6e6" />
            
            {/* Caminos */}
            <line x1="0" y1="100" x2="300" y2="100" stroke="#c0c0c0" strokeWidth="10" />
            <line x1="150" y1="0" x2="150" y2="200" stroke="#c0c0c0" strokeWidth="10" />
            
            {/* Entrada */}
            <rect x="140" y="190" width="20" height="10" fill="#8b4513" />
            <text x="150" y="185" textAnchor="middle" fill="#333" fontSize="10">Entrada</text>

            {/* Nichos (simplificados como rectángulos) */}
            <rect x="70" y="30" width="20" height="20" fill="#a9a9a9" />
            <rect x="140" y="70" width="20" height="20" fill="#a9a9a9" />
            <rect x="210" y="110" width="20" height="20" fill="#a9a9a9" />

            {/* Camino resaltado si se encuentra un nicho */}
            {nichoEncontrado && (
              <>
                <line x1="150" y1="200" x2="150" y2={nichoEncontrado.y + 10} stroke="#ff0000" strokeWidth="2" />
                <line x1="150" y1={nichoEncontrado.y + 10} x2={nichoEncontrado.x + 10} y2={nichoEncontrado.y + 10} stroke="#ff0000" strokeWidth="2" />
                <circle cx={nichoEncontrado.x + 10} cy={nichoEncontrado.y + 10} r="5" fill="#ff0000" />
              </>
            )}
          </svg>
        </div>
        {nichoEncontrado && (
          <p>
            Nicho de {busqueda} encontrado. Siga la línea roja en el mapa.
          </p>
        )}
      </div>
    </section>
  )
}