import { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import EsquemaModal from "../components/EsquemaModal";
import MaterialTable from "../components/MaterialTable";
import { CircularProgress } from "@mui/material";
import { Button } from "../components/ui";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/deleteModal";

const EsquemaPage = () => {
  const { listEsquema, deleteEsquema } = useAuth();
  const [esquemas, setEsquemas] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEsquema, setSelectedEsquema] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openEditModal = (idEsquema: string) => {
    const esquema = esquemas.find((esq) => esq.idEsquema === idEsquema);
    if (esquema) {
      setSelectedEsquema(esquema);
      setIsEditModalOpen(true);
    }
  };

  const handleDelete = (idEsquema: string) => {
    console.log("handleDelete llamado");
    openDeleteModal();
    setSelectedEsquema(idEsquema);
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
  ];

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-orange-500">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div
            className="mt-5 max-h-screen overflow-hidden w-full"
            style={{ maxWidth: "90%", maxHeight: "100%", overflowX: "hidden" }}
          >
            <MaterialTable
              columns={columns}
              data={esquemas}
              actions={true}
              onEditClick={openEditModal}
              onDeleteClick={handleDelete}
            />
          </div>

          <div className="mt-6 mb-4">
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

      {isEditModalOpen && (
        <EditModal
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedEsquema(null);
          }}
          onSubmit={fetchData}
          selectedEsquema={selectedEsquema}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={async () => {
            if (selectedEsquema !== null) {
              await deleteEsquema(selectedEsquema, {});
              setEsquemas((prevEsquemas) =>
                prevEsquemas.filter(
                  (esquema) => esquema.idEsquema !== selectedEsquema
                )
              );
              setSelectedEsquema(null);
            }
            closeDeleteModal();
          }}
        />
      )}
    </div>
  );
};

export default EsquemaPage;
