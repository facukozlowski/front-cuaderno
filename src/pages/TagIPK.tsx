import { useState, useEffect } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Card } from "../components/ui";
import MaterialTable from "../components/MaterialTable";
import { CircularProgress } from "@mui/material";

const TagIPK = () => {
  const { listIPK } = useAuth();
  const [tagIpk, setTagIpk] = useState<any[]>([]);

  useEffect(() => {
    const fetchedTagIpk = async () => {
      try {
        const fetchedTagIpk = await listIPK();
        if (Array.isArray(fetchedTagIpk)) {
          setTagIpk(fetchedTagIpk);
        }
      } catch (error) {
        console.error("Error al listar tag IPK", error);
      }
    };

    fetchedTagIpk();
  }, []);

  interface Column {
    id: string;
    label: string;
  }

  const columns: Column[] = [
    { id: "id", label: "Id" },
    { id: "descripcion", label: "Descripcion" },
  ];

  return (
    <div className="h-[calc(100vh-0rem)] flex items-center justify-center bg-orange-600 ">
      <Card>
        {tagIpk.length > 0 && <MaterialTable columns={columns} data={tagIpk} />}

        {tagIpk.length === 0 && <CircularProgress />}
      </Card>
    </div>
  );
};

export default TagIPK;
