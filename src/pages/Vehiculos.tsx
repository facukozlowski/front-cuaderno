import { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Card } from "../components/ui";
import MaterialTable from "../components/MaterialTable";

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
    <div className="h-[calc(100vh-0rem)] flex items-center justify-center bg-blue-600">
      <Card>
        <h1 className="text-2xl font-bold text-white text-center mb-5">
          LISTADO DE VEHÍCULOS DISPONIBLES
        </h1>

        {vehiculos.length > 0 && (
          <MaterialTable columns={columns} data={vehiculos} />
        )}

        {vehiculos.length === 0 && (
          <p className="text-white text-center mt-4">
            No hay vehículos disponibles.
          </p>
        )}
      </Card>
    </div>
  );
};

export default Vehiculos;
