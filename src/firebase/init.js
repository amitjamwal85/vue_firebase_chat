import firebase from "firebase/app";
import "firebase/messaging";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCr794C5fS5JsSSvNmbKgd-TuQR3aGFIW0",
  authDomain: "vue-chat-56ca7.firebaseapp.com",
  databaseURL: "https://vue-chat-56ca7.firebaseio.com",
  projectId: "vue-chat-56ca7",
  storageBucket: "vue-chat-56ca7.appspot.com",
  messagingSenderId: "802914483090",
  appId: "1:802914483090:web:b1530852302d0c8f255f4b",
  measurementId: "G-JXW02Y4X6G"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();
const firestore = firebase.firestore();

messaging.usePublicVapidKey(
  "BKMKv7z0t2oGgvEagK_65KPixUaAMC8igPa8VWk_OF0xmYg_QOgBqLwJTlWQvfKTClPm_xnXyXaZZI1kglGW_js"
);

export default {
  messaging,
  firestore
};
