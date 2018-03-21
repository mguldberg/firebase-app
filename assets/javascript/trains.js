$(document).ready(function () {

    /* global moment firebase */

    // Initialize Firebase
    // Make sure to match the configuration to the script version number in the HTML
    // (Ex. 3.0 != 3.7.0)         

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAZ6e2wE87AVoEI_P9cDXUio2ey3iDyw-A",
        authDomain: "fir-week4-homework.firebaseapp.com",
        databaseURL: "https://fir-week4-homework.firebaseio.com",
        projectId: "fir-week4-homework",
        storageBucket: "",
        messagingSenderId: "95169724424"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();

    // --------------------------------------------------------------
    // Link to Firebase Database for viewer tracking
    // --------------------------------------------------------------
    // Initial Values

    var trainName = "";
    var trainDestination = "";
    var firstTrainTime = "0";
    var trainFrequency = "30";

    // --------------------------------------------------------------
    // Add ourselves to presence list when online.
    // -------------------------------------------------------------- (CRITICAL - BLOCK) --------------------------- //
    // connectionsRef references a specific location in our database.
    // All of our connections will be stored in this directory.
    var database = firebase.database();

    var trainScheduleRef = database.ref("/dbTrainRecord");
    var newTrainRef = trainScheduleRef.push();

    // ----------------------------------------------------------------
    // At the page load and subsequent value changes, get a snapshot of the local data.
    // This function allows you to update your page in real-time when the values within the firebase node bidderData changes
    // ----------------------------------------------------------------
    database.ref().on("value", function (snapshot) {


        // console.log(childSnapshot.val())
        console.log(snapshot.val())

        var trainRecords = snapshot.val().dbTrainRecord;
        console.log(snapshot.val().dbTrainRecord);

        var loop = 0;
        var tableVar = $("#train-table-body");
        tableVar.empty();

        for (key in trainRecords) {
            loop++;
            console.log(loop);
            console.log("in for loop");
            console.log(key);
            console.log(trainRecords[key]);
            console.log(trainRecords[key].trainname);
            console.log(trainRecords[key].traindestination);
            console.log(trainRecords[key].trainfrequency);
            console.log(trainRecords[key].firsttraintime);

            var timeRightNow = moment();
            var trainTimeconv = moment(trainRecords[key].firsttraintime);
            
            console.log(moment(trainTimeconv).format("HH:mm"));

            var currentTime = moment();

            // // Difference between the times
            var diffTime = currentTime.diff(moment(trainTimeconv), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);

            var remainder = Math.abs(diffTime) % frequency;
            console.log(remainder);

            var timeNextTrain = currentTime.add(minNextTrain, "minutes")
            console.log("ARRIVAL TIME: " + moment(timeNextTrain).format("hh:mm"));

            var minNextTrain = frequency - remainder;
            console.log("MINUTES TILL TRAIN: " + minNextTrain);

            //----------------------------------------------------------------------
            // trainname  /  traindestination  /  trainfrequency  / firsttraintime /
            //----------------------------------------------------------------------
            //
         
            var tableRow = $("<tr>");
            tableRow.append('<td>' + trainRecords[key].trainname + '</td>')
            tableRow.append("<td>" + trainRecords[key].traindestination + "</td>")
            tableRow.append("<td>" + trainRecords[key].trainfrequency + "</td>")

            tableRow.append("<td>" + trainRecords[key].firsttraintime + "</td>")
            tableVar.append(tableRow);

        }
        // console.log(childSnapshot.val().employeeName)

        // If any errors are experienced, log them to console.
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    // --------------------------------------------------------------
    // Whenever a user clicks the submit-bid button
    $("#add-train").on("click", function () {

        // Prevent default behavior
        event.preventDefault();

        // Get the input values
        trainName = $("#choo-choo-name").val().trim();
        trainDestination = $("#where-are-we-going").val().trim();
        firstTrainTime = $("#start-input").val().trim()
        trainFrequency = $("#frequency-input").val().trim();

        var newTrainRef = trainScheduleRef.push();

        // Log to console the Bidder and Price (Even if not the highest)
        newTrainRef.set({
            trainname: trainName,
            traindestination: trainDestination,
            firsttraintime: firstTrainTime,
            trainfrequency: trainFrequency
        })

    });

})