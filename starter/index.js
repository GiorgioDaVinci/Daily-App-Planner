// The document.ready function enables the html file to load first before the js file
$(document).ready(function () {
    // prints the current day at the top of the page
  var currentDate = dayjs();
  $("#currentDay").text(currentDate.format("dddd, MMMM D YYYY"));

  // Loads events from local storage
  function loadEvents() {
    $(".description").each(function () {
      var hour = $(this).data("hour");
      var event = localStorage.getItem("event_" + hour);
      if (event) {
        $(this).val(event);
      }
    });
  }

  // Saves events to local storage
  function saveEvent(hour, event) {
    localStorage.setItem("event_" + hour, event);
  }

  // Updates time blocks based on current time
  function updateTimeBlocks() {
    var currentHour = currentDate.hour();

    $(".description").each(function () {
      var hour = $(this).data("hour");

      if (hour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (hour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Load events and update time blocks on page load
  loadEvents();
  updateTimeBlocks();

  // Save button click event
  $(".saveBtn").on("click", function () {
    var hour = $(this).data("hour");
    var event = $(this).siblings(".description").val();

    saveEvent(hour, event);
  });
});
