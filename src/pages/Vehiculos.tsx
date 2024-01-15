import { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Card } from "../components/ui";
import MaterialTable from "../components/MaterialTable";
import { CircularProgress } from "@mui/material";

const Vehiculos = () => {
  const { listVehiculos } = useAuth();
  const [vehiculos, setVehiculos] = useState<any[]>([]);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const fetchedVehiculos = await listVehiculos();
        if (Array.isArray(fetchedVehiculos)) {
          setVehiculos(fetchedVehiculos);
        }
      } catch (error) {
        console.error("Error al listar vehículos", error);
      }
    };

    fetchVehiculos();
  }, [listVehiculos]);

  interface Column {
    id: string;
    label: string;
  }

  const columns: Column[] = [
    { id: "id", label: "Id" },
    { id: "interno", label: "Interno" },
    { id: "dominio", label: "Dominio" },
  ];

  return (
    <div className="h-[calc(100vh-0rem)] flex items-center justify-center bg-orange-600">
      <Card>
        {vehiculos.length > 0 && (
          <MaterialTable columns={columns} data={vehiculos} />
        )}

        {vehiculos.length === 0 && <CircularProgress />}
      </Card>
    </div>
  );
};

export default Vehiculos;
