import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBLnha_cHiHuJGWla5B73vKgz1feTkgXbc",
  authDomain: "myrjsecg.firebaseapp.com",
  databaseURL: "https://myrjsecg.firebaseio.com",
  projectId: "myrjsecg",
  storageBucket: "",
  messagingSenderId: "967963389163"
};
firebase.initializeApp(config);
export default firebase;