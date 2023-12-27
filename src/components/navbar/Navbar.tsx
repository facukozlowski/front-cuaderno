import { Link, useLocation } from "react-router-dom";
import { privateRoutes } from "./navigation";
import { Container } from "../ui";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const { isAuth, logout, role } = useAuth();

  if (!isAuth) {
    return null;
  }

  const renderNavLinks = () => {
    switch (role) {
      case "ROLE_SUPER_ADMIN":
        return privateRoutes.map(({ path, name }) => (
          <li
            className={`text-slate-300 ${
              location.pathname === path
                ? "bg-sky-700 px-3 py-1 rounded"
                : "hover:bg-sky-500 px-3 py-1 rounded"
            }`}
            key={path}
          >
            <Link
              to={path}
              className={`text-white transition ease-in-out duration-300 ${
                location.pathname === path ? "font-bold" : ""
              }`}
            >
              {name}
            </Link>
          </li>
        ));
      case "ROLE_ADMIN":
        return privateRoutes
          .filter(({ path }) => path !== "/vehiculos") // Excluir la ruta '/vehiculos' para ROLE_ADMIN
          .map(({ path, name }) => (
            <li
              className={`text-slate-300 ${
                location.pathname === path
                  ? "bg-sky-700 px-3 py-1 rounded"
                  : "hover:bg-sky-500 px-3 py-1 rounded"
              }`}
              key={path}
            >
              <Link
                to={path}
                className={`text-white transition ease-in-out duration-300 ${
                  location.pathname === path ? "font-bold" : ""
                }`}
              >
                {name}
              </Link>
            </li>
          ));
      case "ROLE_USUARIO":
        return (
          <li
            className={`text-slate-300 ${
              location.pathname === "/conductores"
                ? "bg-sky-700 px-3 py-1 rounded"
                : "hover:bg-sky-500 px-3 py-1 rounded"
            }`}
          >
            <Link
              to="/conductores"
              className={`text-white transition ease-in-out duration-300 ${
                location.pathname === "/conductores" ? "font-bold" : ""
              }`}
            >
              Conductores
            </Link>
          </li>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="bg-blue-500">
      <Container className="flex justify-between items-center py-3">
        <h1 className="font-family text-white text-2xl transition ease-in-out duration-300">
          Cuaderno Sistema
        </h1>

        <ul className="flex space-x-4 items-center absolute top-3 right-3">
          {renderNavLinks()}

          <li
            className={`text-slate-300 ${
              location.pathname === "/salir"
                ? "bg-sky-700 px-3 py-1 rounded"
                : "hover:bg-sky-500 px-3 py-1 rounded"
            }`}
            onClick={() => {
              logout();
            }}
          >
            <span className="cursor-pointer">Salir</span>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
