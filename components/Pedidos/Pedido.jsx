import React from "react";

const Pedido = () => {
  return (
    <div className="card" style={{ width: "100%" }}>
      <div className="card-body">
        <div className="row">
          <div className="col-md-5">
            <h5>Cliente</h5>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Nombre:</strong> nombre y apellido
              </li>
              <li className="list-group-item">
                <strong>Email: </strong> correo@correo.com
              </li>
              <li className="list-group-item">
                <strong>Teléfono:</strong> telefono
              </li>
              <li className="list-group-item d-flex">
                <strong style={{ flex: "0 0 35%" }}>Estado Pedido:</strong>{" "}
                <select
                  style={{ flex: "0 0 50%" }}
                  className="form-control form-control-sm"
                >
                  <option value="COMPLETADO">COMPLETADO</option>
                  <option value="PENDIENTE">PENDIENTE</option>
                  <option value="CANCELADO">CANCELADO</option>
                </select>
              </li>
            </ul>
          </div>
          <div className="col-md-7">
            <h5>Resumen del Pedido</h5>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Producto:</strong> nombre
              </li>
              <li className="list-group-item">
                <strong>Cantidad</strong> cantidad
              </li>
              <li className="list-group-item">
                <strong>Total a pagar:</strong> S/ 100
              </li>
              <li className="list-group-item d-flex">
                <button
                  type="button"
                  className="btn btn-danger btn-sm btn-block"
                >
                  Eliminar
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pedido;
