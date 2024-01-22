import React, { useEffect } from "react";
import { Input, Card, Button, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { useAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login, errors, isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const onSubmit = handleSubmit(async (data: any) => {
    await login(data);
    if (isAuth) {
      navigate("/");
    }
  });

  return (
    <div className="flex items-center justify-center h-screen bg-orange-500">
      <Card className="bg-orange-500 max-w-md rounded-md">
        <h1 className="text-3xl font-bold mb-6 text-center py-10 text-white">
          INICIAR SESIÓN
        </h1>

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <Label htmlFor="legajo" className="text-xl text-white">
              Legajo:
            </Label>
            <Input
              id="legajo"
              placeholder="Ingrese su número de legajo"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none"
              {...register("legajo", { required: true })}
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="password" className="text-xl text-white">
              Contraseña:
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Ingrese su contraseña"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none "
              {...register("password", { required: true })}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white py-2 my-2 rounded-md focus:outline-none  focus:border-green-300"
          >
            INGRESAR
          </Button>
          <div className="mt-5">
            {errors &&
              errors.map((err, index) => (
                <p
                  key={index}
                  className="text-white text-center bg-red-600 rounded-md p-1 text-lg"
                >
                  {err}
                </p>
              ))}
          </div>
        </form>
      </Card>
      <footer className="footer">Servicios Urbanos S.A</footer>
    </div>
  );
};

export default Login;
