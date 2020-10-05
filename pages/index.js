import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import Table from "../components/TablaClientes";
import { useRouter } from "next/router";

import { gql, useQuery } from "@apollo/client";

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

const Inicio = () => {
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);
  const router = useRouter();

  // console.log(data);
  // console.log(loading);
  // console.log(error);

  if (loading) return "Cargando ...";
  if (!data.obtenerClientesVendedor) return router.push("/login");

  return (
    <Layout>
      <section className="container">
        <h4 className="text-2xl text-gray-800 font-light">Clientes</h4>
        <Link href="/nuevocliente">
          <button type="button" className="btn btn-info mb-4">
            Nuevo Cliente
          </button>
        </Link>
        <Table data={data.obtenerClientesVendedor} />
      </section>
    </Layout>
  );
};

export default Inicio;
