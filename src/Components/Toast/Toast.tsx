import React from "react";

// ESTILOS  
import "./Toast.css"

// PROPIEDADES
interface Props { text: string; }

const Toast: React.FC<Props> = (props: Props) => {
  return (
    <div className="toast">
      <span>{props.text}</span>
    </div>
  );
};

export default Toast;