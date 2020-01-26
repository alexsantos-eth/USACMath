import * as functions from 'firebase-functions';
import * as cors from "cors";
import * as express from "express";
import * as cheerio from "cheerio";
import Axios from "axios";

// PARSE PARA MULTIPART
const qs = require("querystring");

// URL DEL DEPARTAMENTO
const url: string = 'http://mate.ingenieria.usac.edu.gt//search_parameters.php';

// APP DE EXPRESS
const app = express();
app.use(cors({ origin: true }));

// TIPO DEL REQUEST
interface MathReq { type: number; curs: number; keyword: string }

// FUNCION DE WEB SCRAPPING
const handler = (req: express.Request, res: express.Response) => {
    // REQUEST AL SERVIDOR DEL DEPARTAMENTO
    const dynamicReq: MathReq = { type: 0, curs: 0, keyword: req.params.key || "" }

    // OBTENER TEXT/HTML DEL DEPARTAMENTO
    Axios.post(url, qs.stringify(dynamicReq), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(data => {
            // CARGAR Y OBTENER TODAS LAS FILAS
            const c: CheerioStatic = cheerio.load(data.data);
            const row: CheerioElement[] = c('tr[style="color:#000000"]').toArray();

            // RECORRER LAS COLUMNAS DE CADA FILA
            const cols = row.map((el: CheerioElement) => {
                // OBETNER DATOS DE CADA COLUMNA
                const anchor: Cheerio = c(el.childNodes[0].childNodes[0]);
                const text = c(el.childNodes[1]).text().toLowerCase().trim();
                const upload = c(el.childNodes[3]).text().toLowerCase().trim();
                const course = c(el.childNodes[4]).text().toLowerCase().trim();
                const type = c(el.childNodes[5]).text().toLowerCase().trim();

                // RETORNAR OBJETO COMPLETO
                return {
                    title: anchor.text().toLowerCase().trim(),
                    link: "http://mate.ingenieria.usac.edu.gt//" + anchor.children("a").attr("href"),
                    text,
                    upload,
                    type,
                    course
                }
            });

            // ELIMINAR LA PRIMERA FILA Y ENVIAR
            cols.shift();
            res.json(cols);
        })
        .catch((err: Error) => res.status(400).send(err))
}

// MOSTRAR RESULTADO DE SCRAPPING EN INDEX Y EN :PARAMS
app.get("/", handler);
app.get("/:key", handler);

exports.api = functions.https.onRequest(app);