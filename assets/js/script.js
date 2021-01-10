//$(document).ready(function() {
// set DateTime using luxon
var DateTime = luxon.DateTime;
var dt = DateTime.local();
// display current date without update in document
$("#currentDay").text(dt.toLocaleString(DateTime.DATE_HUGE));
//parse JSON to object
let storedSchedule = JSON.parse(localStorage.getItem("storedSchedule"));
//when pulled from localStorage, update array
if (storedSchedule !== null) {
scheduleArray = storedSchedule;
} else {
    scheduleArray = new Array(9);
    scheduleArray[5] = "Sample Text Area";
}


//console.log(scheduleArray)

//clear rows
$("plannerContainer").empty();

for (let hour = 9; hour <= 17; hour++) {
    let index = hour - 9;
    //construct rows
    $("#rowDiv").addClass("row plannerRow").attr("hour-index", hour);

    // time element
    let $mdTimeDiv = $("<div>");
    $mdTimeDiv.addClass("col-lg-2 justify-content-center");
  
    // create timeBox element (contains time)
    const $timeSpn = $("<span>");
    // can use this to get value
    $timeSpn.attr("class","timeSpan");
    
    // format hours for display
    let displayHour = 0;
    let ampm = "";
    if (hour > 12) { 
      displayHour = hour - 12;
      ampm = "p.m.";
    } else {
      displayHour = hour;
      ampm = "a.m.";
    }
    
    $timeSpn.text(displayHour + " " + ampm);
    //$timeSpn.text("${displayHour} ${ampm}");

    //place into time element
    $("#rowDiv").append($mdTimeDiv);
    $mdTimeDiv.append($timeSpn);

    //now the input bit of the row
    let $blockSpan = $("<input>");

    //add attributes using array/object
    $blockSpan.attr("id", "input-${index}");
    $blockSpan.attr({
        "hour-index": index,
        "type": "text",
        "class": "hourlyBlock",
    })

    $blockSpan.val(scheduleArray[index]);

    //place in col
    let $col9Div = $("<div>");
    $col9Div.addClass("col-lg-9 justify-content-center");

    $("#rowDiv").append($col9Div);
    $col9Div.append($blockSpan);
    //placed

    let $col1Save = $("<div>");
    $col1Save.addClass("col-lg-1 justify-content-center");

    //save button col
    let $sBtn = $("<i>");
    $sBtn.attr({
        "id": "input-${index}",
        "save-id": index,
        "class": "fas fa-save",
    })

    $("#rowDiv").append($col1Save);
    $col1Save.append($sBtn);
    //


}