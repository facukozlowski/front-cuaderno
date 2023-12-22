import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PanelAdmin from "./pages/PanelAdmin";
import UsersForm from "./pages/UsersForm";
import NotFound from "./pages/NotFound";
import Navbar from "./components/navbar/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useAuth } from "./components/context/AuthContext";

const App = () => {
  const { isAuth } = useAuth();
  console.log(isAuth);
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes isAllowed={!isAuth} redirectTo="/" />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route
          element={<ProtectedRoutes isAllowed={isAuth} redirectTo="/login" />}
        >
          <Route path="/panelAdmin" element={<PanelAdmin />} />
          <Route path="/form" element={<UsersForm />} />
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
