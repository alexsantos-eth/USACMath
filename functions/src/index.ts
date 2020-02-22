import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

// INICIALIZAR FIREBASE
admin.initializeApp();

// TIPO DE NOTICIAS
interface Idata {
    course: string;
    link: string;
    text: string;
    title: string;
    type: string;
    upload: string;
}

// CUANDO HAY UN CAMBIO EN /DATA
exports.showPush = functions.database.ref("/data").onUpdate(async (snap: functions.Change<functions.database.DataSnapshot>) => {
    // OBTENER NOTICIAS, Y TOKENS DE USUARIOS
    const dataFeed: Idata[] = snap.after.val();
    const tokenList: admin.database.DataSnapshot = await admin.database().ref("tokens").once("value");
    const tokens: string[] = Object.values(tokenList.val());

    // PAYLOAD DE LA NOTIFICACION
    const payload = {
        notification: {
            title: "Departamento de Matemática",
            body: `Nuevo contenido disponible: ${dataFeed[dataFeed.length - 1].title}`,
            icon: "https://mate.ingenieria.usac.app/images/icon.png"
        }
    }

    // ENVIAR A LOS DISPOSITIVOS
    const fcm = await admin.messaging().sendToDevice(tokens, payload);
    console.log(fcm.results);
})