import React from "react";
import Row from "./Row";
const Tabla = ({ data }) => {
  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Empresa</th>
          <th scope="col">Email</th>
          <th scope="col">Eliminar</th>
          <th scope="col">Editar</th>
        </tr>
      </thead>
      <tbody>
        {data.map((cliente) => (
          <Row key={cliente.id} cliente={cliente} />
        ))}
      </tbody>
    </table>
  );
};

export default Tabla;
