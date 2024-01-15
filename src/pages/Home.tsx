import { useAuth } from "../components/context/AuthContext";
import Login from "./Login";

const HomePage = () => {
  const { loading, isAuth } = useAuth();

  if (!loading) {
    console.log(loading);
    return <h1>loading</h1>;
  }

  if (!isAuth) {
    // ¡No te olvides de agregar el return aquí!
    return <Login />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-600  text-white">
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold mb-4">BIENVENIDO</h1>
        <p className="text-xl">SERVICIOS URBANOS S.A</p>
      </div>
    </div>
  );
};

export default HomePage;
