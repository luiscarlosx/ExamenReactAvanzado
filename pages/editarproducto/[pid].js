import React from "react";
import Layout from "../../components/Layout";
import Swal from "sweetalert2";

import { Formik } from "formik";
import * as Yup from "yup";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const OBTENER_PRODUCTO = gql`
  query obtenerProducto($id: ID!) {
    obtenerProducto(id: $id) {
      id
      nombre
      existencia
      precio
    }
  }
`;

const ACTUALIZAR_PRODUCTO = gql`
  mutation actualizarProducto($id: ID!, $input: ProductoInput) {
    actualizarProducto(id: $id, input: $input) {
      id
      nombre
      existencia
      precio
    }
  }
`;

const EditarProducto = () => {
  const router = useRouter();

  const {
    query: { id },
  } = router;

  const { data, loading } = useQuery(OBTENER_PRODUCTO, {
    variables: { id },
  });

  const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO);

  console.log("mira la data");
  console.log(data);

  const schemaValidation = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    existencia: Yup.string().required("La existencia es obligatorio"),
    precio: Yup.string().required("El precio es obligatorio"),
  });

  if (loading) return "Cargando ...";

  const { obtenerProducto } = data;

  const actualizarInfoProducto = async (valores) => {
    const { nombre, existencia, precio } = valores;

    try {
      const { data } = await actualizarProducto({
        variables: {
          id,
          input: {
            nombre,
            existencia,
            precio,
          },
        },
      });
      console.log(data);
      Swal.fire(
        "Actualizado!",
        "El producto se actualizo correctamente",
        "success",
        router.push("/")
      );
    } catch (error) {}
  };

  return (
    <Layout>
      <section className="container">
        <h4 className="text-2xl text-gray-800 font-light">Editar Producto</h4>
        <Formik
          validationSchema={schemaValidation}
          enableReinitialize
          initialValues={obtenerProducto}
          onSubmit={(valores, funciones) => {
            // console.log(valores);
            actualizarInfoProducto(valores);
          }}
        >
          {(props) => {
            // console.log(props.values)
            return (
              <form
                onSubmit={props.handleSubmit}
                className="m-auto"
                style={{ maxWidth: "800px" }}
              >
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      placeholder="nombre"
                      value={props.values.nombre}
                      onChange={props.handleChange}
                    />
                    {props.errors.nombre && (
                      <span style={{ fontSize: "14px", color: "red" }}>
                        {props.errors.nombre}
                      </span>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="existencia">Cantidad disponible</label>
                    <input
                      type="number"
                      className="form-control"
                      id="existencia"
                      name="existencia"
                      placeholder="existencia"
                      value={props.values.existencia}
                      onChange={props.handleChange}
                    />
                    {props.errors.existencia && (
                      <span style={{ fontSize: "14px", color: "red" }}>
                        {props.errors.existencia}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="precio">Precio</label>
                    <input
                      type="number"
                      className="form-control"
                      id="precio"
                      name="precio"
                      placeholder="precio"
                      value={props.values.precio}
                      onChange={props.handleChange}
                    />
                    {props.errors.precio && (
                      <span style={{ fontSize: "14px", color: "red" }}>
                        {props.errors.precio}
                      </span>
                    )}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Actualizar producto {""}
                </button>
              </form>
            );
          }}
        </Formik>
      </section>
    </Layout>
  );
};

export default EditarProducto;
