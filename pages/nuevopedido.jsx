import React from "react";
import Layout from "../components/Layout";
import AsignarCliente from "../components/Pedidos/AsignarCliente";
import AsignarProductos from "../components/Pedidos/AsignarProductos";
import ResumenPedido from "../components/Pedidos/ResumenPedido";
import Total from "../components/Pedidos/Total";

const NuevoPedido = () => {
  return (
    <Layout>
      <section className="container">
        <h4 className="text-2xl text-gray-800 font-light">
          Crear Nuevo Pedido
        </h4>
        <section style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p>1. - Selecciona tu cliente</p>
          <AsignarCliente instanceId="1" />
          <p className="mt-2">2. - Selecciona tus Productos</p>
          <AsignarProductos instanceId="2" />
          <ResumenPedido />
          <div className="row">
            <div className="col-md-6">
              <Total />
            </div>

            <div className="col-md-6">
              <button className="btn btn-primary">Registrar Pedido</button>
            </div>
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default NuevoPedido;
