import  firebase  from "firebase/compat/app";
import "firebase/compat/database";
import {getFirestore} from 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBDrE_z4iTMCZVGfgNhR_1w6FC99qq7DTE",
    authDomain: "keep-e0718.firebaseapp.com",
    databaseURL: "https://keep-e0718-default-rtdb.firebaseio.com",
    projectId: "keep-e0718",
    storageBucket: "keep-e0718.appspot.com",
    messagingSenderId: "80386577430",
    appId: "1:80386577430:web:5a784d384a905fcc0f1137",
    measurementId: "G-BHPDC88EXF"
  };
const db=getFirestore(firebase.initializeApp(firebaseConfig));
export {db};