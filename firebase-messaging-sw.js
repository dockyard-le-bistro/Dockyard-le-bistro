importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");


firebase.initializeApp({

  apiKey: "AIzaSyAuaFGwNjJtV0mcXZ7Tw734R0Q4HzChs1k",

  authDomain: "dockyard-le-bistro.firebaseapp.com",

  projectId: "dockyard-le-bistro",

  storageBucket: "dockyard-le-bistro.firebasestorage.app",

  messagingSenderId: "991617661975",

  appId: "1:991617661975:web:9d69822a65b19fe31a3052"

});


const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {


  self.registration.showNotification(
    "🍽️ Dockyard Le Bistro",
    {

      body: "📦 New order received!",

      icon: "/logo.png",

      badge: "/logo.png"

    }
  );


});
