import React, { useState } from "react";
import Layout from "../components/Layout";

import { useFormik } from "formik";
import * as Yup from "yup";

import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarUsuarioInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const initialValues = {
  email: "",
  password: "",
};

const login = () => {
  const [mensaje, setMensaje] = useState(null);
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("El password es obligatorio")
        .min(6, "El password debe tener como minimo 6 caracteres"),
    }),
    onSubmit: async (valores) => {
      console.log(valores);
      const { email, password } = valores;
      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: { email, password },
          },
        });
        const { token } = data.autenticarUsuario;
        console.log(token);
        localStorage.setItem("token", token);
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
      <section className="m-auto pt-5" style={{ width: "400px" }}>
        <h1 className="text-center text-white">Login</h1>
        <div className="card text-center">
          <div className="card-body">
            <form onSubmit={formik.handleSubmit} className="text-left">
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
                  Iniciar Sesión{" "}
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

export default login;
