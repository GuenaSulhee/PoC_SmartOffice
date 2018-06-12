'use strict';


// [START imports]
var admin = require("firebase-admin");
// [END imports]
 
// [START initialize]
// Initialize the app with a service account, granting admin privileges
var serviceAccount = require("./key.json");
 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "//test-gb1234.firebaseio.com/"
});
// [END initialize]
 
 // Get a database reference to the TODO list database
var db = admin.database();
var ref = db.ref("/");

// [START API 1]
function addData(data) {
 
  // Add a new todo item
  var itemsRef = ref.child("DataStax");
  var newItemRef = itemsRef.push();
  newItemRef.set({
    "Data": data,
    "Created Time": new Date().toString()
  });

    var itemId = newItemRef.key;
  console.log("ItemId" + itemId + " is created.");  
  return itemId;
}


// [START API 2]
function readData(todoId) {
 
  var itemRef = ref.child("DataStax/" + todoId);
  itemRef.on("value", function(snapshot) {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("Cannot read a TODO item with TODO ID %s that does not exist.", todoId);
      return null;
    }
  }, function (errorObject) {
    console.log("readToDoItem failed: " + errorObject.code);
  });
 
}

const serialport = require('serialport');
const readline = require('readline');
const sp_readline = serialport.parsers.Readline;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'select port> '
});

var idx = 0;
var ports = [];

console.log('COM port list:');
serialport.list(function (err, p) {
  p.forEach(function(p) {
    ports.push(p.comName);
    console.log(' [' + idx + '] ' + p.comName);
    idx++;
  });

  rl.prompt();
 
  rl.on('line', function(line) {
    //console.log(line);
    //console.log(ports);
    if(line<idx) {
      console.log('Opening ' + ports[Number(line)]);
     
      const port = new serialport(ports[Number(line)], {
        baudRate: 9600
        });
      const parser = new sp_readline();
      port.pipe(parser); 

      parser.on('data', function(data){
        console.log(data);
        addData(data);
      });
       
      port.on('error', function(e) {
        console.error(e.message);
        process.exit(0);
      }); 
       
      port.on('open', function() {
        console.log('Serial Port Opened');
      });

      port.on('close', function(err) {
        console.log('Serial Port Closed: ' + err);
        process.exit(0);
      });

      // readToDoItem("LDkuOOeP_Wn127NR137");
 
    } else {
      console.error('ERROR: Wrong port number');
      process.exit(0);
    }
  });
  
  rl.on('close', function() {
  console.log('Bye!');
  process.exit(0);
});
 
});