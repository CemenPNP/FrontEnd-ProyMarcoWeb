import type { Empleado, RegistroHorario } from "./interfaces";

export async function fetchEmpleados() {
  try {
    const response = await fetch('http://localhost:8080/asistencia/empleados');
    if (!response.ok) {
      throw new Error('Error al obtener los datos de empleados');
    }
    const empleados: Empleado[] = await response.json();
    const fechaActual = new Date().toISOString().split('T')[0];

    let totalEmpleados = empleados.length;
    let presentes = 0;
    let ausentes = 0;
    let jornadaCompletada = 0;

    empleados.forEach((empleado: Empleado) => {
      const registroHoy: RegistroHorario | undefined = empleado.registroHorarios.find((registro) => registro.fecha === fechaActual);

      if (registroHoy) {

        if (registroHoy.horaIngreso) {
          if(registroHoy.horaSalida){
            jornadaCompletada += 1
          }else{
            presentes += 1
          }

        } else{
          ausentes += 1;
        }
      } else {
        ausentes += 1;
      }
    });

    return {
      totalEmpleados,
      presentes,
      jornadaCompletada,
      ausentes,
    };
  } catch (error) {
    console.error(error);
    return {
      totalEmpleados: 0,
      presentes: 0,
      jornadaCompleta: 0,
      ausentes: 0,
    };
  }
}
