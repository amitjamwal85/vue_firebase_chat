importScripts('https://www.gstatic.com/firebasejs/5.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.6.0/firebase-messaging.js');


firebase.initializeApp({
    'messagingSenderId': '802914483090'
});


const messaging = firebase.messaging();


messaging.setBackgroundMessageHandler(function(payload) {
    console.log('Received background message ', payload);
    let data = JSON.parse(payload.data.notification);
    // messages.push(data);
    const notificationTitle = data.title;
    const notificationOptions = {
      body: data.body,
      icon: 'img/icons/favicon-32x32.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});
