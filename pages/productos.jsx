import React from "react";
import Layout from "../components/Layout";
import Table from "../components/TablaProductos";
import Link from "next/link";
import { useRouter } from "next/router";

import { gql, useQuery } from "@apollo/client";

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

const Productos = () => {

  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);
  const router = useRouter();

  if (loading) return "Cargando ...";
  if (!data.obtenerProductos) return router.push("/login");

  return (
    <Layout>
      <section className="container">
        <h4 className="text-2xl text-gray-800 font-light">Productos</h4>
        <Link href="/nuevoproducto">
          <button type="button" className="btn btn-info mb-4">
            Nuevo Producto
          </button>
        </Link>
        <Table data={data.obtenerProductos}/>
      </section>
    </Layout>
  );
};

export default Productos;
