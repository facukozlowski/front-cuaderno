import { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Card } from "../components/ui";

const PanelAdmin = () => {
  const { listUsers } = useAuth();
  const [users, setUsers] = useState<any[]>([]);

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
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border">
                  <td className="p-3 text-center">{user.username}</td>
                  <td className="p-3 text-center">{user.email}</td>
                  <td className="p-3 text-center">{user.legajo}</td>
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
