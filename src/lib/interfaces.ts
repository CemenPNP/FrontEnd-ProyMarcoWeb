export interface RegistroHorario {
  id: number;
  fecha: string;
  horaIngreso: string | null;
  horaSalida: string | null;
}

export interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  dni: number;
  cargo: string | null;
  registroHorarios: RegistroHorario[];
}