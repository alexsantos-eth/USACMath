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

const sendNotification = async (data: { title: string, message: string, url: string }) => {
    const tokenList: admin.database.DataSnapshot = await admin.database().ref("tokens").once("value");
    const tokens: string[] = Object.values(tokenList.val());

    const messageS: admin.messaging.MulticastMessage = {
        data,
        tokens: tokens,
        webpush: {
            fcmOptions: {
                link: "https://mate.ingenieria.usac.app/#news"
            }
        }
    }
    // ENVIAR A LOS DISPOSITIVOS
    return admin.messaging().sendMulticast(messageS);
}

// CUANDO HAY UN CAMBIO EN /DATA
exports.showPush = functions.database.ref("/data").onUpdate(async (snap: functions.Change<functions.database.DataSnapshot>) => {
    // OBTENER NOTICIAS, Y TOKENS DE USUARIOS
    const dataFeed: Idata[] = snap.after.val();
    sendNotification({
        title: dataFeed[dataFeed.length - 1].title,
        message: dataFeed[dataFeed.length - 1].text,
        url: dataFeed[dataFeed.length - 1].link
    });
})

// ENVIAR NOTIFICACION NORMAL
exports.sendPush = functions.https.onRequest(async (req, res) => {
    const title = req.query.title;
    const message = req.query.message;

    sendNotification({
        title,
        message,
        url: "noFile"
    }).then(() => {
        res.send("Se envio correctamente la notificacion");
    })
})