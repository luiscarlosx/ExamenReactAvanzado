import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const AsignarCliente = (props) => {
  


  return (
    <Select
      instanceId={props.instanceId}
      options={options}
      placeholder="seleccione opcion"
      noOptionsMessage={() => "No hay resultados"}
    />
  );
};

export default AsignarCliente;
