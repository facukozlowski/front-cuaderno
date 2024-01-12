import { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import EsquemaModal from "../components/EsquemaModal";
import MaterialTable from "../components/MaterialTable";
import { Button } from "../components/ui";
import { CircularProgress } from "@mui/material";

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
  }, []);

  const columns = [
    { id: "idEsquema", label: "Id" },
    { id: "descripcionLinea", label: "Linea" },
    { id: "descripcionRamal", label: "Ramal" },
    { id: "conductorMT", label: "Conductor MT" },
    { id: "conductorMS", label: "Conductor MS" },
    { id: "conductorTT", label: "Conductor T.T" },
    { id: "conductorTS", label: "Conductor T.S" },
    { id: "conductorNT", label: "Conductor N.T" },
    { id: "conductorNS", label: "Conductor N.S" },
    { id: "cocheTitular", label: "Coche T" },
    { id: "cocheSuplente", label: "Coche S" },
    { id: "tagIPK", label: "IPK" },
    { id: "tipoServicio", label: "Tipo Servicio" },
    { id: "tipoLicencia", label: "Tipo Licencia" },
    { id: "tagRotacion", label: "Tag Rotacion" },
  ];

  return (
    <div className="h-[calc(100vh)] flex items-center justify-center bg-orange-600">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <MaterialTable columns={columns} data={esquemas} />

          <div>
            <Button onClick={openModal}>Crear Nuevo Esquema</Button>
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
