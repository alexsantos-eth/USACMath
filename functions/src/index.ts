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

    const message: admin.messaging.MulticastMessage = {
        data: {
            title: dataFeed[dataFeed.length - 1].title,
            message: dataFeed[dataFeed.length - 1].text,
            url: dataFeed[dataFeed.length - 1].link
        },
        tokens: tokens,
        webpush: {
            fcmOptions: {
                link: "https://mate.ingenieria.usac.app/#news"
            }
        }
    }

    // ENVIAR A LOS DISPOSITIVOS
    const fcm = await admin.messaging().sendMulticast(message);
    console.log(fcm);
})