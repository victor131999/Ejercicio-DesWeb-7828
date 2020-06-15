const functions = require('firebase-functions');
const admin = require('firebase-admin'); //Todo el SDK de Firebase => Acceso a Realtime Database
const express = require('express');
const app = express();

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://proyecto-1-nrc-7828.firebaseio.com"
});

const database = admin.database();

///========================= Variables globales ===================///
const dbPeople = "persons"; //Referencia al nodo en donde se van a guardar las personas

const dbskills="skills";


///========================= Métodos internos ===================///
function createPerson(person){
  database.ref(dbPeople).push(person);  
}

function retrievePerson(id){
  return database.ref(dbPeople).child(id).once('value');
}

function updatePerson(id, person){
  database.ref(dbPeople).child(id).set(person);
}

function deletePerson(id){
  database.ref(dbPeople).child(id).remove();
}

function listPersons(){
  return database.ref(dbPeople).once('value');
}

//creacion de skills//
function createSkills(id,skill){
  database.ref(dbPeople).child(id).child(dbskills).push(skill);
}

function retrieveSkills(id, ids){
  return database.ref(dbPeople).child(id).child(dbskills).child(ids).once('value');
}

function updateSkills(id, ids, skill){
  database.ref(dbPeople).child(id).child(dbskills).child(ids).set(skill);
}

function deleteSkills(id, ids){
  database.ref(dbPeople).child(id).child(dbskills).child(ids).remove();
}

function listSkills(id){
  return database.ref(dbPeople).child(id).child(dbskills).once('value');
}


///========================= Funciones URLs ===================///
app.post('/api/persons', function (req, res) {
  let varName = req.body['name'];
  let varAge = req.body['age'];
  var person = {
    name : varName,
    age : varAge  };
  createPerson(person);
  return res.status(201).json({ message: "Success person was added." });
});

app.get('/api/persons/:id', function(req, res){
  let varId = req.params.id;
  retrievePerson(varId).then(result => {
      return res.status(200).json(result); 
    }
  ).catch(err => console.log(err));
});

app.put('/api/persons/:id', function (req, res) {
  let varId = req.params.id;
  let varName = req.body['name'];
  let varAge = req.body['age'];
  var person = {
    name : varName,
    age : varAge  };
  updatePerson(varId, person);
  return res.status(200).json({ message: "Success person was updated." });
});

app.delete('/api/persons/:id',function(req, res){
  let varId = req.params.id;
  deletePerson(varId);
  return res.status(200).json({ message: "Success person was deleted." });
});

app.get('/api/persons', function(req, res){
  listPersons().then(result => {
      return res.status(200).json(result); 
    }
  ).catch(err => console.log(err));
});

app.get('/api/person', function(req, res){
  let varId = req.query.id;
  retrievePerson(varId).then(result => {
      return res.status(200).json(result); 
   }
  ).catch(err => console.log(err));
});

app.get('/api/', function (req, res) {
  res.send('Bienvenid@s a Cloud Functions de Desarrollo Web Avanzado NRC 7828')
})

//APP DE LAS SKILLS//
app.post('/api/persons/:id/skills', function (req, res) {
  var skill = {
    name : req.body['name'],
    hours : req.body['hours'],
    date : req.body['date'],
    endorsed : req.body['endorsed']
   };
  createSkills(req.params.id,skill);
  return res.status(201).json({ message: "Success skill was added to person." });
});

app.get('/api/persons/:id/skills/:ids', function(req, res){
  let varIds = req.params.ids;
  let varId = req.params.id;
  retrieveSkills(varId, varIds).then(result => {
      return res.status(200).json(result); 
    }
  ).catch(err => console.log(err));
});

app.put('/api/persons/:id/skills/:ids', function (req, res) {
  let varIds = req.params.ids;
  let varId = req.params.id;
  var skill = {
    name : req.body['name'],
    hours : req.body['hours'],
    date : req.body['date'],
    endorsed : req.body['endorsed']  };
  updateSkills(varId, varIds, skill);
  return res.status(200).json({ message: "Success skill was updated." });
});


app.delete('/api/persons/:id/skills/:ids',function(req, res){
  let varIds = req.params.ids;
  let varId = req.params.id;
  deleteSkills(varId, varIds);
  return res.status(200).json({ message: "Success skills was deleted." });
});

app.get('/api/persons/:id/skills', function(req, res){
  listSkills(req.params.id).then(result => {
      return res.status(200).json(result); 
    }
  ).catch(err => console.log(err));
});


exports.app = functions.https.onRequest(app);