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
var ref = db.ref("/DataStax");


// [START API 2]
function readData() {
 
  //var itemRef = ref.child("DataStax");
 // ref.orderByChild("Data").on("child_added", function(snapshot) {
  ref.orderByChild("Data").limitToLast(1).on("child_added", function(snapshot) {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("Cannot read a TODO item with TODO ID %s that does not exist.");
      return null;
    }
  }, function (errorObject) {
    console.log("readToDoItem failed: " + errorObject.code);
  });
 
}


//readData("-LDkuOOeP_Wn127NR137");

readData();



//var itemRef = ref.orderByChild("Data").limitToLast(1);