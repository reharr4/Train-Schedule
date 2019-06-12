$(document).ready(function () {
    // add train button
    $("#addTrainButton").on("click", function() {
        // press enter or submit button
        event.preventDefault;

        // variables for form/user input
        var trainName = $("#newTrainName").val().trim();
        var destName = $("#newDestinationName").val().trim();
        var timeName = $("#newFirstTime").val().trim();
        var freqName = $("#newFrequencyTime").val().trim();

        console.log(trainName);
        console.log(destName);
        console.log(timeName);
        console.log(freqName);

        // object to hold form/user input data
        var newTrain = {
            name: trainName,
            destination: destName,
            firstTime: timeName,
            frequency: freqName,
        }

        $("#trainTable").append("<tr><td>" + newTrain + "<tr><td>");


        // clear input boxes
        $("#newTrainName").val("");
        $("#newDestinationName").val("");
        $("#newFirstTime").val("");
        $("#newFrequencyTime").val("");

    })

        
});