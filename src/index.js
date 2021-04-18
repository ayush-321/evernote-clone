import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";

import firebase from "firebase";
require("firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBdntUPR0tcngkczNfEsOa1Z1GRjwUrJBA",
  authDomain: "evernote-clone-da6b0.firebaseapp.com",
  projectId: "evernote-clone-da6b0",
  storageBucket: "evernote-clone-da6b0.appspot.com",
  messagingSenderId: "302087408136",
  appId: "1:302087408136:web:1f4d26d6ac9baa2a7f9fbd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
