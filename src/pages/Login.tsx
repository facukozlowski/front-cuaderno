import React, { useEffect } from "react";
import { Input, Card, Button, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/login", data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Inicio de sesión exitoso");
        navigate("/form");
      } else {
        console.error("Error al iniciar sesión:", response.data.message);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600">
      <Card className="w-96 p-8 bg-white shadow-md rounded-md">
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
            {errors.legajo && (
              <p className="text-red-500">Ingrese un legajo correcto</p>
            )}
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
            {errors.password && (
              <p className="text-red-500">Ingrese una contraseña válida</p>
            )}
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
