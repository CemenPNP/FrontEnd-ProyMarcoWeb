// import { useEffect, useState } from 'react';
// import TablaEmpleadosPorDia from '@/components/TablaEmpleadosPorDia';
// import "@/styles/historialasistencia.css"

// const HistorialAsistencia = () => {
//   const [empleadosPorFecha, setEmpleadosPorFecha] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/asistencia/empleados');
//         const data = await response.json();

//         // Agrupar empleados por fecha
//         const groupedByDate = data.reduce((acc, empleado) => {
//           empleado.registroHorarios.forEach((registro) => {
//             const fecha = registro.fecha;
//             if (!acc[fecha]) {
//               acc[fecha] = [];
//             }
//             acc[fecha].push({
//               nombre: empleado.nombre,
//               apellido: empleado.apellido,
//               cargo: empleado.cargo.cargo,
//               horaIngreso: registro.horaIngreso,
//               horaSalida: registro.horaSalida,
//             });
//           });
//           return acc;
//         }, {});

//         setEmpleadosPorFecha(groupedByDate);
//       } catch (error) {
//         console.error('Error al obtener los datos:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Historial de Asistencia</h1>
//       {Object.keys(empleadosPorFecha).map((fecha) => (
//         <div key={fecha}>
//           <h2>{fecha}</h2>
//           <TablaEmpleadosPorDia empleados={empleadosPorFecha[fecha]} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HistorialAsistencia;
import { useEffect, useState } from 'react';
import TablaEmpleadosPorDia from '@/components/TablaEmpleadosPorDia';
import "@/styles/historialasistencia.css";

const HistorialAsistencia = () => {
  const [empleadosPorFecha, setEmpleadosPorFecha] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/asistencia/empleados');
        const data = await response.json();

        // Agrupar empleados por fecha
        const groupedByDate = data.reduce((acc, empleado) => {
          empleado.registroHorarios.forEach((registro) => {
            const fecha = registro.fecha;
            if (!acc[fecha]) {
              acc[fecha] = [];
            }
            acc[fecha].push({
              nombre: empleado.nombre,
              apellido: empleado.apellido,
              cargo: empleado.cargo.cargo,
              horaIngreso: registro.horaIngreso,
              horaSalida: registro.horaSalida,
            });
          });
          return acc;
        }, {});

        setEmpleadosPorFecha(groupedByDate);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="historial-container">
      <h1>Historial de Asistencia</h1>
      {Object.keys(empleadosPorFecha).map((fecha) => (
        <div className="fecha-container" key={fecha}>
          <h2>{fecha}</h2>
          <TablaEmpleadosPorDia empleados={empleadosPorFecha[fecha]} />
        </div>
      ))}
    </div>
  );
};

export default HistorialAsistencia;
