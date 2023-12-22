import { FormEvent } from "react";
import { Input, Card, Button } from "../components/ui";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  username: string;
  empresa: string;
  legajo: string;
  password: string;
}

const UsersForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const { createUser } = useAuth();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await createUser(data);
    navigate("/");
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex items-center justify-center bg-blue-600">
      <Card>
        <h1 className="text-2xl font-bold text-white">REGISTRO DE USUARIOS</h1>

        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) =>
            handleSubmit(onSubmit)(e)
          }
        >
          <Input
            type="email"
            placeholder="ingrese correo"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500">Ingrese un email válido</p>
          )}
          <Input
            type="text"
            placeholder="ingrese nombre de usuario"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className="text-red-500">Ingrese un nombre de usuario</p>
          )}
          <Input
            type="text"
            placeholder="seleccione una empresa"
            {...register("empresa", { required: true })}
          />
          {errors.empresa && (
            <p className="text-red-500">Seleccione una empresa</p>
          )}
          <Input
            placeholder="ingrese número de legajo"
            {...register("legajo", { required: true })}
          />
          {errors.legajo && (
            <p className="text-red-500">Ingrese un número de legajo</p>
          )}
          <Input
            type="password"
            placeholder="ingrese contraseña"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500">Ingrese una contraseña válida.</p>
          )}
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300">
            CREAR NUEVO USUARIO
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default UsersForm;
