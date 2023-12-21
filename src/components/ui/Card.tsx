import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="bg-zinc-900 p-16 rounded-md">{children}</div>;
};

export default Card;
