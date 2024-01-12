import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Conductores from "./pages/Conductores";
import Vehiculos from "./pages/Vehiculos";
import TagRotacion from "./pages/TagRotacion";
import TipoServicio from "./pages/TipoServicio";
import TagIPK from "./pages/TagIPK";
import Lineas from "./pages/Lineas";
import Ramal from "./pages/Ramal";
import Sidebar from "./components/sidebar/Sidebar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useAuth } from "./components/context/AuthContext";
import EsquemaForm from "./pages/Esquema";

const App = () => {
  const { isAuth } = useAuth();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              isAuth ? (
                <ProtectedRoutes
                  isAllowed={isAuth}
                  redirectTo="/login"
                  children={<Home />}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/configuracion/*"
            element={
              <ProtectedRoutes
                isAllowed={isAuth}
                redirectTo="/login"
                children={<ConfiguracionRoutes />}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

const ConfiguracionRoutes = () => (
  <Routes>
    <Route path="conductores" element={<Conductores />} />
    <Route path="vehiculos" element={<Vehiculos />} />
    <Route path="tagrotacion" element={<TagRotacion />} />
    <Route path="tiposervicio" element={<TipoServicio />} />
    <Route path="tagIPK" element={<TagIPK />} />
    <Route path="linea" element={<Lineas />} />
    <Route path="ramal" element={<Ramal />} />
    <Route path="esquema" element={<EsquemaForm />} />
  </Routes>
);

export default App;
