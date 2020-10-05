import React, { useState } from "react";
import Layout from "../components/Layout";

import { useFormik } from "formik";
import * as Yup from "yup";

import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const NUEVO_CLIENTE = gql`
  mutation nuevoCliente($input: ClienteInput) {
    nuevoCliente(input: $input) {
      id
      nombre
      apellido
      empresa
      email
      telefono
    }
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

const initialValues = {
  nombre: "",
  apellido: "",
  empresa: "",
  email: "",
  telefono: "",
};

const NuevoCliente = () => {
  const [mensaje, setMensaje] = useState(null);
  // const [nuevoCliente] = useMutation(NUEVO_CLIENTE);

  const [nuevoCliente] = useMutation(NUEVO_CLIENTE, {
    update(cache, { data: { nuevoCliente } }) {
      if (cache.data.data.ROOT_QUERY) {
        const { obtenerClientesVendedor } = cache.readQuery({
          query: OBTENER_CLIENTES_USUARIO,
        });
        cache.writeQuery({
          query: OBTENER_CLIENTES_USUARIO,
          data: {
            obtenerClientesVendedor: [...obtenerClientesVendedor, nuevoCliente],
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
      apellido: Yup.string().required("El apellido es obligatorio"),
      empresa: Yup.string().required("la empresa es obligatoria"),
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
    }),
    onSubmit: async (valores) => {
      console.log(valores);
      const { nombre, apellido, empresa, email, telefono } = valores;
      try {
        const { data } = await nuevoCliente({
          variables: {
            input: { nombre, apellido, empresa, email, telefono },
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
        <h4 className="text-2xl text-gray-800 font-light">Nuevo Clientes</h4>
        <form
          onSubmit={formik.handleSubmit}
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
                value={formik.values.nombre}
                onChange={formik.handleChange}
              />
              {formik.errors.nombre && (
                <span style={{ fontSize: "14px", color: "red" }}>
                  {formik.errors.nombre}
                </span>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                name="apellido"
                placeholder="apellido"
                value={formik.values.apellido}
                onChange={formik.handleChange}
              />
              {formik.errors.apellido && (
                <span style={{ fontSize: "14px", color: "red" }}>
                  {formik.errors.apellido}
                </span>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="empresa">Empresa</label>
              <input
                type="text"
                className="form-control"
                id="empresa"
                name="empresa"
                placeholder="empresa"
                value={formik.values.empresa}
                onChange={formik.handleChange}
              />
              {formik.errors.empresa && (
                <span style={{ fontSize: "14px", color: "red" }}>
                  {formik.errors.empresa}
                </span>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                nombre="email"
                placeholder="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && (
                <span style={{ fontSize: "14px", color: "red" }}>
                  {formik.errors.email}
                </span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">Teléfono</label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                name="telefono"
                value={formik.values.telefono}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          {mensaje && mostrarMensaje()}
          <button type="submit" className="btn btn-primary">
            Registrar cliente {""}
            {false && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
          </button>
        </form>
      </section>
    </Layout>
  );
};

export default NuevoCliente;
