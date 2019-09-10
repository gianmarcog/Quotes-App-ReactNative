import firebase from 'firebase';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDeP5hKcChDhEnkdlZKDuLhKOEAtCX8-UA",
    authDomain: "quotes-86a63.firebaseapp.com",
    databaseURL: "https://quotes-86a63.firebaseio.com",
    projectId: "quotes-86a63",
    storageBucket: "quotes-86a63.appspot.com",
    messagingSenderId: "97906889407",
    appId: "1:97906889407:web:84b892ddd8ad6cf28d6c0a"
  };

  export default class Firebase {
      static db;

      static init() {
          firebase.initializeApp(config);
          Firebase.db = firebase.firestore();
      }
  }