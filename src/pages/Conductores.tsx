import { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Card } from "../components/ui";
import MaterialTable from "../components/MaterialTable";

const Conductores = () => {
  const { listConductores } = useAuth();
  const [conductores, setConductores] = useState<any[]>([]);

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

  const columns = [
    { id: "legajo", label: "Legajo" },
    { id: "apellidonombre", label: "Apellido y Nombre" },
    { id: "fechabaja", label: "Fecha de baja" },
    { id: "categoria", label: "Categoría" },
  ];

  return (
    <div className="flex items-center justify-center bg-orange-600">
      <Card>
        <h1 className="text-3xl font-bold text-white text-center py-5 mb-10">
          LISTADO DE CONDUCTORES
        </h1>

        {conductores.length > 0 && (
          <MaterialTable columns={columns} data={conductores} />
        )}
      </Card>
    </div>
  );
};

export default Conductores;
