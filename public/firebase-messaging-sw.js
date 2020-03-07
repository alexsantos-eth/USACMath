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

  const title = payload.data.title;
  const notificationTitle = `${title.charAt(0).toUpperCase()}${title.substr(1)}`;
  const notificationOptions = {
    body: payload.data.message,
    icon: '/images/icon.png',
    badge: '/images/badge.png',
    data: {
      url: payload.data.url
    },
    actions: payload.data.url === "noFile" ? undefined : [
      {
        action: 'seeFile',
        title: "Ver archivo",
        icon: "/images/eye.png"
      },
      {
        action: 'downloadFile',
        title: "Descargar",
        icon: "/images/download.png"
      }
    ],
    vibrate: [200, 200, 200]
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === 'downloadFile') {
    clients.openWindow(event.notification.data.url)
  } else {
    clients.openWindow('/');
  }
})