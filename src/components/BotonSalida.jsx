const BotonSalida = ({ dni }) => {
  const handleRegistrarSalida = async () => {
    const fechaActual = new Date().toISOString().split('T')[0];
    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }).replace(':', '.');

    const data = {
      dni: dni,
      fecha: fechaActual,
      hora: horaActual,
    };

    try {
      const response = await fetch("http://localhost:8080/asistencia", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al registrar la salida");
      }

      console.log("Salida registrada exitosamente");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <button onClick={handleRegistrarSalida}>
      Registrar Salida
    </button>
  );
};

export default BotonSalida;
