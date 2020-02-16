importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js'); // eslint-disable-line
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js'); // eslint-disable-line

firebase.initializeApp({
  apiKey: "AIzaSyAT8k-pXCuE7pkwBhtFq8jUJH5CgZQRYwg",
  authDomain: "mate.ingenieria.usac.app",
  databaseURL: "https://usacmath.firebaseio.com",
  projectId: "usacmath",
  storageBucket: "usacmath.appspot.com",
  messagingSenderId: "671038474128",
  appId: "1:671038474128:web:47bdaf85939e0ec5169515",
  measurementId: "G-Z5S1GTNTDS"
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = 'Departamento de Matemática';
  const notificationOptions = {
    body: payload.data.message,
    icon: '/images/icon.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});