import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRoutesProps {
  isAllowed: boolean;
  children?: ReactNode;
  redirectTo: string;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  redirectTo,
  isAllowed,
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoutes;
