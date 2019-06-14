
    // Initialize Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyAT_NuXm6TXZRMfhyLJarllqjo8HcynYPc",
        authDomain: "june-project-67f39.firebaseapp.com",
        databaseURL: "https://june-project-67f39.firebaseio.com",
        projectId: "june-project-67f39",
        storageBucket: "june-project-67f39.appspot.com",
        messagingSenderId: "468248133464",
        appId: "1:468248133464:web:0e0b7cd2aabd9f52"
      };
     
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Create a variable to reference the database.
    var database = firebase.database();

    // // Initial Values
    // var name = "";
    // var dest = "";
    // var first = "";
    // var freq = "";


    // Capture Button Click
    $("#click-button").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      var tname = $("#name-input").val().trim();
      var tdest = $("#dest-input").val().trim();
      var tfirst = $("#first-input").val().trim();
      var tfreq = $("#freq-input").val().trim();



      // Code for handling the push
      var newTrain = {
        name: tname,
        dest: tdest,
        first: tfirst,
        freq: tfreq,
      };

      database.ref().push(newTrain);


      console.log(newTrain.name);
      console.log(newTrain.tdest);
      console.log(newTrain.tfirst);
      console.log(newTrain.tfreq);


      $("#name-input").val("");
      $("#dest-input").val("");
      $("#first-input").val("");
      $("#freq-input").val("");

    });


    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function(childSnapshot) {
      // storing the snapshot.val() in a variable for convenience
      var tname = childSnapshot.val().name;
      var tdest = childSnapshot.val().dest;
      var tfirst = childSnapshot.val().first;
      var tfreq = childSnapshot.val().freq;


      console.log(tname);
      console.log(tdest);
      console.log(tfirst);
      console.log(tfreq);


      var firstTime = "05:00";


      var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
      console.log(firstTimeConverted);

      
      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % tfreq;
      console.log(tRemainder);

      // Minute Until Train
      var taway = tfreq - tRemainder;
      console.log("MINUTES TILL TRAIN: " + taway);
  
      // Next Train
      var nextTrain = moment().add(taway, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
    

      // Change the HTML to reflect
      var newRow = $("<tr>").append(
        $("<td>").text(tname),
        $("<td>").text(tdest),
        $("<td>").text(tfreq),
        $("<td>").text(moment(nextTrain).format("HH:mm")),
        $("<td>").text(taway),
      );

      $("#trainTable > tbody").append(newRow);  


    });