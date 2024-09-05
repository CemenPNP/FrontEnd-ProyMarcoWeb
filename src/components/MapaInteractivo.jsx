// import { useState } from 'react'

// const nichos = {
//   "Juan Pérez": { x: 80, y: 40 },
//   "María García": { x: 150, y: 80 },
//   "Carlos López": { x: 220, y: 120 },
// };

// export default function MapaInteractivo() {
//   const [busqueda, setBusqueda] = useState('');
//   const [nichoEncontrado, setNichoEncontrado] = useState(null);

//   const buscarNicho = () => {
//     const nicho = nichos[busqueda];
//     if (nicho) {
//       setNichoEncontrado(nicho);
//     } else {
//       alert("Difunto no encontrado");
//       setNichoEncontrado(null);
//     }
//   };

//   return (
//     <section className="container my-5">
//       <header className="mb-4">
//         <h3>Mapa Interactivo <strong className='text-danger'>[En desarrollo]</strong></h3>
//       </header>
//       <div className="row">
//         <div className="col-md-8 d-flex justify-content-center">
//           <div className="map-container ">
//             <svg width="600" height="400" viewBox="0 0 300 200">

//               <rect width="300" height="200" fill="#e6e6e6" />

//               <line x1="0" y1="100" x2="300" y2="100" stroke="#c0c0c0" strokeWidth="10" />
//               <line x1="150" y1="0" x2="150" y2="200" stroke="#c0c0c0" strokeWidth="10" />
              
//               <rect x="140" y="190" width="20" height="10" fill="#8b4513" />
//               <text x="150" y="185" textAnchor="middle" fill="#333" fontSize="10">Entrada</text>

//               <rect x="70" y="30" width="20" height="20" fill="#a9a9a9" />
//               <rect x="140" y="70" width="20" height="20" fill="#a9a9a9" />
//               <rect x="210" y="110" width="20" height="20" fill="#a9a9a9" />

//               {nichoEncontrado && (
//                 <>
//                   <line x1="150" y1="200" x2="150" y2={nichoEncontrado.y + 10} stroke="#ff0000" strokeWidth="2" />
//                   <line x1="150" y1={nichoEncontrado.y + 10} x2={nichoEncontrado.x + 10} y2={nichoEncontrado.y + 10} stroke="#ff0000" strokeWidth="2" />
//                   <circle cx={nichoEncontrado.x + 10} cy={nichoEncontrado.y + 10} r="5" fill="#ff0000" />
//                 </>
//               )}
//             </svg>
//           </div>
//         </div>
//         <div className="col-md-4 d-flex flex-column justify-content-center">
//         <form>
//           <div className="mb-3">
//             <label htmlFor="nombre" className="form-label">Nombre</label>
//             <input
//               type="text"
//               className="form-control"
//               id='nombre'
//               placeholder="Nombre del difunto"
//               value={busqueda}
//               onChange={(e) => setBusqueda(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="apellido" className="form-label">Apellido</label>
//             <input
//               type="text"
//               className="form-control"
//               id="apellido"
//               placeholder="Apellido del difunto"
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="fechaFallecimiento" className="form-label">Fecha de Fallecimiento</label>
//             <input
//               type="date"
//               className="form-control"
//               id="fechaFallecimiento"
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="seccion" className="form-label">Sección</label>
//             <select id="seccion" className="form-select">
//               <option value="">Seleccionar sección</option>
//               <option value="A">Sección A</option>
//               <option value="B">Sección B</option>
//               <option value="C">Sección C</option>
//             </select>
//           </div>
//           <button type='button' className="btn btn-success" onClick={buscarNicho}>Buscar</button>
//           {nichoEncontrado && (
//             <p className="mt-3">
//               Nicho de {busqueda} encontrado. Siga la línea roja en el mapa.
//             </p>
//           )}
//         </form>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de que Bootstrap esté importado

const nichos = {
  "Juan Pérez": { x: 80, y: 40 },
  "María García": { x: 150, y: 80 },
  "Carlos López": { x: 220, y: 120 },
};

export default function MapaInteractivo() {
  const [busqueda, setBusqueda] = useState('');
  const [nichoEncontrado, setNichoEncontrado] = useState(null);

  const buscarNicho = () => {
    const nicho = nichos[busqueda];
    if (nicho) {
      setNichoEncontrado(nicho);
    } else {
      alert("Difunto no encontrado");
      setNichoEncontrado(null);
    }
  };

  return (
    <section className="container my-5">
      <header className="mb-4">
        <h3>Mapa Interactivo <strong className="text-danger">[En desarrollo]</strong></h3>
      </header>
      <div className="row">
        <div className="col-lg-8 col-md-12 d-flex justify-content-center">
          <div className="map-container w-100">
            <svg
              viewBox="0 0 300 200"
              className="img-fluid"
            >
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
        </div>
        <div className="col-lg-4 col-md-12 d-flex flex-column justify-content-center">
          <form>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Nombre del difunto"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                placeholder="Apellido del difunto"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fechaFallecimiento" className="form-label">Fecha de Fallecimiento</label>
              <input
                type="date"
                className="form-control"
                id="fechaFallecimiento"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="seccion" className="form-label">Sección</label>
              <select id="seccion" className="form-select">
                <option value="">Seleccionar sección</option>
                <option value="A">Sección A</option>
                <option value="B">Sección B</option>
                <option value="C">Sección C</option>
              </select>
            </div>
            <button type="button" className="btn btn-success" onClick={buscarNicho}>Buscar</button>
            {nichoEncontrado && (
              <p className="mt-3">
                Nicho de {busqueda} encontrado. Siga la línea roja en el mapa.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
