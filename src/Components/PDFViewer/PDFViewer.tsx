import React from "react";

// ESTILOS
import "./PDFViewer.css";

// PROPIEDADES
interface Props { src: string; title: string; }

const PdfViewer: React.FC<Props> = (props: Props) => {
  return (
    <>
      <iframe
        width="100%"
        height="100%"
        title={props.title}
        src={`https://docs.google.com/gview?key=AIzaSyAwfxDJGqe8LU3HFu4HhyWYlUJtoYYBF5g&embedded=true&url=${props.src}`}
      />
    </>
  )
}

export default PdfViewer;