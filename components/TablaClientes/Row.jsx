import React from "react";
import Swal from "sweetalert2";
import Router from "next/router";
import { gql, useMutation } from "@apollo/client";

const ELIMINAR_CLIENTE = gql`
  mutation eliminarCliente($id: ID!) {
    eliminarCliente(id: $id)
  }
`;

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const Row = ({ cliente }) => {
  const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
    update(cache) {
      if (cache.data.data.ROOT_QUERY) {
        const { obtenerClientesVendedor } = cache.readQuery({
          query: OBTENER_CLIENTES_USUARIO,
        });
        cache.writeQuery({
          query: OBTENER_CLIENTES_USUARIO,
          data: {
            obtenerClientesVendedor: obtenerClientesVendedor.filter(
              (clienteActual) => clienteActual.id !== cliente.id
            ),
          },
        });
      }
    },
  });

  const editarMiCliente = (e) => {
    e.preventDefault();
    console.log("vamos a editar");
    const id = cliente.id;
    Router.push({
      pathname: "/editarcliente/[id]",
      query: { id },
    });
  };

  const eliminarMiCliente = () => {
    Swal.fire({
      title: "Estás seguro de eliminar este cliente?",
      text: "no podras recuperar al usuario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.value) {
        const { data } = eliminarCliente({
          variables: { id: cliente.id },
        });
        console.log(data);
        Swal.fire("Eliminado!", "exitosamente", "success");
      }
    });
  };

  console.log(cliente);

  return (
    <tr>
      <td>
        {cliente.nombre} {cliente.apellido}
      </td>
      <td>{cliente.empresa}</td>
      <td>{cliente.email}</td>
      <td>
        <button
          onClick={() => eliminarMiCliente()}
          type="button"
          className="btn btn-danger btn-sm btn-block"
        >
          Eliminar
        </button>
      </td>
      <td>
        <button
          onClick={editarMiCliente}
          type="button"
          className="btn btn-warning btn-sm btn-block"
        >
          Editar
        </button>
      </td>
    </tr>
  );
};

export default Row;
