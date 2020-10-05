import React from "react";
import Swal from "sweetalert2";
import Router from "next/router";
import { gql, useMutation } from "@apollo/client";

const ELIMINAR_PRODUCTO = gql`
  mutation eliminarProducto($id: ID!) {
    eliminarProducto(id: $id)
  }
`;

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      existencia
      precio
    }
  }
`;

const Row = ({ producto }) => {
  const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO, {
    update(cache) {
      if (cache.data.data.ROOT_QUERY) {
        const { obtenerProductos } = cache.readQuery({
          query: OBTENER_PRODUCTOS,
        });
        cache.writeQuery({
          query: OBTENER_PRODUCTOS,
          data: {
            obtenerProductos: obtenerProductos.filter(
              (productoActual) => productoActual.id !== producto.id
            ),
          },
        });
      }
    },
  });

  const editarProducto = (e) => {
    e.preventDefault();
    console.log("vamos a editar");
    const id = producto.id;
    Router.push({
      pathname: "/editarproducto/[id]",
      query: { id },
    });
  };

  const eliminar_Producto = () => {
    Swal.fire({
      title: "Estás seguro de eliminar este producto?",
      text: "no podras recuperar el producto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.value) {
        const { data } = eliminarProducto({
          variables: { id: producto.id },
        });
        console.log(data);
        Swal.fire("Eliminado!", "exitosamente", "success");
      }
    });
  };

  console.log(producto);

  return (
    <tr>
      <td>
        {producto.nombre}
      </td>
      <td>{producto.existencia}</td>
      <td>{producto.precio}</td>
      <td>
        <button
          onClick={() => eliminar_Producto()}
          type="button"
          className="btn btn-danger btn-sm btn-block"
        >
          Eliminar
        </button>
      </td>
      <td>
        <button
          onClick={editarProducto}
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
