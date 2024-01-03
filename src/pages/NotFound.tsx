import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-orange-600 ">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Página no encontrada
      </h1>
      <h3 className="text-3xl font-semibold mb-8 text-gray-600">404</h3>

      <Link
        to="/"
        className=" text-3xl text-blue-500 hover:underline focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out"
      >
        Volver a inicio
      </Link>
    </div>
  );
};

export default NotFound;
