import { useState, useEffect } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Card } from "../components/ui";
import MaterialTable from "../components/MaterialTable";

const TagRotacion = () => {
  const { listRotacion } = useAuth();
  const [rotacion, setRotacion] = useState<any[]>([]);

  useEffect(() => {
    const fetchedRotacion = async () => {
      try {
        const fetchedRotacion = await listRotacion();
        if (Array.isArray(fetchedRotacion)) {
          setRotacion(fetchedRotacion);
        }
      } catch (error) {
        console.error("Error al lista rotacion", error);
      }
    };

    fetchedRotacion();
  }, [rotacion]);

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
        <h1>Rotación</h1>

        {rotacion.length > 0 && (
          <MaterialTable columns={columns} data={rotacion} />
        )}

        {rotacion.length === 0 && (
          <p className="text-white text-center mt-4">
            No hay datos disponibles.
          </p>
        )}
      </Card>
    </div>
  );
};

export default TagRotacion;
