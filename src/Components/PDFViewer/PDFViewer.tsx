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
        src={props.src}
      />
    </>
  )
}

export default PdfViewer;