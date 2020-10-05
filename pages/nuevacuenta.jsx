import React, { useState } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

import { useFormik } from "formik";
import * as Yup from "yup";

import { gql, useMutation } from "@apollo/client";

const NUEVA_CUENTA = gql`
  mutation nuevoUsuario($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      id
      nombre
      apellido
      email
      creado
    }
  }
`;

const initialValues = {
  nombre: "",
  apellido: "",
  email: "",
  password: "",
};

const NuevaCuenta = () => {
  const [nuevoUsuario] = useMutation(NUEVA_CUENTA);
  const [mensaje, setMensaje] = useState(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      apellido: Yup.string().required("El apellido es obligatorio"),
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("El password es obligatorio")
        .min(6, "El password debe tener como minimo 6 caracteres"),
    }),
    onSubmit: async (valores) => {
      console.log(valores);
      const { nombre, apellido, email, password } = valores;
      try {
        const { data } = await nuevoUsuario({
          variables: {
            input: { nombre, apellido, email, password },
          },
        });
        console.log(data);
        router.push("/login");
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
      <section className="m-auto pt-5" style={{ width: "400px" }}>
        <h1 className="text-center text-white">Crear Nueva Cuenta</h1>
        <div className="card text-center">
          <div className="card-body">
            <form onSubmit={formik.handleSubmit} className="text-left">
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                />
                {formik.errors.nombre && (
                  <span style={{ fontSize: "14px", color: "red" }}>
                    {formik.errors.nombre}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="apellido">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  name="apellido"
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                />
                {formik.errors.apellido && (
                  <span style={{ fontSize: "14px", color: "red" }}>
                    {formik.errors.apellido}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && (
                  <span style={{ fontSize: "14px", color: "red" }}>
                    {formik.errors.email}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && (
                  <span style={{ fontSize: "14px", color: "red" }}>
                    {formik.errors.password}
                  </span>
                )}
              </div>
              {mensaje && mostrarMensaje()}
              <div>
                <button type="submit" className="btn btn-dark btn-md btn-block">
                  Crear cuenta{" "}
                  {false && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NuevaCuenta;
