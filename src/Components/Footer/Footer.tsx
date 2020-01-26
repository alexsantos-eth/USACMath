import React from "react";

// ESTILOS
import "./Footer.css";

//PROPIEDADES
interface Props { text_1: string; text_2: string }

const Footer: React.FC<Props> = (props: Props) => {
  return (
    <footer>
      <div id="fContent">
        <span>{props.text_1}</span>
        <h1>{props.text_2} </h1>
      </div>
    </footer>
  )
}

export default Footer;