$(document).ready(function(){

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
$("#add-train-btn").on("click", function (event) {
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
    };

    // push data to firebase
    database.ref().push(newTrain);

    // console log everything
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.time);
    console.log(newTrain.freq);

    // alert user to new train addition
    alert("Train successfully added");
    

    // clear input boxes
    $("#new-train").val("");
    $("#new-destination").val("");
    $("#new-frequency").val("");
    $("#new-train-time").val("");
});

// firebase event for adding data to database and entering a new row in html
database.ref().on("child_added", function (childSnapshot, prevChild) {
    console.log(childSnapshot.val());

    // variable to store data
    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().dest;
    var tFrequency = childSnapshot.val().time;
    var tFirstTrain = childSnapshot.val().freq;

    var timeArr = tFirstTrain.split(":");
    var trainTime = moment()
        .hours(timeArr[0])
        .minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;

// If first train is later than the current time, set arrival to first train time
if (maxMoment === trainTime) {
    tArrival = trainTime.format("hh:mm A");
    tMinutes = trainTime.diff(moment(), "minutes");
} else {
    // 
    var timeDifference = moment().diff(trainTime, "minutes");
    var tRemainder = timeDifference % tFrequency;
    tMinutes = tFrequency - tRemainder;
    // calculate arrival time by adding tMinutes to current time
    tArrival = moment()
        .add(tMinutes, "m")
        .format("hh:mm A");
}
console.log("tMinutes:", tMinutes);
console.log("tArrival:", tArrival);

// add data from each train to the table
$("#train-table > tbody").append(
    $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(tDestination),
        $("<td>").text(tFrequency),
        $("<td>").text(tArrival),
        $("<td>").text(tMinutes)
    )
);
})
});
