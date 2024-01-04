import { useState, useEffect } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Card } from "../components/ui";
import MaterialTable from "../components/MaterialTable";

const Lineas = () => {
  const { listLineas } = useAuth();
  const [lineas, setLineas] = useState<any[]>([]);

  useEffect(() => {
    const fetchedLineas = async () => {
      try {
        const fetchedLineas = await listLineas();
        if (Array.isArray(fetchedLineas)) {
          setLineas(fetchedLineas);
        }
      } catch (error) {
        console.error("Error al listar líneas", error);
      }
    };

    fetchedLineas();
  }, [lineas]);

  interface Column {
    id: string;
    label: string;
  }

  const columns: Column[] = [
    { id: "id", label: "Id" },
    { id: "descripcion", label: "Descripcion" },
  ];

  return (
    <div className="h-[calc(100vh-0rem)] flex items-center justify-center bg-orange-600 ">
      <Card>
        {lineas.length > 0 && <MaterialTable columns={columns} data={lineas} />}

        {lineas.length === 0 && (
          <p className="text-white text-center mt-4">
            No hay datos disponibles.
          </p>
        )}
      </Card>
    </div>
  );
};

export default Lineas;
