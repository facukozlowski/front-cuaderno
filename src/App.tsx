import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PanelAdmin from "./pages/PanelAdmin";
import UsersForm from "./pages/UsersForm";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/panelAdmin" element={<PanelAdmin />} />
      <Route path="/form" element={<UsersForm />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
