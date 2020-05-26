const functions = require('firebase-functions');
const express = require('express');
const app = express();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
response.send("Proyexto 1 NRC: 7828");
});

app.get('/', function(req, res){
    res.send('El primer proyecto de Desarrollo Web Avanzado')
})

exports.app = functions.https.onRequest(app);