importScripts('https://www.gstatic.com/firebasejs/5.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.6.0/firebase-messaging.js');


firebase.initializeApp({
    'messagingSenderId': '802914483090'
});


const messaging = firebase.messaging();


messaging.setBackgroundMessageHandler(function(payload) {
    console.log('Received background message ', payload);
    let data = JSON.parse(payload.data.notification);
    const notificationTitle = data.title;
    console.log(data.icon);
    const notificationOptions = {
      body: data.body,
      icon: data.icon
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});
