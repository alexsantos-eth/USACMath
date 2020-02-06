import React, { useEffect } from "react";

// ESTILOS
import "./Preloader.css";

const Preloader: React.FC = () => {
  useEffect(() => {
    // OBTENER TODOS LOS LOADERS
    const span: NodeListOf<HTMLSpanElement> = document.querySelectorAll(".loader");

    // AGREGAR ANCHO ALEATORIO
    const randomize = () => span.forEach((el: HTMLSpanElement) => el.style.width = Math.random() * 100 + "%");

    // ANIMAR CADA 0.5S 
    const ints: NodeJS.Timeout = setInterval(randomize, 500);
    randomize();

    // BORRAR INTERVALO AL DESMONTAR
    return () => clearInterval(ints);
  })

  return (
    <div id="preloader">
      <span className="loader"></span>
      <span className="loader"></span>
      <span className="loader"></span>
      <span className="loader"></span>
      <div>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  )
}

export default Preloader;