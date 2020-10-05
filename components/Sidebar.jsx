import React, { memo } from "react";
import Link from "next/link";

import { useRouter } from "next/router";

const Sidebar = () => {
  const { pathname } = useRouter();

  return (
    <div className="col-md-2 bg-dark" style={{ height: "100vh" }}>
      <h3 className="text-white py-4">CRM Clientes</h3>
      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <Link href="/">
            <a
              className={
                pathname === "/"
                  ? "nav-link text-white active"
                  : "nav-link text-white"
              }
            >
              Clientes
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/productos">
            <a
              className={
                pathname === "/productos"
                  ? "nav-link text-white active"
                  : "nav-link text-white"
              }
            >
              Productos
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/pedidos">
            <a
              className={
                pathname === "/pedidos"
                  ? "nav-link text-white active"
                  : "nav-link text-white"
              }
            >
              Pedidos
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default memo(Sidebar);
