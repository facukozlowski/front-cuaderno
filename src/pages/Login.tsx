import React, { useEffect } from "react";
import { Input, Card, Button, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { useAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login, errors } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    await login(data);
  });

  return (
    <div className="h-[calc(100vh)] flex items-center justify-center bg-blue-600">
      <Card className="w-96 p-8 bg-white shadow-md rounded-md">
        {errors &&
          errors.map((err) => (
            <p className="text-red-500 text-center">{err}</p>
          ))}

        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          INICIAR SESIÓN
        </h1>

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <Label htmlFor="legajo" className="text-sm text-gray-600">
              Legajo:
            </Label>
            <Input
              id="legajo"
              placeholder="Ingrese su número de legajo"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              {...register("legajo", { required: true })}
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="password" className="text-sm text-gray-600">
              Contraseña:
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Ingrese su contraseña"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              {...register("password", { required: true })}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            INGRESAR
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
