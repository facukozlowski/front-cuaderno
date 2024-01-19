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
    listConductores,
    listVehiculos,
    listModelo,
    listGaraje,
    listIPK,
    listServicio,
    listLicencias,
    listRotacion,
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
    idModelo: 0,
    idGaraje: 0,
    idTagIPK: 0,
    idTipoServicio: 0,
    idTipoLicencia: 0,
    idTagRotacion: 0,
  });

  const [lineas, setLineas] = useState<any[]>([]);
  const [ramal, setRamal] = useState<any[]>([]);
  const [conductores, setConductores] = useState<any[]>([]);
  const [vehiculos, setVehiculos] = useState<any[]>([]);
  const [modelos, setModelos] = useState<any[]>([]);
  const [garajes, setGarajes] = useState<any[]>([]);
  const [tagIpk, setTagIpk] = useState<any[]>([]);
  const [tipoServicio, setTipoServicio] = useState<any[]>([]);
  const [tipoLicencia, setTipoLicencia] = useState<any[]>([]);
  const [tagRotacion, setTagRotacion] = useState<any[]>([]);

  useEffect(() => {
    const fetchLineas = async () => {
      try {
        const lineasData = await listLineas();
        setLineas(lineasData || []);
      } catch (error) {
        console.error("Error al obtener lineas:", error);
      }
    };

    const fetchRamales = async () => {
      try {
        const ramalData = await listRamal();
        setRamal(ramalData || []);
      } catch (error) {
        console.error("Error al obtener ramales:", error);
      }
    };

    const fetchConductores = async () => {
      try {
        const conductoresData = await listConductores();
        setConductores(conductoresData || []);
      } catch (error) {
        console.error("Error al obtener conductores:", error);
      }
    };

    const fetchVehiculos = async () => {
      try {
        const vehiculosData = await listVehiculos();
        setVehiculos(vehiculosData || []);
      } catch (error) {
        console.error("Error al obtener los vehículos", error);
      }
    };

    const fetchModelos = async () => {
      try {
        const modelosData = await listModelo();
        setModelos(modelosData || []);
      } catch (error) {
        console.error("Error al obtener los modelos", error);
      }
    };

    const fetchGarajes = async () => {
      try {
        const garajesData = await listGaraje();
        setGarajes(garajesData || []);
      } catch (error) {
        console.error("Error al obtener los modelos", error);
      }
    };

    const fetchTagIpk = async () => {
      try {
        const ipkData = await listIPK();
        setTagIpk(ipkData || []);
      } catch (error) {
        console.error("Error al cargar datos", error);
      }
    };

    const fetchTipoServicio = async () => {
      try {
        const tipoServicioData = await listServicio();
        setTipoServicio(tipoServicioData || []);
      } catch (error) {
        console.error("Error al cargar tipos de servicio.", error);
      }
    };

    const fetchTipoLicencia = async () => {
      try {
        const tipoLicenciaData = await listLicencias();
        setTipoLicencia(tipoLicenciaData || []);
      } catch (error) {
        console.error();
      }
    };

    const fetchTagRotacion = async () => {
      try {
        const tagRotacionData = await listRotacion();
        setTagRotacion(tagRotacionData || []);
      } catch (error) {
        console.error("Error al cargar datos.", error);
      }
    };

    fetchLineas();
    fetchRamales();
    fetchConductores();
    fetchVehiculos();
    fetchModelos();
    fetchGarajes();
    fetchTagIpk();
    fetchTipoServicio();
    fetchTipoLicencia();
    fetchTagRotacion();
  }, [
    listLineas,
    listRamal,
    listConductores,
    listVehiculos,
    listModelo,
    listGaraje,
    listIPK,
    listServicio,
    listLicencias,
    listRotacion,
  ]);

  const handleSelectChange = (name: string, value: number) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEsquema({ ...formData, idModelo: [selectedModelos] });
      onSubmit();
    } catch (error) {
      console.error("Error al crear esquema:", error);
    }
  };

  const [selectedModelos, setSelectedModelos] = useState<number[]>([]);

  const handleModeloChange = (idModelo: number) => {
    if (selectedModelos.includes(idModelo)) {
      setSelectedModelos((prevSelected) =>
        prevSelected.filter((id) => id !== idModelo)
      );
    } else {
      setSelectedModelos((prevSelected) => [...prevSelected, idModelo]);
    }
  };

  return (
    <div className="modal fixed inset-0 z-50 flex items-center justify-center">
      <Card className="full-screen ">
        <Dialog open={true} onClose={onClose}>
          <DialogContent className="py-5">
            <div className="modal-content p-8 rounded-md max-w mx-auto relative h-full py-5">
              <div className="h-full flex items-center justify-center">
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <Label htmlFor="idLinea" className="mb-4">
                        Linea:
                        <FormControl fullWidth>
                          <Select
                            name="idLinea"
                            value={formData.idLinea}
                            onChange={(e) =>
                              handleSelectChange(
                                "idLinea",
                                e.target.value as number
                              )
                            }
                          >
                            <MenuItem value={0}>Seleccionar</MenuItem>
                            {lineas.map((linea) => (
                              <MenuItem key={linea.id} value={linea.id}>
                                {linea.descripcion}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Label>
                    </div>
                    <Label htmlFor="idRamal" className="mb-4">
                      Ramal:
                      <FormControl fullWidth>
                        <Select
                          name="idRamal"
                          value={formData.idRamal}
                          onChange={(e) =>
                            handleSelectChange(
                              "idRamal",
                              e.target.value as number
                            )
                          }
                        >
                          <MenuItem value={0}>Seleccionar</MenuItem>
                          {ramal.map((ramal) => (
                            <MenuItem key={ramal.id} value={ramal.id}>
                              {ramal.descripcion}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <Label htmlFor="idCocheTitular" className="mb-4">
                        Coche Titular:
                        <FormControl fullWidth>
                          <Select
                            name="idCocheTitular"
                            value={formData.idCocheTitular}
                            onChange={(e) =>
                              handleSelectChange(
                                "idCocheTitular",
                                e.target.value as number
                              )
                            }
                          >
                            <MenuItem value={0}>Seleccionar</MenuItem>

                            {vehiculos.map((interno) => (
                              <MenuItem key={interno.id} value={interno.id}>
                                {interno.interno}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Label>
                    </div>
                    <Label htmlFor="idCocheSuplente" className="mb-4">
                      Coche Suplente:
                      <FormControl fullWidth>
                        <Select
                          name="idCocheSuplente"
                          value={formData.idCocheSuplente}
                          onChange={(e) =>
                            handleSelectChange(
                              "idCocheSuplente",
                              e.target.value as number
                            )
                          }
                        >
                          <MenuItem value={0}>Seleccionar</MenuItem>

                          {vehiculos.map((interno) => (
                            <MenuItem key={interno.id} value={interno.id}>
                              {interno.interno}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <Label htmlFor="idConductorMT" className="mb-4">
                        Conductor Mañana Titular:
                        <FormControl fullWidth>
                          <Select
                            name="idConductorMT"
                            value={formData.idConductorMT}
                            onChange={(e) =>
                              handleSelectChange(
                                "idConductorMT",
                                e.target.value as number
                              )
                            }
                          >
                            <MenuItem value={0}>Seleccionar</MenuItem>
                            {conductores.map((legajo) => (
                              <MenuItem key={legajo.id} value={legajo.id}>
                                {legajo.apellidonombre}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Label>
                    </div>
                    <Label htmlFor="idConductorMS" className="mb-4">
                      Conductor Mañana Suplente:
                      <FormControl fullWidth>
                        <Select
                          name="idConductorMS"
                          value={formData.idConductorMS}
                          onChange={(e) =>
                            handleSelectChange(
                              "idConductorMS",
                              e.target.value as number
                            )
                          }
                        >
                          <MenuItem value={0}>Seleccionar</MenuItem>
                          {conductores.map((legajo) => (
                            <MenuItem key={legajo.id} value={legajo.id}>
                              {legajo.apellidonombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <Label htmlFor="idConductorTT" className="mb-4">
                        Conductor Tarde Titular:
                        <FormControl fullWidth>
                          <Select
                            name="idConductorTT"
                            value={formData.idConductorTT}
                            onChange={(e) =>
                              handleSelectChange(
                                "idConductorTT",
                                e.target.value as number
                              )
                            }
                          >
                            <MenuItem value={0}>Seleccionar</MenuItem>
                            {conductores.map((legajo) => (
                              <MenuItem key={legajo.id} value={legajo.id}>
                                {legajo.apellidonombre}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Label>
                    </div>
                    <Label htmlFor="idConductorTS" className="mb-4">
                      Conductor Tarde Suplente:
                      <FormControl fullWidth>
                        <Select
                          name="idConductorTS"
                          value={formData.idConductorTS}
                          onChange={(e) =>
                            handleSelectChange(
                              "idConductorTS",
                              e.target.value as number
                            )
                          }
                        >
                          <MenuItem value={0}>Seleccionar</MenuItem>
                          {conductores.map((legajo) => (
                            <MenuItem key={legajo.id} value={legajo.id}>
                              {legajo.apellidonombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-1">
                      <Label htmlFor="idConductorNT" className="mb-4">
                        Conductor Nocturno Titular:
                        <FormControl fullWidth>
                          <Select
                            name="idConductorNT"
                            value={formData.idConductorNT}
                            onChange={(e) =>
                              handleSelectChange(
                                "idConductorNT",
                                e.target.value as number
                              )
                            }
                          >
                            <MenuItem value={0}>Seleccionar</MenuItem>

                            {conductores.map((legajo) => (
                              <MenuItem key={legajo.id} value={legajo.id}>
                                {legajo.apellidonombre}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Label>
                    </div>
                    <Label htmlFor="idConductorNS" className="mb-4">
                      Conductor Nocturno Suplente:
                      <FormControl fullWidth>
                        <Select
                          name="idConductorNS"
                          value={formData.idConductorNS}
                          onChange={(e) =>
                            handleSelectChange(
                              "idConductorNS",
                              e.target.value as number
                            )
                          }
                        >
                          <MenuItem value={0}>Seleccionar</MenuItem>

                          {conductores.map((legajo) => (
                            <MenuItem key={legajo.id} value={legajo.id}>
                              {legajo.apellidonombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <Label htmlFor="idGaraje" className="mb-4">
                        Garaje:
                        <FormControl fullWidth>
                          <Select
                            name="idGaraje"
                            value={formData.idGaraje}
                            onChange={(e) =>
                              handleSelectChange(
                                "idGaraje",
                                e.target.value as number
                              )
                            }
                          >
                            <MenuItem value={0}>Seleccionar</MenuItem>

                            {garajes.map((garaje) => (
                              <MenuItem key={garaje.id} value={garaje.id}>
                                {garaje.descripcion}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Label>
                    </div>
                    <Label htmlFor="idTagIpk" className="mb-4">
                      IPK:
                      <FormControl fullWidth>
                        <Select
                          name="idTagIPK"
                          value={formData.idTagIPK}
                          onChange={(e) =>
                            handleSelectChange(
                              "idTagIPK",
                              e.target.value as number
                            )
                          }
                        >
                          <MenuItem value={0}>Seleccionar</MenuItem>

                          {tagIpk.map((ipk) => (
                            <MenuItem key={ipk.id} value={ipk.id}>
                              {ipk.descripcion}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <Label htmlFor="idTagRotacion" className="mb-4">
                        Tag Rotación:
                        <FormControl fullWidth>
                          <Select
                            name="idTagRotacion"
                            value={formData.idTagRotacion || 0}
                            onChange={(e) =>
                              handleSelectChange(
                                "idTagRotacion",
                                e.target.value as number
                              )
                            }
                          >
                            <MenuItem value={0}>Seleccionar</MenuItem>
                            {tagRotacion.map((tagRotacion) => (
                              <MenuItem
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
                    <Label htmlFor="idTipoLicencia" className="mb-4">
                      Tipo Licencia:
                      <FormControl fullWidth>
                        <Select
                          name="idTipoLicencia"
                          value={formData.idTipoLicencia}
                          onChange={(e) =>
                            handleSelectChange(
                              "idTipoLicencia",
                              e.target.value as number
                            )
                          }
                        >
                          <MenuItem value={0}>Seleccionar</MenuItem>

                          {tipoLicencia.map((tipoLicencia) => (
                            <MenuItem
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

                  <Label htmlFor="idTipoServicio" className="mb-4">
                    Tipo Servicio:
                    <FormControl fullWidth>
                      <Select
                        name="idTipoServicio"
                        value={formData.idTipoServicio}
                        onChange={(e) =>
                          handleSelectChange(
                            "idTipoServicio",
                            e.target.value as number
                          )
                        }
                      >
                        <MenuItem value={0}>Seleccionar</MenuItem>

                        {tipoServicio.map((tipoServicio) => (
                          <MenuItem
                            key={tipoServicio.id}
                            value={tipoServicio.id}
                          >
                            {tipoServicio.descripcion}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Label>

                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="col-span-1 mt-6 mx-8">
                      <Label htmlFor="idModelo">
                        <div className="mb-4"> Modelo:</div>
                        <FormControl fullWidth>
                          <FormGroup>
                            {modelos.slice(0, 4).map((modelo) => (
                              <FormControlLabel
                                key={modelo.idModelo}
                                control={
                                  <Checkbox
                                    checked={selectedModelos.includes(
                                      modelo.id
                                    )}
                                    onChange={() =>
                                      handleModeloChange(modelo.id)
                                    }
                                  />
                                }
                                label={modelo.descripcion}
                              />
                            ))}
                          </FormGroup>
                        </FormControl>
                      </Label>
                    </div>
                    <div className="col-span-1 mt-16 mx-8">
                      <FormControl fullWidth>
                        <FormGroup>
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

                  <Button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 mt-10 rounded-md focus:outline-none focus:ring focus:border-green-500"
                  >
                    Crear Esquema
                  </Button>
                  <Button
                    onClick={onClose}
                    className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md focus:outline-none focus:ring focus:border-red-500"
                  >
                    Cancelar
                  </Button>
                </form>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
};

export default EsquemaModal;
