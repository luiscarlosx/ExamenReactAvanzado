import React from "react";
import Layout from "../../components/Layout";
import Swal from "sweetalert2";

import { Formik } from "formik";
import * as Yup from "yup";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const OBTENER_CLIENTE = gql`
  query obtenerCliente($id: ID!) {
    obtenerCliente(id: $id) {
      id
      nombre
      apellido
      email
      empresa
      telefono
    }
  }
`;

const ACTUALZIAR_CLIENTE = gql`
  mutation actualizarCliente($id: ID!, $input: ClienteInput) {
    actualizarCliente(id: $id, input: $input) {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const EditarCliente = () => {
  const router = useRouter();

  const {
    query: { id },
  } = router;

  const { data, loading } = useQuery(OBTENER_CLIENTE, {
    variables: { id },
  });

  const [actualizarCliente] = useMutation(ACTUALZIAR_CLIENTE);

  console.log("mira la data");
  console.log(data);

  const schemaValidation = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    apellido: Yup.string().required("El apellido es obligatorio"),
    empresa: Yup.string().required("la empresa es obligatoria"),
    email: Yup.string()
      .email("El email no es válido")
      .required("El email es obligatorio"),
  });

  if (loading) return "Cargando ...";

  const { obtenerCliente } = data;

  const actualizarInfoCliente = async (valores) => {
    const { nombre, apellido, empresa, email, telefono } = valores;

    try {
      const { data } = await actualizarCliente({
        variables: {
          id,
          input: {
            nombre,
            apellido,
            empresa,
            email,
            telefono,
          },
        },
      });
      console.log(data);
      Swal.fire(
        "Actualizado!",
        "El ciente se actulizo correctamente",
        "success",
        router.push("/")
      );
    } catch (error) {}
  };

  return (
    <Layout>
      <section className="container">
        <h4 className="text-2xl text-gray-800 font-light">Editar Cliente</h4>
        <Formik
          validationSchema={schemaValidation}
          enableReinitialize
          initialValues={obtenerCliente}
          onSubmit={(valores, funciones) => {
            // console.log(valores);
            actualizarInfoCliente(valores);
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
                    <label htmlFor="apellido">Apellido</label>
                    <input
                      type="text"
                      className="form-control"
                      id="apellido"
                      name="apellido"
                      placeholder="apellido"
                      value={props.values.apellido}
                      onChange={props.handleChange}
                    />
                    {props.errors.apellido && (
                      <span style={{ fontSize: "14px", color: "red" }}>
                        {props.errors.apellido}
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
                      value={props.values.empresa}
                      onChange={props.handleChange}
                    />
                    {props.errors.empresa && (
                      <span style={{ fontSize: "14px", color: "red" }}>
                        {props.errors.empresa}
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
                      value={props.values.email}
                      onChange={props.handleChange}
                    />
                    {props.errors.email && (
                      <span style={{ fontSize: "14px", color: "red" }}>
                        {props.errors.email}
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
                      value={props.values.telefono}
                      onChange={props.handleChange}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Actualizar cliente {""}
                </button>
              </form>
            );
          }}
        </Formik>
      </section>
    </Layout>
  );
};

export default EditarCliente;
