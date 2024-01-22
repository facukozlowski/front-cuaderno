import React from "react";
import { Button } from "@mui/material";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-80"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-gray-100 p-6">
            <p className="text-xl text-center text-gray-700 mb-4">
              ¿Seguro de que deseas eliminar este esquema?
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={onDelete}
                style={{
                  backgroundColor: "#e53e3e",
                  color: "#fff",
                  marginRight: "8px",
                }}
              >
                Eliminar
              </Button>
              <Button
                onClick={onClose}
                style={{ backgroundColor: "#cbd5e5", color: "#4a5568" }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
