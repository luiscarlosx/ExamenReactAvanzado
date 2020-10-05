import React from "react";

const ProductoResumen = () => {

  return (
    <div className="row jumbotron p-2">
      <div className="col-md-5">
        <p>
          <strong>Producto:</strong> nombre
        </p>
        <p>
          <strong>Precio:</strong> 200
        </p>
      </div>
      <div className="col-md-7">
        <div className="form-group">
          <label htmlFor="formGroupExampleInput">Cantidad del producto</label>
          <input
            type="number"
            className="form-control"
            placeholder="ingrese cantidad del producto"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductoResumen;
