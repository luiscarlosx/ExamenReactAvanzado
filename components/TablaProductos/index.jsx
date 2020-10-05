import React from "react";
import Row from "./Row";
const Table = ({ data }) => {
  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Existencia</th>
          <th scope="col">Precio</th>
          <th scope="col">Eliminar</th>
          <th scope="col">Editar</th>
        </tr>
      </thead>
      <tbody>
        {data.map((producto) => (
            <Row key={producto.id} producto={producto} />
          ))}
      </tbody>
    </table>
  );
};

export default Table;
