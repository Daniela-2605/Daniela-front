import React from 'react';

const TablaPremios = ({ registros }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Código</th>
          <th>Premio</th>
        </tr>
      </thead>
      <tbody>
        {registros.map((registro, index) => (
          <tr key={index}>
            <td>{registro.fecha}</td>
            <td>{registro.codigo}</td>
            <td>{registro.premio}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaPremios;
