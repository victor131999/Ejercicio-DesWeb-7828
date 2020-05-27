const functions = require('firebase-functions');
const express = require('express');
const app = express();

//credenciales //
var firebaseConfig = {
  apiKey: "AIzaSyCpvO7wTr4VYm4U3U-cm3-bOxlTfIqVk3g",
  authDomain: "proyecto-1-nrc-7828.firebaseapp.com",
  databaseURL: "https://proyecto-1-nrc-7828.firebaseio.com",
  projectId: "proyecto-1-nrc-7828",
  storageBucket: "proyecto-1-nrc-7828.appspot.com",
  messagingSenderId: "150082542761",
  appId: "1:150082542761:web:5a26bc0e25ba54dc77ddb8"
};
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


  //exploramos funciones
exports.helloWorld = functions.https.onRequest((request, response) => {
response.send("Proyexto 1 NRC: 7828");
});

app.get('/', function(req, res){
    res.send('El primer proyecto de Desarrollo Web Avanzado')
})

exports.app = functions.https.onRequest(app);