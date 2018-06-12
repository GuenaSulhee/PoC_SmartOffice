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


readData("-LDkuOOeP_Wn127NR137");
