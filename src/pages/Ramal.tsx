import { useState, useEffect } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Card } from "../components/ui";
import MaterialTable from "../components/MaterialTable";

const Ramal = () => {
  const { listRamal } = useAuth();
  const [ramal, setRamal] = useState<any[]>([]);

  useEffect(() => {
    const fetchedRamal = async () => {
      try {
        const fetchedRamal = await listRamal();
        if (Array.isArray(fetchedRamal)) {
          setRamal(fetchedRamal);
        }
      } catch (error) {
        console.error("Error al listar ramales", error);
      }
    };

    fetchedRamal();
  }, [ramal]);

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
        {ramal.length > 0 && <MaterialTable columns={columns} data={ramal} />}

        {ramal.length === 0 && (
          <p className="text-white text-center mt-4">
            No hay datos disponibles.
          </p>
        )}
      </Card>
    </div>
  );
};

export default Ramal;
