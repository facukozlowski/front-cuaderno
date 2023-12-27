import axios, { AxiosResponse } from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "react-toastify";

interface AuthContextProps {
  user: string | undefined;
  isAuth: boolean;
  role: string | undefined;
  errors: string[] | null;
  createUser: (data: any) => Promise<void>;
  login: (data: any) => Promise<void>;
  logout: () => void;
  listUsers: () => Promise<void | any[]>;
  listConductores: () => Promise<void>;
  listVehiculos: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type LoginResponse =
  | {
      token: string;
      roles: string;
    }
  | string[];

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | undefined>(undefined);
  const [role, setRole] = useState<string | undefined>(undefined);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState<string[] | null>(null);

  const login = async (data: any): Promise<void> => {
    try {
      let response: AxiosResponse<LoginResponse> = {} as any;
      response = await axios.post("http://localhost:3000/login", data);

      if ("token" in response.data) {
        localStorage.setItem("token", response.data.token);

        // Actualiza para extraer el rol correctamente
        const userRole = response.data.roles[0];
        localStorage.setItem("role", userRole); // Almacena el rol en el Local Storage
        setRole(userRole); // Actualiza el estado del rol en el contexto

        const userResponse = await axios.get("http://localhost:3000/users", {
          headers: {
            Authorization: response.data.token,
          },
        });
        const userData = userResponse.data[0];

        setUser(userData);
        setIsAuth(true);
      } else {
        throw new Error("Token no recibido del servidor");
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        console.log("Mensaje de error:", err.response.data.message);
        setErrors([err.response.data.message]);
      } else {
        console.error("Error desconocido:", err);
        setErrors(["Error desconocido"]);
      }
    }
  };

  const listUsers = async (): Promise<any[]> => {
    try {
      const token = localStorage.getItem("token");
      const response: AxiosResponse<any> = await axios.get(
        "http://localhost:3000/users",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const listConductores = async (): Promise<any> => {
    try {
      const token = localStorage.getItem("token");
      const response: AxiosResponse<any> = await axios.get(
        "http://localhost:3000/conductores",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const listVehiculos = async (): Promise<any> => {
    try {
      const token = localStorage.getItem("token");
      const response: AxiosResponse<any> = await axios.get(
        "http://localhost:3000/vehiculos",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const createUser = async (data: any): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("role");

      const response: AxiosResponse<any> = await axios.post(
        "http://localhost:3000/users",
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(response);
      toast.success("Usuario creado con éxito");
    } catch (error) {
      console.error("Error al crear nuevo usuario:", error);

      toast.error("Error al crear el usuario");
    }
  };

  const logout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuth(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response: AxiosResponse<any> = await axios.get(
            "http://localhost:3000/verificar-autenticacion",
            {
              headers: {
                Authorization: token,
              },
              withCredentials: true,
            }
          );

          setUser(response.data.user);
          setRole(localStorage.getItem("role") || ""); // Recuperar el rol del localStorage
          setIsAuth(true);
        } catch (error) {
          console.error("Error al verificar la autenticación:", error);

          if (error) {
            logout();
          }
        }
      }
    };

    checkAuth();
  }, []);

  const contextValue: AuthContextProps = {
    user,
    isAuth,
    role,
    errors,
    createUser,
    listUsers,
    listConductores,
    listVehiculos,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
