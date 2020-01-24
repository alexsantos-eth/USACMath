import React, { useEffect } from "react";
import Axios from "axios";

// URL DEL DEPARTAMENTO
const url:string = 'https://proxy.ingenieria.usac.edu.gt/autenticacion/XUI/#login/&goto=https%3A%2F%2Fdashboardacademico.ingenieria.usac.edu.gt';

const GetData:React.FC = () =>{
    useEffect(() =>{
        Axios(url)
        .then(data =>{
            console.log(data);
        })
    }, [])

    return(
        <h1>
            Hola
        </h1>
    )
}

export default GetData;