import React from "react";
import Head from "next/head";

import { useRouter } from "next/router";

import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <title>Administrador Con GraphQL</title>
      </Head>

      {pathname === "/login" || pathname === "/nuevacuenta" ? (
        <section className="container-fluid bg-dark" style={{height: "100vh"}}>{children}</section>
      ) : (
        <section className="container-fluid">
          <div className="row">
            <Sidebar />
            <div className="col-md-10" style={{ padding: 0 }}>
              <Header />
              {children}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Layout;
