import React from "react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const cerrarSesion = () => {
    router.push("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-primary mb-3">
      <p className="navbar-brand mb-0">
        Hola: nombre y apellido
      </p>
      <button
        onClick={() => cerrarSesion()}
        type="button"
        className="btn btn-dark my-2 my-sm-0"
      >
        Cerrar Sesión
      </button>
    </nav>
  );
};

export default Header;
