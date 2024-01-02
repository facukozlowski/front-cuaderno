import { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Card } from "../components/ui";

const Conductores = () => {
  const { listConductores } = useAuth();
  const [Conductores, setConductores] = useState<any[]>([]);

  useEffect(() => {
    const fetchConductores = async () => {
      try {
        const fetchedConductores = await listConductores();
        if (Array.isArray(fetchedConductores)) {
          setConductores(fetchedConductores);
        }
      } catch (error) {
        console.error("Error al listar conductores", error);
      }
    };

    fetchConductores();
  }, [listConductores]);

  return (
    <div className="h-[calc(100vh-0rem)] flex items-center justify-center bg-blue-600">
      <Card>
        <h1 className="text-2xl font-bold text-white text-center">
          LISTADO DE CONDUCTORES
        </h1>

        {Conductores.length > 0 && (
          <table className="mt-4 w-full border-collapse border text-white">
            <thead>
              <tr>
                <th className="p-3 border">Legajo</th>
                <th className="p-3 border">Apellido y Nombre</th>
                <th className="p-3 border">Categoría</th>
                <th className="p-3 border">Fecha de baja</th>
              </tr>
            </thead>
            <tbody>
              {Conductores.map((conductor) => (
                <tr key={conductor.id || conductor.legajo} className="border">
                  <td className="p-3 text-center">{conductor.legajo}</td>
                  <td className="p-3 text-center">
                    {conductor.apellidonombre}
                  </td>
                  <td className="p-3 text-center">{conductor.categoria}</td>
                  <td className="p-3 text-center">{conductor.fechabaja}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
};

export default Conductores;
