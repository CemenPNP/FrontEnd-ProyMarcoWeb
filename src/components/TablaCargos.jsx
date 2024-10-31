import { useState } from "react";

const TablaCargos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const cargos = [
    { nombre: "Gerente", horaIngreso: "08:00", horaSalida: "17:00" },
    { nombre: "Contador", horaIngreso: "09:00", horaSalida: "18:00" },
  ];

  const filteredCargos = cargos.filter((cargo) =>
    cargo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Buscar cargo..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <table className="position-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Hora de Ingreso</th>
            <th>Hora de Salida</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredCargos.map((cargo, index) => (
            <tr key={index}>
              <td>{cargo.nombre}</td>
              <td>{cargo.horaIngreso}</td>
              <td>{cargo.horaSalida}</td>
              <td>
                <button className="edit-btn">Editar</button>
                <button className="delete-btn">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaCargos;
