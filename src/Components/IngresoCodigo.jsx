// src/components/IngresoCodigo.jsx
import React, { useState } from 'react';
import TablaPremios from './TablaPremios';

const IngresoCodigo = () => {
  const [codigo, setCodigo] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState(new Date().toLocaleDateString());
  const [premio, setPremio] = useState('');
  const [registros, setRegistros] = useState([]);

  const handleIngresoCodigo = (e) => {
    e.preventDefault();
    if (codigo && premio) {
      const nuevoRegistro = { fecha: fechaIngreso, codigo, premio };
      setRegistros([...registros, nuevoRegistro]);
      setCodigo('');
      setPremio('');
    }
  };

  return (
    <div>
      <h2>Ingresa Código</h2>
      <form onSubmit={handleIngresoCodigo}>
        <div>
          <label>Código:</label>
          <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
        </div>
        <div>
          <label>Premio:</label>
          <input type="text" value={premio} onChange={(e) => setPremio(e.target.value)} required />
        </div>
        <button type="submit">Ingresar</button>
      </form>
      <TablaPremios registros={registros} />
    </div>
  );
};

export default IngresoCodigo;
