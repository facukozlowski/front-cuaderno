import { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Card, Button } from "../components/ui";

interface User {
  id: number;
  username: string;
  email: string;
  legajo: string;
}

const PanelAdmin = () => {
  const { listUsers, deleteUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await listUsers();
        if (Array.isArray(fetchedUsers)) {
          setUsers(fetchedUsers);
        }
      } catch (error) {
        console.error("Error al listar usuarios", error);
      }
    };

    fetchUsers();
  }, [listUsers]);

  const handleDeleteUser = async (userId: number) => {
    try {
      if (window.confirm("¿Seguro de eliminar este usuario?")) {
        const token = localStorage.getItem("token");
        console.log("Token:", token);

        await deleteUser(userId);

        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex items-center justify-center bg-blue-600">
      <Card>
        <h1 className="text-2xl font-bold text-white text-center">
          LISTADO DE USUARIOS
        </h1>

        {users.length > 0 && (
          <table className="mt-4 w-full border-collapse border text-white">
            <thead>
              <tr>
                <th className="p-3 border">Username</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Legajo</th>
                <th className="p-3 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border">
                  <td className="p-3 text-center">{user.username}</td>
                  <td className="p-3 text-center">{user.email}</td>
                  <td className="p-3 text-center">{user.legajo}</td>
                  <td className="p-3 text-center">
                    <Button onClick={() => handleDeleteUser(user.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
};

export default PanelAdmin;
