import axios, { AxiosResponse } from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextProps {
  user: string | undefined;
  isAuth: boolean;
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
      rol: string;
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
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState<string[] | null>(null);

  const login = async (data: any): Promise<void> => {
    try {
      let response: AxiosResponse<LoginResponse> = {} as any;
      response = await axios.post("http://localhost:3000/login", data);

      if ("token" in response.data) {
        localStorage.setItem("token", response.data.token);

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
      console.log("Token:", token);

      const response: AxiosResponse<any> = await axios.post(
        "http://localhost:3000/users",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log(response);
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Error creating user");
    }
  };

  const logout = (): void => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response: AxiosResponse<any> = await axios.get(
            "http://localhost:3000/auth/check",
            {
              headers: {
                Authorization: token,
              },
              withCredentials: true,
            }
          );
          setUser(response.data.user);
          setIsAuth(true);
        } catch (error) {
          console.error("Error al verificar la autenticación:", error);
          logout();
        }
      }
    };

    checkAuth();
  }, []);

  const contextValue: AuthContextProps = {
    user,
    isAuth,
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
