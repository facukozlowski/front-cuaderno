import React, { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { Button, Card, Label } from "./ui/index";
import {
  Dialog,
  DialogContent,
  Select,
  MenuItem,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
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
  idModelo: number;
  idGaraje: number;
  idTagIPK: number;
  idTipoHabilitacion: number;
  idTipoServicio: number;
  idTipoLicencia: number;
  idTagRotacion: number;
}

interface EditModalProps {
  onClose: () => void;
  onSubmit: () => void;
  selectedEsquema: any | null;
}

const EditModal: React.FC<EditModalProps> = ({
  onClose,
  onSubmit,
  selectedEsquema,
}) => {
  const {
    updateEsquema,
    listLineas,
    listRamal,
    listConductores,
    listVehiculos,
    listModelo,
    listGaraje,
    listIPK,
    listHabilitacion,
    listServicio,
    listLicencias,
    listRotacion,
  } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    idLinea: selectedEsquema.idLinea,
    idRamal: selectedEsquema.idRamal,
    idCocheTitular: selectedEsquema.idCocheTitular,
    idCocheSuplente: selectedEsquema.idCocheSuplente,
    idConductorMT: selectedEsquema.idConductorMT,
    idConductorMS: selectedEsquema.idConductorMS,
    idConductorTT: selectedEsquema.idConductorTT,
    idConductorTS: selectedEsquema.idConductorTS,
    idConductorNT: selectedEsquema.idConductorNT,
    idConductorNS: selectedEsquema.idConductorNS,
    idModelo: selectedEsquema.idModelo,
    idGaraje: selectedEsquema.idGaraje,
    idTagIPK: selectedEsquema.idTagIPK,
    idTipoHabilitacion: selectedEsquema.idTipoHabilitacion,
    idTipoServicio: selectedEsquema.idTipoServicio,
    idTipoLicencia: selectedEsquema.idTipoLicencia,
    idTagRotacion: selectedEsquema.idTagRotacion,
  });

  const [lineas, setLineas] = useState<any[]>([]);
  const [ramal, setRamal] = useState<any[]>([]);
  const [conductores, setConductores] = useState<any[]>([]);
  const [vehiculos, setVehiculos] = useState<any[]>([]);
  const [modelos, setModelos] = useState<any[]>([]);
  const [garajes, setGarajes] = useState<any[]>([]);
  const [tagIpk, setTagIpk] = useState<any[]>([]);
  const [tipoHabilitacion, setTipoHabilitacion] = useState<any[]>([]);
  const [tipoServicio, setTipoServicio] = useState<any[]>([]);
  const [tipoLicencia, setTipoLicencia] = useState<any[]>([]);
  const [tagRotacion, setTagRotacion] = useState<any[]>([]);
  const [selectedModelos, setSelectedModelos] = useState<number[]>(
    selectedEsquema?.idModelo ? [selectedEsquema.idModelo] : []
  );

  useEffect(() => {
    console.log("Estado inicial de selectedModelos:", selectedModelos);
    const fetchData = async () => {
      try {
        const lineasData = await listLineas();
        const ramalData = await listRamal();
        const conductoresData = await listConductores();
        const vehiculosData = await listVehiculos();
        const modelosData = await listModelo();
        const garajesData = await listGaraje();
        const tagIpkData = await listIPK();
        const tipoHabilitacionData = await listHabilitacion();
        const tipoServicioData = await listServicio();
        const tipoLicenciaData = await listLicencias();
        const tagRotacionData = await listRotacion();

        setLineas(lineasData || []);
        setRamal(ramalData || []);
        setConductores(conductoresData || []);
        setVehiculos(vehiculosData || []);
        setModelos(modelosData || []);
        setGarajes(garajesData || []);
        setTagIpk(tagIpkData || []);
        setTipoHabilitacion(tipoHabilitacionData || []);
        setTipoServicio(tipoServicioData || []);
        setTipoLicencia(tipoLicenciaData || []);
        setTagRotacion(tagRotacionData || []);

        if (selectedEsquema) {
          setFormData((prevData) => ({
            ...prevData,
            idLinea: selectedEsquema.idLinea || 0,
            idRamal: selectedEsquema.idRamal || 0,
            idCocheTitular: selectedEsquema.idCocheTitular || 0,
            idCocheSuplente: selectedEsquema.idCocheSuplente || 0,
            idConductorMT: selectedEsquema.idConductorMT || 0,
            idConductorMS: selectedEsquema.idConductorMS || 0,
            idConductorTT: selectedEsquema.idConductorTT || 0,
            idConductorTS: selectedEsquema.idConductorTS || 0,
            idConductorNT: selectedEsquema.idConductorNT || 0,
            idConductorNS: selectedEsquema.idConductorNS || 0,
            idModelo: selectedEsquema.idModelo || 0,
            idGaraje: selectedEsquema.idGaraje || 0,
            idTagIPK: selectedEsquema.idTagIPK || 0,
            idTipoHabilitacion: selectedEsquema.idTipoHabilitacion || 0,
            idTipoServicio: selectedEsquema.idTipoServicio || 0,
            idTipoLicencia: selectedEsquema.idTipoLicencia || 0,
            idTagRotacion: selectedEsquema.idTagRotacion || 0,
          }));
          setSelectedModelos(selectedEsquema.idModelo || []);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [selectedEsquema]);

  const handleSelectChange = (name: string, value: number) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleModeloChange = (id: number): void => {
    setSelectedModelos((prevModelos) => {
      const newSelectedModelos = Array.isArray(prevModelos)
        ? prevModelos.includes(id)
          ? prevModelos.filter((modeloId) => modeloId !== id)
          : [...prevModelos, id]
        : [id];
      console.log("Después de actualizar:", newSelectedModelos);

      return newSelectedModelos;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Modelos antes de enviar:", selectedModelos);
    try {
      const esquemaId = selectedEsquema?.idEsquema;
      await updateEsquema(esquemaId, {
        ...formData,
        idModelo: Array.isArray(selectedModelos)
          ? selectedModelos
          : [selectedModelos],
      });

      onSubmit();
      onClose();
    } catch (error) {
      console.error("Error al actualizar esquema:", error);
    }
  };

  return (
    <div className="modal fixed inset-0 z-50 flex items-center justify-center">
      <Card className="full-screen">
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
          <DialogContent>
            <div className="h-full flex items-center justify-center text-center font-semibold">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6 mb-2 ">
                  <div className="col-span-1 mb-2">
                    <Label htmlFor="idLinea">
                      Línea
                      <FormControl fullWidth>
                        <Select
                          style={{
                            width: "400px",
                            margin: "12px",
                          }}
                          name="idLinea"
                          value={formData.idLinea}
                          onChange={(e) =>
                            handleSelectChange(
                              "idLinea",
                              e.target.value as number
                            )
                          }
                        >
                          {lineas.map((linea) => (
                            <MenuItem
                              style={{
                                display: "block",
                                textAlign: "center",
                                marginRight: "15px",
                              }}
                              key={linea.id}
                              value={linea.id}
                            >
                              {linea.descripcion}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Label>
                  </div>
                  <Label htmlFor="idRamal">
                    Ramal
                    <FormControl fullWidth>
                      <Select
                        style={{ width: "400px", margin: "12px" }}
                        name="idRamal"
                        value={formData.idRamal}
                        onChange={(e) =>
                          handleSelectChange(
                            "idRamal",
                            e.target.value as number
                          )
                        }
                      >
                        {ramal.map((ramal) => (
                          <MenuItem
                            style={{
                              display: "block",
                              textAlign: "center",
                              marginRight: "15px",
                            }}
                            key={ramal.id}
                            value={ramal.id}
                          >
                            {ramal.descripcion}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Label>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-2">
                  <div className="col-span-1 mb-2">
                    <Label htmlFor="idCocheTitular">
                      Coche Titular
                      <FormControl fullWidth>
                        <Select
                          style={{ width: "400px", margin: "12px" }}
                          name="idCocheTitular"
                          value={formData.idCocheTitular}
                          onChange={(e) =>
                            handleSelectChange(
                              "idCocheTitular",
                              e.target.value as number
                            )
                          }
                        >
                          {vehiculos.map((interno) => (
                            <MenuItem
                              style={{
                                display: "block",
                                textAlign: "center",
                                marginRight: "15px",
                              }}
                              key={interno.id}
                              value={interno.id}
                            >
                              {interno.interno}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Label>
                  </div>
                  <Label htmlFor="idCocheSuplente">
                    Coche Suplente
                    <FormControl fullWidth>
                      <Select
                        style={{ width: "400px", margin: "12px" }}
                        name="idCocheSuplente"
                        value={formData.idCocheSuplente}
                        onChange={(e) =>
                          handleSelectChange(
                            "idCocheSuplente",
                            e.target.value as number
                          )
                        }
                      >
                        {vehiculos.map((interno) => (
                          <MenuItem
                            style={{
                              display: "block",
                              textAlign: "center",
                              marginRight: "15px",
                            }}
                            key={interno.id}
                            value={interno.id}
                          >
                            {interno.interno}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Label>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-2">
                  <div className="col-span-1 mb-2">
                    <Label htmlFor="idConductorMT">
                      Conductor Mañana Titular
                      <FormControl fullWidth>
                        <Select
                          style={{ width: "400px", margin: "12px" }}
                          name="idConductorMT"
                          value={formData.idConductorMT}
                          onChange={(e) =>
                            handleSelectChange(
                              "idConductorMT",
                              e.target.value as number
                            )
                          }
                        >
                          {conductores.map((legajo) => (
                            <MenuItem
                              style={{
                                display: "block",
                                textAlign: "center",
                                marginRight: "15px",
                              }}
                              key={legajo.id}
                              value={legajo.id}
                            >
                              {legajo.apellidonombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Label>
                  </div>
                  <Label htmlFor="idConductorMS">
                    Conductor Mañana Suplente
                    <FormControl fullWidth>
                      <Select
                        style={{ width: "400px", margin: "12px" }}
                        name="idConductorMS"
                        value={formData.idConductorMS}
                        onChange={(e) =>
                          handleSelectChange(
                            "idConductorMS",
                            e.target.value as number
                          )
                        }
                      >
                        {conductores.map((legajo) => (
                          <MenuItem
                            style={{
                              display: "block",
                              textAlign: "center",
                              marginRight: "15px",
                            }}
                            key={legajo.id}
                            value={legajo.id}
                          >
                            {legajo.apellidonombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Label>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-2">
                  <div className="col-span-1 mb-2">
                    <Label htmlFor="idConductorTT">
                      Conductor Tarde Titular
                      <FormControl fullWidth>
                        <Select
                          style={{ width: "400px", margin: "12px" }}
                          name="idConductorTT"
                          value={formData.idConductorTT}
                          onChange={(e) =>
                            handleSelectChange(
                              "idConductorTT",
                              e.target.value as number
                            )
                          }
                        >
                          {conductores.map((legajo) => (
                            <MenuItem
                              style={{
                                display: "block",
                                textAlign: "center",
                                marginRight: "15px",
                              }}
                              key={legajo.id}
                              value={legajo.id}
                            >
                              {legajo.apellidonombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Label>
                  </div>
                  <Label htmlFor="idConductorTS">
                    Conductor Tarde Suplente
                    <FormControl fullWidth>
                      <Select
                        style={{ width: "400px", margin: "12px" }}
                        name="idConductorTS"
                        value={formData.idConductorTS}
                        onChange={(e) =>
                          handleSelectChange(
                            "idConductorTS",
                            e.target.value as number
                          )
                        }
                      >
                        {conductores.map((legajo) => (
                          <MenuItem
                            style={{
                              display: "block",
                              textAlign: "center",
                              marginRight: "15px",
                            }}
                            key={legajo.id}
                            value={legajo.id}
                          >
                            {legajo.apellidonombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Label>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-2">
                  <div className="col-span-1 mb-2">
                    <Label htmlFor="idConductorNT">
                      Conductor Nocturno Titular
                      <FormControl fullWidth>
                        <Select
                          style={{ width: "400px", margin: "12px" }}
                          name="idConductorNT"
                          value={formData.idConductorNT}
                          onChange={(e) =>
                            handleSelectChange(
                              "idConductorNT",
                              e.target.value as number
                            )
                          }
                        >
                          {conductores.map((legajo) => (
                            <MenuItem
                              style={{
                                display: "block",
                                textAlign: "center",
                                marginRight: "15px",
                              }}
                              key={legajo.id}
                              value={legajo.id}
                            >
                              {legajo.apellidonombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Label>
                  </div>
                  <Label htmlFor="idConductorNS">
                    Conductor Nocturno Suplente
                    <FormControl fullWidth>
                      <Select
                        style={{ width: "400px", margin: "12px" }}
                        name="idConductorNS"
                        value={formData.idConductorNS}
                        onChange={(e) =>
                          handleSelectChange(
                            "idConductorNS",
                            e.target.value as number
                          )
                        }
                      >
                        {conductores.map((legajo) => (
                          <MenuItem
                            style={{
                              display: "block",
                              textAlign: "center",
                              marginRight: "15px",
                            }}
                            key={legajo.id}
                            value={legajo.id}
                          >
                            {legajo.apellidonombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Label>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-2">
                  <div className="col-span-1 mb-2">
                    <Label htmlFor="idGaraje">
                      Garaje
                      <FormControl fullWidth>
                        <Select
                          style={{ width: "400px", margin: "12px" }}
                          name="idGaraje"
                          value={formData.idGaraje}
                          onChange={(e) =>
                            handleSelectChange(
                              "idGaraje",
                              e.target.value as number
                            )
                          }
                        >
                          {garajes.map((garaje) => (
                            <MenuItem
                              style={{
                                display: "block",
                                textAlign: "center",
                                marginRight: "15px",
                              }}
                              key={garaje.id}
                              value={garaje.id}
                            >
                              {garaje.descripcion}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Label>
                  </div>
                  <Label htmlFor="idTagIpk">
                    IPK
                    <FormControl fullWidth>
                      <Select
                        style={{ width: "400px", margin: "12px" }}
                        name="idTagIPK"
                        value={formData.idTagIPK}
                        onChange={(e) =>
                          handleSelectChange(
                            "idTagIPK",
                            e.target.value as number
                          )
                        }
                      >
                        {tagIpk.map((ipk) => (
                          <MenuItem
                            style={{
                              display: "block",
                              textAlign: "center",
                              marginRight: "15px",
                            }}
                            key={ipk.id}
                            value={ipk.id}
                          >
                            {ipk.descripcion}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Label>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-2">
                  <div className="col-span-1 mb-2">
                    <Label htmlFor="idTagRotacion">
                      Tag Rotación
                      <FormControl fullWidth>
                        <Select
                          style={{ width: "400px", margin: "12px" }}
                          name="idTagRotacion"
                          value={formData.idTagRotacion || 0}
                          onChange={(e) =>
                            handleSelectChange(
                              "idTagRotacion",
                              e.target.value as number
                            )
                          }
                        >
                          {tagRotacion.map((tagRotacion) => (
                            <MenuItem
                              style={{
                                display: "block",
                                textAlign: "center",
                                marginRight: "15px",
                              }}
                              key={tagRotacion.id}
                              value={tagRotacion.id}
                            >
                              {tagRotacion.descripcion}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Label>
                  </div>
                  <Label htmlFor="idTipoLicencia">
                    Tipo Licencia
                    <FormControl fullWidth>
                      <Select
                        style={{ width: "400px", margin: "12px" }}
                        name="idTipoLicencia"
                        value={formData.idTipoLicencia}
                        onChange={(e) =>
                          handleSelectChange(
                            "idTipoLicencia",
                            e.target.value as number
                          )
                        }
                      >
                        {tipoLicencia.map((tipoLicencia) => (
                          <MenuItem
                            style={{
                              display: "block",
                              textAlign: "center",
                              marginRight: "15px",
                            }}
                            key={tipoLicencia.id}
                            value={tipoLicencia.id}
                          >
                            {tipoLicencia.descripcion}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Label>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-2">
                  <div className="col-span-1 mb-2">
                    <Label htmlFor="idTipoServicio">
                      Tipo Servicio
                      <FormControl fullWidth>
                        <Select
                          style={{ width: "400px", margin: "12px" }}
                          name="idTipoServicio"
                          value={formData.idTipoServicio}
                          onChange={(e) =>
                            handleSelectChange(
                              "idTipoServicio",
                              e.target.value as number
                            )
                          }
                        >
                          {tipoServicio.map((tipoServicio) => (
                            <MenuItem
                              style={{
                                display: "block",
                                textAlign: "center",
                                marginRight: "15px",
                              }}
                              key={tipoServicio.id}
                              value={tipoServicio.id}
                            >
                              {tipoServicio.descripcion}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Label>
                  </div>
                  <Label htmlFor="idTipoHabilitacion">
                    Tipo Habilitación
                    <FormControl fullWidth>
                      <Select
                        style={{
                          width: "400px",
                          margin: "12px",
                          outline: "none",
                        }}
                        name="idTipoHabilitacion"
                        value={formData.idTipoHabilitacion}
                        onChange={(e) =>
                          handleSelectChange(
                            "idTipoHabilitacion",
                            e.target.value as number
                          )
                        }
                      >
                        {tipoHabilitacion.map((tipoHabilitacion) => (
                          <MenuItem
                            style={{
                              display: "block",
                              textAlign: "center",
                              marginRight: "15px",
                            }}
                            key={tipoHabilitacion.id}
                            value={tipoHabilitacion.id}
                          >
                            {tipoHabilitacion.descripcion}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Label>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div className="col-span-1 mb-2 mx-36">
                    <Label htmlFor="idModelo">
                      <FormControl fullWidth>
                        <FormGroup className="mt-6">
                          {modelos.slice(0, 4).map((modelo) => (
                            <FormControlLabel
                              key={modelo.idModelo}
                              control={
                                <Checkbox
                                  checked={selectedModelos.includes(modelo.id)}
                                  onChange={() => handleModeloChange(modelo.id)}
                                />
                              }
                              label={modelo.descripcion}
                            />
                          ))}
                        </FormGroup>
                      </FormControl>
                    </Label>
                  </div>
                  <div className="mt-6 mx-32">
                    <FormControl fullWidth>
                      <FormGroup className="mt-6">
                        {modelos.slice(4).map((modelo) => (
                          <FormControlLabel
                            key={modelo.idModelo}
                            control={
                              <Checkbox
                                checked={selectedModelos.includes(modelo.id)}
                                onChange={() => handleModeloChange(modelo.id)}
                              />
                            }
                            label={modelo.descripcion}
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={onClose}
                    className="mx-4 bg-red-600 hover:bg-red-500 text-white py-2 mt-10 rounded-md focus:outline-none focus:ring focus:border-red-500"
                  >
                    Cancelar
                  </Button>

                  <Button
                    type="submit"
                    className="mx-4 bg-green-600 hover:bg-green-500 text-white py-2 mt-10 rounded-md focus:outline-none focus:ring focus:border-green-500"
                  >
                    Guardar cambios
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
};

export default EditModal;
