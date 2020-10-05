import React from "react";
import Layout from "../components/Layout";
import Pedido from "../components/Pedidos/Pedido";
import Link from "next/link";
const Pedidos = () => {
  return (
    <Layout>
      <section className="container">
        <h4 className="text-2xl text-gray-800 font-light">Pedidos</h4>
        <Link href="/nuevopedido">
          <button type="button" className="btn btn-info mb-4">
            Nuevo Pedido
          </button>
        </Link>

        <section className="">
          <div className="d-flex justify-content-between flex-wrap">
            <Pedido />
            <Pedido />
            <Pedido />
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default Pedidos;
