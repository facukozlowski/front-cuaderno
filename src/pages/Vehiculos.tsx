import { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Button, Card } from "../components/ui";
import axios from "axios";

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

  return (
    <div className="h-[calc(100vh-0rem)] flex items-center justify-center bg-blue-600">
      <Card>
        <h1 className="text-2xl font-bold text-white text-center">
          LISTADO DE VEHÍCULOS DISPONIBLES
        </h1>

        {vehiculos.length > 0 && (
          <table className="mt-4 w-full border-collapse border text-white">
            <thead>
              <tr>
                <th className="p-3 border">Id</th>
                <th className="p-3 border">Interno</th>
                <th className="p-3 border">Dominio</th>
              </tr>
            </thead>
            <tbody>
              {vehiculos.map((vehiculo) => (
                <tr key={vehiculo.id} className="border">
                  <td className="p-3 text-center">{vehiculo.id}</td>
                  <td className="p-3 text-center">{vehiculo.interno}</td>
                  <td className="p-3 text-center">{vehiculo.dominio}</td>
                  <Button
                    onClick={async () => {
                      if (
                        window.confirm("¿Seguro de eliminar este vehículo?")
                      ) {
                        console.log(vehiculo.id);
                        const token = localStorage.getItem("token");
                        console.log("Token:", token);

                        try {
                          await axios.put(
                            `http://localhost:3000/vehiculos/${vehiculo.id}`,
                            {
                              headers: token
                                ? { Authorization: `Bearer ${token}` }
                                : {},
                            }
                          );
                          const updatedVehiculos = vehiculos.filter(
                            (v) => v.id !== vehiculo.id
                          );
                          setVehiculos(updatedVehiculos);
                        } catch (error) {
                          console.error("Error al eliminar vehículo:", error);
                        }
                      }
                    }}
                  >
                    Eliminar
                  </Button>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
};

export default Vehiculos;
