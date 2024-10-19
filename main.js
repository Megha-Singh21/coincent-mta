// Function to reset the timer at 4:00 pm every day
function resetTimer() {
  // Set the target date and time for the next day at 4:00 pm
  var today = new Date();
  var targetDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19, 59, 59, 59).getTime();
  

  // Get the current date and time
  var currentDate = new Date().getTime();

  // Calculate the time remaining until the next day at 4:00 pm
  var timeRemaining = targetDate - currentDate;

  // Update the timer display
  updateTimer(timeRemaining);
}

// Function to update the timer display after 4pm
function updateTimer(timeRemaining) {
  // Calculate days, hours, minutes, and seconds
  var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Get the current time
  var currentTime = new Date().getTime();

  // If the current time is between 10:45 pm and 4:00 pm, display "Slot Filled" without the timer
  if (currentTime >= new Date().setHours(22, 45, 0, 0) || currentTime < new Date().setHours(16, 0, 0, 0)) {
    document.getElementById("heading").innerHTML = "Slot Filled";
    document.getElementById("timer").innerHTML = "Reach out to sr. Executive (9566259128) only WhatsApp";
    return;
  }

  // If the current time is 9:30 pm, update the heading and set the countdown to 10:30 pm
  if (currentTime <= new Date().setHours(21, 59, 59, 59) && currentTime >= new Date().setHours(20, 0, 0, 0)) {
    document.getElementById("heading").innerHTML = "Time extended till 10 pm";
    // document.getElementById("timer").innerHTML = "Countdown: " + hours + "h " + minutes + "m " + seconds + "s";
    return;
  }

  // If the current time is 10:30 pm, update the heading and set the countdown to 10:40 pm
  if (currentTime <= new Date().setHours(22, 44, 59, 59) && currentTime >= new Date().setHours(22, 0, 0, 0)) {
    document.getElementById("heading").innerHTML = "Time extended till 10:45 pm";
    // document.getElementById("timer").innerHTML = "Countdown: " + minutes + "m " + seconds + "s";
    return;
  }

  // Display the timer in the HTML element with id="timer"
  document.getElementById("timer").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s";

  // If the countdown is finished, reset the timer for the next day at 4:00 pm
  if (timeRemaining < 0) {
    resetTimer();
  }
}


// Initial call to reset the timer
resetTimer();

// Update the timer every second
var timer = setInterval(function() {
  // Get the current time
  var currentTime = new Date().getTime();

  // Calculate the time remaining until the next day at 4:00 pm
  var timeRemaining = new Date().setHours(16, 0, 0, 0) - currentTime;

  // If the current time is past 4:00 pm, reset the timer for the next day at 4:00 pm
  if (timeRemaining < 0) {
    resetTimer();
  }

  // Update the timer display
  updateTimer(timeRemaining);
}, 1000); // Update every second  


// seats
window.onload = function() {
  var currentTime = new Date().getTime(); // Get the current time
  var slotCount = calculateSlotCount(currentTime); // Calculate the initial slot count based on the current time

  function calculateSlotCount(time) {
    var startTime = new Date(time).setHours(16, 0, 0, 0); // Set the start time to 4:00 pm
    var endTime = new Date(time).setHours(20, 0, 0, 0); // Set the end time to 9:00 pm
    var extendedEndTime = new Date(time).setHours(22, 0, 0, 0); // Set the extended end time to 10:00 pm
    var finalEndTime = new Date(time).setHours(22, 45, 0, 0); // Set the final end time to 10:45 pm
    var nextDayStartTime = new Date(time).setHours(16, 0, 0, 0); // Set the start time of the next day to 4:00 pm

    if (time >= startTime && time < endTime) {
      // Slot count between 4:00 pm and 9:00 pm
      var elapsedTime = Math.floor((time - startTime) / 1000); // Calculate elapsed time since the start time in seconds
      var count = 149 - Math.floor(elapsedTime / (4 * 25));
      return Math.max(1, count); // Ensure count doesn't go below 1
    } else if (time >= endTime && time < extendedEndTime) {
      // Slot count between 9:00 pm and 10:00 pm
      var elapsedTime = Math.floor((time - endTime) / 1000); // Calculate elapsed time since the start time in seconds
      var count = 12 - Math.floor(elapsedTime / (2 * 210));
      return Math.max(1, count); // Ensure count doesn't go below 1
    } else if (time >= extendedEndTime && time < finalEndTime) {
      // Slot count between 10:00 pm and 10:45 pm
      var elapsedTime = Math.floor((time - extendedEndTime) / 1000); // Calculate elapsed time since the start time in seconds
      var count = 8 - Math.floor(elapsedTime / (45 ));
      return Math.max(1, count); // Ensure count doesn't go below 1
    } else if (time >= finalEndTime && time < nextDayStartTime) {
      // No slots available between 10:45 pm and 4:00 pm the next day
      return -1;
    } else {
      // Slot count after 4:00 pm the next day
      var elapsedTime = Math.floor((time - nextDayStartTime) / 1000); // Calculate elapsed time since the start time in seconds
      var count = 149 - Math.floor(elapsedTime / (4 * 200));
      return Math.max(1, count); // Ensure count doesn't go below 1
    }
  }

  function updateSlotCount() {
    var currentTime = new Date().getTime(); // Get the current time
    slotCount = calculateSlotCount(currentTime); // Recalculate the slot count based on the current time

    if (slotCount >= 0) {
      // Display the current slot count
      document.getElementById("slotCount").innerHTML = slotCount;
    } else {
      // No slots available
      document.getElementById("slotCount").innerHTML = "No slots available";
    }
    
    var currentHour = new Date(currentTime).getHours(); // Get the current hour
    var currentMinute = new Date(currentTime).getMinutes(); // Get the current minute
    
    if ((currentHour >= 22 && currentMinute >= 45) || (currentHour >= 4 && currentHour < 16)) {
      // Hide the heading and slot count elements between 10:45 pm and 4:00 pm
      document.getElementById("heading1").style.display = "none";
      document.getElementById("slotCount").style.display = "none";
    } else {
      // Display the heading and slot count elements
      document.getElementById("heading1").style.display = "block";
      document.getElementById("slotCount").style.display = "block";
    }
  }

  setInterval(updateSlotCount, 1000); // Update the slot count and visibility every second
}