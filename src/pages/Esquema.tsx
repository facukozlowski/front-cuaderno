import { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import EsquemaModal from "../components/EsquemaModal";
import MaterialTable from "../components/MaterialTable";
import { CircularProgress } from "@mui/material";
import { Button } from "../components/ui";

const EsquemaPage = () => {
  const { listEsquema } = useAuth();
  const [esquemas, setEsquemas] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const esquemaData = await listEsquema();
      setEsquemas(esquemaData || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener la lista de esquemas:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [listEsquema]);

  const columns = [
    { id: "idEsquema", label: "Id" },
    { id: "descripcionLinea", label: "Linea" },
    { id: "descripcionRamal", label: "Ramal" },
    { id: "cocheTitular", label: "Coche Tit." },
    { id: "conductorMT", label: "Chofer Mañana Tit." },
    { id: "conductorTT", label: "Chofer Tarde Tit." },
    { id: "conductorNT", label: "Chofer Nocturno Tit." },
    { id: "idModelo", label: "Modelo" },
    { id: "descripcionGaraje", label: "Garaje" },
    { id: "Acción", label: "Acción" },
  ];

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-orange-600">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div
            className="max-h-screen overflow-hidden w-full"
            style={{ maxWidth: "95%", maxHeight: "90%", overflowX: "hidden" }}
          >
            <MaterialTable columns={columns} data={esquemas} actions={true} />
          </div>

          <div className="mt-4">
            <Button
              onClick={openModal}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md focus:outline-none"
            >
              Nuevo Esquema
            </Button>
          </div>
        </>
      )}

      {isModalOpen && (
        <EsquemaModal
          onClose={closeModal}
          onSubmit={() => {
            closeModal();
            fetchData();
          }}
        />
      )}
    </div>
  );
};

export default EsquemaPage;
