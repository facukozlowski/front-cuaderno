import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
} from "@mui/material";

interface Column {
  id: string;
  label: string;
}

interface MaterialTableProps {
  columns: Column[];
  data: any[];
  rowsPerPageOptions?: number[];
  actions?: boolean;
  onEditClick?: (idEsquema: string) => void;
}

const MaterialTable: React.FC<MaterialTableProps> = ({
  columns,
  data,
  rowsPerPageOptions = [5, 10, 25],
  actions = false,
  onEditClick,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleEdit = (idEsquema: string) => {
    console.log("Editar esquema con ID:", idEsquema);
  };

  const handleDelete = (idEsquema: string) => {
    console.log("eliminar esquema con ID:", idEsquema);
  };

  return (
    <div className="m-4 bg-white rounded-xl px-5 py-2">
      <TextField
        label="Buscar"
        variant="outlined"
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-2"
      />

      <TableContainer
        component={Paper}
        className="mb-4"
        style={{ overflowY: "auto", maxHeight: "420px" }}
      >
        <Table className="min-w-full my-10">
          <TableHead className="bg-gray-200" style={{ whiteSpace: "nowrap" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell
                    style={{ whiteSpace: "nowrap" }}
                    key={column.id}
                    className="py-2 px-4 md:w-1/12 sm:w-1/6"
                  >
                    {row[column.id]}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell>
                    <button
                      onClick={() => onEditClick && onEditClick(row.idEsquema)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(row.idEsquema)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Eliminar
                    </button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count}`
        }
        className="mb-2"
      />
    </div>
  );
};

export default MaterialTable;
