import React from "react";

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
    <div className="modal-container">
      <div className="modal-content">
        <p>¿Estás seguro de que deseas eliminar este esquema?</p>
        <button onClick={onDelete}>Eliminar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default DeleteModal;
