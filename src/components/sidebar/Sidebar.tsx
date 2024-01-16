import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { privateRoutes } from "./navigation";
import { useAuth } from "../context/AuthContext";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showConfiguracion, setShowConfiguracion] = useState(false);
  const { isAuth, logout, role } = useAuth();

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const showToggleButton = isAuth && !showSidebar;

  if (!isAuth || !showSidebar) {
    return (
      <div>
        {showToggleButton && (
          <button
            className="text-white cursor-pointer fixed left-4 top-4"
            onClick={toggleSidebar}
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    );
  }

  const toggleConfiguracion = () => {
    setShowConfiguracion((prev) => !prev);
  };

  return (
    <div className="flex">
      <nav className="bg-orange-500 w-48 min-h-screen text-white relative left-0">
        <div className="py-4">
          <div className="px-4 py-2">
            <button
              className="text-white cursor-pointer"
              onClick={toggleSidebar}
            >
              <FaChevronLeft />
            </button>
          </div>

          <div className="font-bold px-2 py-3 text-xl text-center text-gray-200 border-b border-white">
            Sistema Cuaderno
          </div>
          <ul>
            <li>
              <Link
                to="/"
                className={`flex items-center px-4 py-2 ${
                  location.pathname === "/"
                    ? "bg-green-700 rounded"
                    : "hover:bg-green-500 rounded"
                }`}
              >
                <FaHome className="mr-2" /> Inicio
              </Link>
            </li>
            <li>
              <div
                className={`flex items-center px-4 py-2 cursor-pointer ${
                  location.pathname.includes("/configuracion")
                    ? "bg-green-700 rounded"
                    : "hover:bg-green-500 rounded"
                }`}
                onClick={toggleConfiguracion}
              >
                <FaCog className="mr-2" /> Configuración
              </div>
              {showConfiguracion && (
                <ul>
                  {privateRoutes.map(({ path, name }) => (
                    <li key={path}>
                      {(role !== "ROLE_USUARIO" && (
                        <Link
                          to={`/configuracion${path}`}
                          className={`block px-4 py-2 ${
                            location.pathname === `/configuracion${path}`
                              ? "bg-green-700 rounded"
                              : "hover:bg-green-500 rounded"
                          }`}
                        >
                          {name}
                        </Link>
                      )) ||
                        (role === "ROLE_USUARIO" && path === "/conductores" && (
                          <Link
                            to={`/configuracion${path}`}
                            className={`block px-4 py-2 ${
                              location.pathname === `/configuracion${path}`
                                ? "bg-green-700 rounded"
                                : "hover:bg-green-500 rounded"
                            }`}
                          >
                            {name}
                          </Link>
                        ))}
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <div
                className={`flex items-center px-4 py-2 cursor-pointer ${
                  location.pathname === "/salir"
                    ? "bg-green-700 rounded"
                    : "hover:bg-green-500 rounded"
                }`}
                onClick={() => {
                  logout();
                }}
              >
                <FaSignOutAlt className="mr-2" /> Salir
              </div>
            </li>
          </ul>
        </div>

        <img
          src="/logo_susa.jpg"
          alt="Logo Empresa"
          className="w-48 h-14 mb-0 absolute bottom-0"
        />
      </nav>

      <div className="flex-1"></div>
    </div>
  );
};

export default Sidebar;
