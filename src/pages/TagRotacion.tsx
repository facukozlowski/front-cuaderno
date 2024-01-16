import { useState, useEffect } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Card } from "../components/ui";
import MaterialTable from "../components/MaterialTable";
import { CircularProgress } from "@mui/material";

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
  }, []);

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
        {rotacion.length > 0 && (
          <MaterialTable columns={columns} data={rotacion} />
        )}

        {rotacion.length === 0 && <CircularProgress />}
      </Card>
    </div>
  );
};

export default TagRotacion;
