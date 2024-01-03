import { useState, useEffect } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Card } from "../components/ui";
import MaterialTable from "../components/MaterialTable";

const TipoServ = () => {
  const { listServicio } = useAuth();
  const [tipoServicio, setTipoServicio] = useState<any[]>([]);

  useEffect(() => {
    const fetchedTipoServicio = async () => {
      try {
        const fetchedTipoServicio = await listServicio();
        if (Array.isArray(fetchedTipoServicio)) {
          setTipoServicio(fetchedTipoServicio);
        }
      } catch (error) {
        console.error("Error al lista tipos de servicio", error);
      }
    };

    fetchedTipoServicio();
  }, [tipoServicio]);

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
        <h1>Tipo Servicio</h1>

        {tipoServicio.length > 0 && (
          <MaterialTable columns={columns} data={tipoServicio} />
        )}

        {tipoServicio.length === 0 && (
          <p className="text-white text-center mt-4">
            No hay datos disponibles.
          </p>
        )}
      </Card>
    </div>
  );
};

export default TipoServ;
