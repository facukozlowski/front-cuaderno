import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return <div className={"max-w-7xl px-4 mx-auto" + className}>{children}</div>;
};

export default Container;
