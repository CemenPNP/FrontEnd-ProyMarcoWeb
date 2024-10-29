import { useState } from 'react';

const RegistroAsistencia = () => {
  const [dni, setDni] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const fechaActual = new Date().toISOString().split('T')[0];
    
    const now = new Date();
    const horas = now.getHours().toString().padStart(2, '0');
    const minutos = now.getMinutes().toString().padStart(2, '0');
    const horaActual = `${horas}.${minutos}`;

    const datosAsistencia = {
      dni: parseInt(dni, 10), 
      fecha: fechaActual,
      hora: horaActual,
    };

    try {
      const response = await fetch('http://localhost:8080/asistencia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosAsistencia),
      });

      if (!response.ok) {
        throw new Error('Error al registrar la asistencia');
      }

      setDni('');
      alert('Asistencia registrada con éxito');
    } catch (error) {
      console.error('Error:', error.message);
      alert('No se pudo registrar la asistencia: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <label htmlFor="dni" style={{ fontWeight: 'bold' }}>DNI:</label>
      <input
        type="number"
        id="dni"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        required
        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Registrar
      </button>
    </form>
  );
};

export default RegistroAsistencia;