import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-orange-500 p-16 rounded-md h-screen w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
