
// set DateTime using luxon
var DateTime = luxon.DateTime;
var dt = DateTime.local();
// display current date without update in document
$(document).ready(function () {
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

    //clear rows
    $("plannerContainer").empty();

    for (let hr = 9; hr <= 17; hr++) {
        let index = hr - 9;
        //construct rows
        $("#rowDiv").addClass("row plannerRow").attr("hr-index", hr);

        // time element
        let $lgTimeDiv = $("<div>");
        $lgTimeDiv.addClass("col-lg-1 hr");

        // create timeBox element (contains time)
        const $timeSpn = $("<span>");
        // can use this to get value
        $timeSpn.attr("class", "timeSpan");

        // format hours for display
        let displayHour = 0;
        let ampm = "";
        if (hr > 12) {
            displayHour = hr - 12;
            ampm = "p.m.";
        } else {
            displayHour = hr;
            ampm = "a.m.";
        }

        $timeSpn.text(displayHour + " " + ampm);
        //$timeSpn.text("${displayHour} ${ampm}");

        //place into time element
        $("#rowDiv").append($lgTimeDiv);
        $lgTimeDiv.append($timeSpn);

        //now the input bit of the row
        let $blockSpan = $("<input>");

        //add attributes using array/object
        $blockSpan.attr("id", "input-${index}");
        $blockSpan.attr({
            "hr-index": index,
            "type": "text",
            "class": "time-block, form-control",
        })

        $blockSpan.val(scheduleArray[index]);

        //place in col
        let $col10Div = $("<div>");
        $col10Div.addClass("col-lg-10");

        $("#rowDiv").append($col10Div);
        $col10Div.append($blockSpan);
        //placed

        let $col1Save = $("<div>");
        $col1Save.addClass("col-lg-1 saveBtn");

        //save button col
        let $sBtn = $("<i>");
        $sBtn.attr({
            "id": "saveid-${index}",
            "save-id": index,
            "class": "fas fa-save",
        })

        $("#rowDiv").append($col1Save);
        $col1Save.append($sBtn);
        //
        //update color
        function updateColor($col10Div, hr) {
            // does not seem to work, fix later
            if (hr < dt.hour) {
                $col10Div.attr("class", "col-lg-10 past");
            } else if (hr > dt.hour) {
                $col10Div.attr("class", "col-lg-10 future");
            } else {
                $col10Div.attr("class", "col-lg-10 present");
            }
        }
        //save
        //onclick
        $(document).on("click", "i", function (event) {
            event.preventDefault();
            let $index = $(this).attr("save-id");
            let inputId = `#input-${$index}`;
            let $value = $(inputId).val();
            scheduleArray[$index] = $value;
            localStorage.setItem("storedSchedule", JSON.stringify(scheduleArray));
        })
    }
})