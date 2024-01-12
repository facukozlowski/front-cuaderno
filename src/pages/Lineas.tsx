import { useState, useEffect } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Card } from "../components/ui";
import MaterialTable from "../components/MaterialTable";
import { CircularProgress } from "@mui/material";

const Lineas = () => {
  const { listLineas } = useAuth();
  const [lineas, setLineas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchedLineas = async () => {
      try {
        const fetchedLineas = await listLineas();
        if (Array.isArray(fetchedLineas)) {
          setLineas(fetchedLineas);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
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
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Card>
            {lineas.length > 0 && (
              <MaterialTable columns={columns} data={lineas} />
            )}
          </Card>
        </>
      )}
    </div>
  );
};

export default Lineas;
