// set DateTime using luxon
var DateTime = luxon.DateTime;
var now = DateTime.local();
// display current date without update in document
$("#currentDay").text(now.toLocaleString(DateTime.DATE_HUGE));
//parse JSON to object
let storedSchedule = JSON.parse(localStorage.getItem("storedSchedule"));
//when pulled from localStorage, update array
if (storedSchedule !== null) {
scheduleArray = storedSchedule;
} else {
    scheduleArray = new Array(9);
    scheduleArray[5] = "Sample Text Area";
}

