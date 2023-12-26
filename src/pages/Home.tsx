import { useAuth } from "../components/context/AuthContext";

const HomePage = () => {
  const data = useAuth();
  console.log(data.user);
  return (
    <div className="h-[calc(100vh-3.5rem)] flex items-center justify-center bg-blue-600">
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold mb-4">BIENVENIDO</h1>
        <p className="text-xl">SERVICIOS URBANOS S.A</p>
      </div>
    </div>
  );
};

export default HomePage;
