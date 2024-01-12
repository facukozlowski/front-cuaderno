import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { Button, Card, Input, Label } from "./ui/index";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";

interface FormData {
  idLinea: number;
  idRamal: number;
  idCocheTitular: number;
  idCocheSuplente: number;
  idConductorMT: number;
  idConductorMS: number;
  idConductorTT: number;
  idConductorTS: number;
  idConductorNT: number;
  idConductorNS: number;
  idTagIPK: number;
  idTipoServicio: number;
  idTipoLicencia: number;
  idTagRotacion: number;
}

interface EsquemaModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

const EsquemaModal: React.FC<EsquemaModalProps> = ({ onClose, onSubmit }) => {
  const {
    createEsquema,
    listLineas,
    listRamal,
    listVehiculos,
    listConductores,
    listIPK,
    listServicio,
    listRotacion,
    listLicencias,
  } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    idLinea: 0,
    idRamal: 0,
    idCocheTitular: 0,
    idCocheSuplente: 0,
    idConductorMT: 0,
    idConductorMS: 0,
    idConductorTT: 0,
    idConductorTS: 0,
    idConductorNT: 0,
    idConductorNS: 0,
    idTagIPK: 0,
    idTipoServicio: 0,
    idTipoLicencia: 0,
    idTagRotacion: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEsquema(formData);
      onSubmit();
    } catch (error) {
      console.error("Error al crear esquema:", error);
    }
  };

  return (
    <div className="modal">
      <Dialog open={true} onClose={onClose}>
        <DialogTitle>Crear Nuevo Esquema</DialogTitle>
        <DialogContent>
          <div className="modal-content">
            <div className="h-[calc(100vh)] flex items-center justify-center bg-orange-600">
              <Card>
                <form onSubmit={onSubmit} className="max-w-md mx-auto">
                  <Label htmlFor="idLinea" className="mb-4">
                    id Linea:
                    <Input
                      type="text"
                      name="idLinea"
                      value={formData.idLinea}
                      onChange={handleInputChange}
                    />
                  </Label>
                  <Label htmlFor="idRamal" className="mb-4">
                    idRamal:
                    <Input
                      type="text"
                      name="idRamal"
                      value={formData.idRamal}
                      onChange={handleInputChange}
                    />
                  </Label>
                  <Label htmlFor="idCocheTitular" className="mb-4">
                    idCocheTitular:
                    <Input
                      type="text"
                      name="idCocheTitular"
                      value={formData.idCocheTitular}
                      onChange={handleInputChange}
                    />
                  </Label>
                  <Label htmlFor="idCocheSuplente" className="mb-4">
                    idCocheSuplente:
                    <Input
                      type="text"
                      name="idCocheSuplente"
                      value={formData.idCocheSuplente}
                      onChange={handleInputChange}
                    />
                  </Label>
                  <Label htmlFor="idConductorMT">
                    idConductorMT:
                    <Input
                      type="text"
                      name="idConductorMT"
                      value={formData.idConductorMT}
                      onChange={handleInputChange}
                    />
                  </Label>
                  <Label htmlFor="idConductorMS">
                    idConductorMS:
                    <Input
                      type="text"
                      name="idConductorMS"
                      value={formData.idConductorMS}
                      onChange={handleInputChange}
                    />
                  </Label>
                  <Label htmlFor="idConductorTT">
                    idConductorTT:
                    <Input
                      type="text"
                      name="idConductorTT"
                      value={formData.idConductorTT}
                      onChange={handleInputChange}
                    />
                  </Label>
                  <Label htmlFor="idConductorTS">
                    idConductorTS:
                    <Input
                      type="text"
                      name="idConductorTS"
                      value={formData.idConductorTS}
                      onChange={handleInputChange}
                    />
                  </Label>
                  <Label htmlFor="idConductorNT">
                    idConductorNT:
                    <Input
                      type="text"
                      name="idConductorNT"
                      value={formData.idConductorNT}
                      onChange={handleInputChange}
                    />
                  </Label>
                  <Label htmlFor="idConductorNS">
                    idConductorNS:
                    <Input
                      type="text"
                      name="idConductorNS"
                      value={formData.idConductorNS}
                      onChange={handleInputChange}
                    />
                  </Label>
                  <Label htmlFor="idTagIPK">
                    idTagIPK:
                    <Input
                      type="text"
                      name="idTagIPK"
                      value={formData.idTagIPK}
                      onChange={handleInputChange}
                    />
                  </Label>
                  <Label htmlFor="idTipoServicio">
                    idTipoServicio:
                    <Input
                      type="text"
                      name="idTipoServicio"
                      value={formData.idTipoServicio}
                      onChange={handleInputChange}
                    />
                  </Label>
                  <Label htmlFor="idTipoLicencia">
                    idTipoLicencia:
                    <Input
                      type="text"
                      name="idTipoLicencia"
                      value={formData.idTipoLicencia}
                      onChange={handleInputChange}
                    />
                  </Label>
                  <Label htmlFor="idTagRotacion">
                    idTagRotacion:
                    <Input
                      type="text"
                      name="idTagRotacion"
                      value={formData.idTagRotacion}
                      onChange={handleInputChange}
                    />
                  </Label>

                  <Button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Enviar Datos
                  </Button>
                </form>
              </Card>
            </div>
            <Button onClick={onClose}>Cerrar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EsquemaModal;
