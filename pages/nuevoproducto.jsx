import React, { useState } from "react";

import Layout from "../components/Layout";

import { useFormik } from "formik";
import * as Yup from "yup";

import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const NUEVO_PRODUCTO = gql`
  mutation nuevoProducto($input: ProductoInput) {
    nuevoProducto(input: $input) {
      id
      nombre
      existencia
      precio
    }
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

const initialValues = {
  nombre: "",
  existencia: 0,
  precio: 0.0,
};

const NuevoProducto = () => {

  const [mensaje, setMensaje] = useState(null);

  const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
    update(cache, { data: { nuevoProducto } }) {
      if (cache.data.data.ROOT_QUERY) {
        const { obtenerProductos } = cache.readQuery({
          query: OBTENER_PRODUCTOS,
        });
        cache.writeQuery({
          query: OBTENER_PRODUCTOS,
          data: {
            obtenerProductos: [...obtenerProductos, nuevoProducto],
          },
        });
      }
    },
  });

  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      existencia: Yup.string().required("La existencia es obligatorio"),
      precio: Yup.string().required("El precio es obligatorio"),
    }),
    onSubmit: async (valores) => {
      console.log(valores);
      const { nombre, existencia, precio } = valores;
      try {
        const { data } = await nuevoProducto({
          variables: {
            input: { nombre, existencia, precio },
          },
        });
        console.log(data);
        router.push("/");
      } catch (error) {
        setMensaje(error.message);
        console.log(error.message);
      }
    },
  });

  const mostrarMensaje = () => {
    return <div className="alert alert-danger">{mensaje}</div>;
  };

  return (
    <Layout>
      <section className="container">
        <h4 className="text-2xl text-gray-800 font-light">
          Crear Nuevo Producto
        </h4>
        <form 
        onSubmit={formik.handleSubmit}
        className="m-auto" 
        style={{ maxWidth: "800px" }}>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                placeholder="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
              />
              {formik.errors.nombre && (
                <span style={{ fontSize: "14px", color: "red" }}>
                  {formik.errors.nombre}
                </span>
              )}
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="existencia">Cantidad disponible</label>
              <input
                type="number"
                className="form-control"
                id="existencia"
                name="existencia"
                placeholder="existencia"
                value={formik.values.existencia}
                onChange={formik.handleChange}
              />
              {formik.errors.existencia && (
                <span style={{ fontSize: "14px", color: "red" }}>
                  {formik.errors.existencia}
                </span>
              )}
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="precio">Precio</label>
              <input
                type="number"
                className="form-control"
                id="precio"
                name="precio"
                placeholder="precio"
                value={formik.values.precio}
                onChange={formik.handleChange}
              />
              {formik.errors.precio && (
                <span style={{ fontSize: "14px", color: "red" }}>
                  {formik.errors.precio}
                </span>
              )}
            </div>
          </div>
          {mensaje && mostrarMensaje()}
          <button type="submit" className="btn btn-primary">
            Registrar producto {""}
            {false && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
          </button>
        </form>
      </section>
    </Layout>
  );
};

export default NuevoProducto;
