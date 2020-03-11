import React from "react";

// ESTILOS
import "./Course.css";

// COMPONENTE
const Course: React.FC<CourseProps> = (props: CourseProps) => {

  return (
    <div className="Course">
      <span className="courseCode"><i>{props.code}</i></span>
      <div className="courseContent">
        <div className="courseHead">
          <strong>Sección del curso: "{props.seccion}"</strong>
          <h1>{props.title}</h1>
          <p><strong>Salón: </strong>{props.salon} <strong>Horario: </strong>{props.horario}</p>
        </div>
        <div className="courseBody">
          <p>{props.cat} - Aux: {props.aux}</p>
        </div>
      </div>
    </div>
  )
}

export default Course;