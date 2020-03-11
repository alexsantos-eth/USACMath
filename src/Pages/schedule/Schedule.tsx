import React from "react";

// TEXTOS
import Strings from "../../Strings/strings.json";
import Courses from "../../Courses/courses.json";

// ESTILOS
import "./Schedule.css";
import Course from "../../Components/Course/Course";


const createCourseList = (area: CourseProps[]) => {
  const list = area.map((e: CourseProps, i: number) => <Course key={i} {...e} />)
  return list;
}

const Schedule: React.FC = () => {
  return (
    <div id="schedulePage">
      <div id="schWave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="var(--buttonsDark)" fillOpacity="1" d="M0,128L48,128C96,128,192,128,288,149.3C384,171,480,213,576,208C672,203,768,149,864,154.7C960,160,1056,224,1152,250.7C1248,277,1344,267,1392,261.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
      </div>
      <div id="scheduleBanner">
        <h1>{Strings.schedule.banner.title}</h1>
        <p>{Strings.schedule.banner.text}</p>
      </div>
      <div id="courses">
        <div className="coursesTitle">
          <span className="material-icons">business_center</span>
          <div>
            <h1>Sub-área: {Courses.basica.subarea}</h1>
            <p>Jefe de Sub-área: {Courses.basica.boss}</p>
          </div>
        </div>
        <div className="list">
          {createCourseList(Courses.basica.courses)}
        </div>

        <div className="coursesTitle">
          <span className="material-icons">business_center</span>
          <div>
            <h1>Sub-área: {Courses.intermedia.subarea}</h1>
            <p>Jefe de Sub-área: {Courses.intermedia.boss}</p>
          </div>
        </div>
        <div className="list">
          {createCourseList(Courses.intermedia.courses)}
        </div>


        <div className="coursesTitle">
          <span className="material-icons">business_center</span>
          <div>
            <h1>Sub-área: {Courses.aplicada.subarea}</h1>
            <p>Jefe de Sub-área: {Courses.aplicada.boss}</p>
          </div>
        </div>
        <div className="list">
          {createCourseList(Courses.aplicada.courses)}
        </div>

      </div>
    </div>
  )
}

export default Schedule;