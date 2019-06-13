
    // Initialize Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyCM8512rOPTlJ2dSOSPj9kIcjphxIoIWuA",
        authDomain: "fab4-86980.firebaseapp.com",
        databaseURL: "https://fab4-86980.firebaseio.com",
        projectId: "fab4-86980",
        storageBucket: "fab4-86980.appspot.com",
        messagingSenderId: "307656792603",
        appId: "1:307656792603:web:746a8b645737c965"
      };    

    firebase.initializeApp(firebaseConfig);

    // Create a variable to reference the database.
    var database = firebase.database();

    // Initial Values
    var name = "";
    var dest = "";
    var first = "";
    var freq = "";


    // Capture Button Click
    $("#click-button").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      name = $("#name-input").val().trim();
      dest = $("#dest-input").val().trim();
      first = $("#first-input").val().trim();
      freq = $("#freq-input").val().trim();

      console.log(name);
      console.log(dest);
      console.log(first);
      console.log(freq);

      // Code for handling the push
      database.ref().push({
        name: name,
        dest: dest,
        first: first,
        freq: freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    });


    // $(document).on("click", "")

    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

    //   // Console.loging the last user's data
    //   console.log(sv.name);
    //   console.log(sv.dest);
    //   console.log(sv.first);
    //   console.log(sv.freq);

      // Change the HTML to reflect
      $("#name-display").text(sv.name);
      $("#dest-display").text(sv.dest);
      $("#first-display").text(sv.first);
      $("#freq-display").text(sv.freq);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });