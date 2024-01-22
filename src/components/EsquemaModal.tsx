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
    listHabilitacion,
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
    idTipoHabilitacion: 0,
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
  const [tipoHabilitacion, setTipoHabilitacion] = useState<any[]>([]);
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

    const fetchTipoHabilitacion = async () => {
      try {
        const tipoHabilitacionData = await listHabilitacion();
        setTipoHabilitacion(tipoHabilitacionData || []);
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
    fetchTipoHabilitacion();
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
    listHabilitacion,
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
      <Card className="full-screen">
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
          <DialogContent>
            <div className="h-full flex items-center justify-center text-center font-semibold">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-1 mb-4">
                    <Label htmlFor="idLinea">
                      Linea
                      <FormControl fullWidth>
                        <Select
                          style={{ width: "400px", margin: "12px" }}
                          name="idLinea"
                          value={formData.idLinea}
                          onChange={(e) =>
                            handleSelectChange(
                              "idLinea",
                              e.target.value as number
                            )
                          }
                        >
                          <MenuItem
                            style={{
                              display: "block",
                              textAlign: "center",
                              marginRight: "15px",
                            }}
                            value={0}
                          >
                            Seleccionar
                          </MenuItem>
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
                        <MenuItem
                          style={{
                            display: "block",
                            textAlign: "center",
                            marginRight: "15px",
                          }}
                          value={0}
                        >
                          Seleccionar
                        </MenuItem>
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
                  <div className="col-span-1 mb-4">
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
                          <MenuItem
                            style={{
                              display: "block",
                              textAlign: "center",
                              marginRight: "15px",
                            }}
                            value={0}
                          >
                            Seleccionar
                          </MenuItem>

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
                        <MenuItem
                          style={{
                            display: "block",
                            textAlign: "center",
                            marginRight: "15px",
                          }}
                          value={0}
                        >
                          Seleccionar
                        </MenuItem>

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
                  <div className="col-span-1 mb-4">
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
                          <MenuItem
                            style={{
                              display: "block",
                              textAlign: "center",
                              marginRight: "15px",
                            }}
                            value={0}
                          >
                            Seleccionar
                          </MenuItem>
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
                        <MenuItem
                          style={{
                            display: "block",
                            textAlign: "center",
                            marginRight: "15px",
                          }}
                          value={0}
                        >
                          Seleccionar
                        </MenuItem>
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
                  <div className="col-span-1 mb-4">
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
                          <MenuItem
                            style={{
                              display: "block",
                              textAlign: "center",
                              marginRight: "15px",
                            }}
                            value={0}
                          >
                            Seleccionar
                          </MenuItem>
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
                        <MenuItem
                          style={{
                            display: "block",
                            textAlign: "center",
                            marginRight: "15px",
                          }}
                          value={0}
                        >
                          Seleccionar
                        </MenuItem>
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
                  <div className="col-span-1 mb-4">
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
                          <MenuItem
                            style={{
                              display: "block",
                              textAlign: "center",
                              marginRight: "15px",
                            }}
                            value={0}
                          >
                            Seleccionar
                          </MenuItem>

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
                        <MenuItem
                          style={{
                            display: "block",
                            textAlign: "center",
                            marginRight: "15px",
                          }}
                          value={0}
                        >
                          Seleccionar
                        </MenuItem>

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
                  <div className="col-span-1 mb-4">
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
                          <MenuItem
                            style={{
                              display: "block",
                              textAlign: "center",
                              marginRight: "15px",
                            }}
                            value={0}
                          >
                            Seleccionar
                          </MenuItem>

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
                        <MenuItem
                          style={{
                            display: "block",
                            textAlign: "center",
                            marginRight: "15px",
                          }}
                          value={0}
                        >
                          Seleccionar
                        </MenuItem>

                        {tagIpk.map((ipk) => (
                          <MenuItem
                            style={{
                              display: "block",
                              textAlign: "center",
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
                  <div className="col-span-1 mb-4">
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
                          <MenuItem
                            style={{
                              display: "block",
                              textAlign: "center",
                              marginRight: "15px",
                            }}
                            value={0}
                          >
                            Seleccionar
                          </MenuItem>
                          {tagRotacion.map((tagRotacion) => (
                            <MenuItem
                              style={{
                                display: "block",
                                textAlign: "center",
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
                        <MenuItem
                          style={{
                            display: "block",
                            textAlign: "center",
                            marginRight: "15px",
                          }}
                          value={0}
                        >
                          Seleccionar
                        </MenuItem>

                        {tipoLicencia.map((tipoLicencia) => (
                          <MenuItem
                            style={{
                              display: "block",
                              textAlign: "center",
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
                  <div className="col-span-1 mb-4">
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
                          <MenuItem
                            style={{
                              display: "block",
                              textAlign: "center",
                              marginRight: "15px",
                            }}
                            value={0}
                          >
                            Seleccionar
                          </MenuItem>

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
                        style={{ width: "400px", margin: "12px" }}
                        name="idTipoHabilitacion"
                        value={formData.idTipoHabilitacion}
                        onChange={(e) =>
                          handleSelectChange(
                            "idTipoHabilitacion",
                            e.target.value as number
                          )
                        }
                      >
                        <MenuItem
                          style={{
                            display: "block",
                            textAlign: "center",
                            marginRight: "15px",
                          }}
                          value={0}
                        >
                          Seleccionar
                        </MenuItem>

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
                    className="mx-4  bg-red-600 hover:bg-red-500 text-white py-2 mt-10 rounded-md focus:outline-none focus:ring focus:border-red-500"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="mx-4 bg-green-600 hover:bg-green-500 text-white py-2 mt-10 rounded-md focus:outline-none focus:ring focus:border-green-500"
                  >
                    Crear Esquema
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

export default EsquemaModal;
