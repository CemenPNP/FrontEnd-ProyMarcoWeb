// import { useEffect, useState } from "react";
// import EditarEmpleadoModal from "./EditarEmpleadoModal";
// import "@/styles/tablaempleados.css"

// const TablaEmpleados = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [empleados, setEmpleados] = useState([]);

//   useEffect(() => {
//     const obtenerEmpleados = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/trabajador/todos");
//         if (!response.ok) {
//           throw new Error("Error al obtener los empleados");
//         }

//         const empleadosData = await response.json();
//         setEmpleados(empleadosData);
//       } catch (error) {
//         console.error("Error:", error.message);
//       }
//     };

//     obtenerEmpleados();
//   }, []);

//   const eliminarEmpleado = async (dni) => {
//     const confirmacion = window.confirm(
//       `¿Estás seguro de que deseas eliminar al empleado con DNI: ${dni}?`
//     );
//     if (!confirmacion) return;

//     try {
//       const response = await fetch(`http://localhost:8080/trabajador/eliminar/${dni}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Error al eliminar el empleado");
//       }

//       setEmpleados((prevEmpleados) =>
//         prevEmpleados.filter((empleado) => empleado.dni !== dni)
//       );

//       console.log(`Empleado con DNI ${dni} eliminado exitosamente`);
//     } catch (error) {
//       console.error("Error:", error.message);
//     }
//   };

//   const filteredEmpleados = empleados.filter(
//     (empleado) =>
//       empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       empleado.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       empleado.dni.toString().includes(searchTerm)
//   );

//   return (
//     <div className="table-container">
//       <input
//         type="text"
//         placeholder="Buscar empleado..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="search-input"
//       />
//       <div className="table-responsive">
//         <table className="table-empleados">
//           <thead>
//             <tr>
//               <th>Nombre</th>
//               <th>Apellido</th>
//               <th>DNI</th>
//               <th>Cargo</th>
//               <th>Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEmpleados.length > 0 ? (
//               filteredEmpleados.map((empleado) => (
//                 <tr key={empleado.id}>
//                   <td>{empleado.nombre}</td>
//                   <td>{empleado.apellido}</td>
//                   <td>{empleado.dni}</td>
//                   <td>{empleado.cargo.cargo}</td>
//                   <td>
//                     <button
//                       className="action-btn eliminar"
//                       onClick={() => eliminarEmpleado(empleado.dni)}
//                     >
//                       Eliminar
//                     </button>
//                     <EditarEmpleadoModal />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="no-employees-message">
//                   No hay empleados disponibles.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TablaEmpleados;
import { useEffect, useState } from "react";
import EditarEmpleadoModal from "./EditarEmpleadoModal";
import "@/styles/tablaempleados.css";

const TablaEmpleados = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [empleados, setEmpleados] = useState([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);

  useEffect(() => {
    const obtenerEmpleados = async () => {
      try {
        const response = await fetch("http://localhost:8080/trabajador/todos");
        if (!response.ok) {
          throw new Error("Error al obtener los empleados");
        }

        const empleadosData = await response.json();
        setEmpleados(empleadosData);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    obtenerEmpleados();
  }, []);

  const eliminarEmpleado = async (dni) => {
    const confirmacion = window.confirm(
      `¿Estás seguro de que deseas eliminar al empleado con DNI: ${dni}?`
    );
    if (!confirmacion) return;

    try {
      const response = await fetch(`http://localhost:8080/trabajador/eliminar/${dni}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el empleado");
      }

      setEmpleados((prevEmpleados) =>
        prevEmpleados.filter((empleado) => empleado.dni !== dni)
      );

      console.log(`Empleado con DNI ${dni} eliminado exitosamente`);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const filteredEmpleados = empleados.filter(
    (empleado) =>
      empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.dni.toString().includes(searchTerm)
  );

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Buscar empleado..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="table-responsive">
        <table className="table-empleados">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>Cargo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmpleados.length > 0 ? (
              filteredEmpleados.map((empleado) => (
                <tr key={empleado.id}>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.apellido}</td>
                  <td>{empleado.dni}</td>
                  <td>{empleado.cargo.cargo}</td>
                  <td>
                    <button
                      className="action-btn eliminar"
                      onClick={() => eliminarEmpleado(empleado.dni)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="action-btn editar"
                      onClick={() => setEmpleadoSeleccionado(empleado)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-employees-message">
                  No hay empleados disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {empleadoSeleccionado && (
        <EditarEmpleadoModal
          empleado={empleadoSeleccionado}
          onClose={() => setEmpleadoSeleccionado(null)}
        />
      )}
    </div>
  );
};

export default TablaEmpleados;
