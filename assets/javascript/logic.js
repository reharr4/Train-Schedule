// firebase
var firebaseConfig = {
    apiKey: "AIzaSyAHe6gFEGrkdvY3HfpVRG0myWfTT7AJWBQ",
    authDomain: "train-scheduler-9b837.firebaseapp.com",
    databaseURL: "https://train-scheduler-9b837.firebaseio.com",
    projectId: "train-scheduler-9b837",
    storageBucket: "train-scheduler-9b837.appspot.com",
    messagingSenderId: "729187557688",
    appId: "1:729187557688:web:108e2efbaab4eac4"
};
//   Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// add train button
$("#add-train").on("click", function () {
    // press enter or submit button
    event.preventDefault;

    // variables for form/user input
    var trainName = $("#new-train").val().trim();
    var destination = $("#new-destination").val().trim();
    var trainTime = $("#new-train-time").val().trim();
    var frequency = $("#new-frequency").val().trim();

    // temporary object for train data
    var newTrain = {
        name: trainName,
        dest: destination,
        time: trainTime,
        freq: frequency
    }

    // push data to firebase
    database.ref().push(newTrain);

    console.log(newTrain);
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);
    console.log(departure);

    // $("#trainTable").append("<td> " + name + "<td>");
    // $("#trainTable").append("<td> " + destination + "<td>");
    // $("#trainTable").append("<td> " + frequency + "<td>");
    // $("#trainTable").append("<td> " + time + "<td>");
    // $("#trainTable").append("<td> " + departure + "<td>");

    // clear input boxes
    $("#newTrainName").val("");
    $("#newDestinationName").val("");
    $("#newFrequencyTime").val("");
    $("#newFirstTime").val("");

    return false;
})

// firebase even for adding data to database and entering a new row in html
database.ref().on("child_added", function (childSnapshot) {

    // variable to store data
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().freq;
    })

// First Departure Time
var firstTime = "00:00";

// Current Time
var currentTime = moment();

// First Time (pushed back 1 year to make sure it comes before current time)
var converted = moment(trainTime, "HH:mm").subtract(1, "years");

// Difference between the times
var difference = moment().diff(moment(converted), "minutes");

// Time apart (remainder)
var tRemaining = difference % tFrequency;

// Minutes Until Train
var tMinutesTillTrain = tFrequency - tRemaining;

// Next train
nextTrain = moment().add(tRemaining, "minutes");

$("#train-table").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tRemaining + "</td></tr>");

;
