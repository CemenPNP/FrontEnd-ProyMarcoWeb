const FechaActual = () => {
  const fecha = new Date();
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
  const año = fecha.getFullYear();

  const fechaFormateada = `${dia}/${mes}/${año}`;

  return (
      <span>{fechaFormateada}</span>
  );
};

export default FechaActual;