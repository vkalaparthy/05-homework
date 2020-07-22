$(document).ready(function() {
  // listen for save button clicks

  var eventsArray = [];

  $(".saveBtn").on("click", function() {
    // get nearby values
    var value = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");

    console.log('value:', value);
    console.log('time:', time);

    var eventInfoObj = {
      eValue: value,
      eTime: time
    }
    eventsArray.push(eventInfoObj);
    localStorage.setItem("calEventsArray", JSON.stringify(eventsArray));
    // save the value in localStorage as time
    
  });

  function hourUpdater() {
    // get current number of hours
    var currentHour = moment().hours();
    console.log('current hour:', currentHour);

    getStoredEvents();
    console.log(eventsArray);

    // loop over time blocks
    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      console.log("block hour:", blockHour);
      //console.log ("this is "+this);

      // check if we've moved past this time

      if (currentHour > blockHour) {
        addPast(blockHour);
      } else if (currentHour === blockHour) {
        addPresent(currentHour);
      } else {
        addFuture(blockHour)
      }
  
      // if the current hour is greater than the block hour
      // then add class "past"

      // if they are equal
      // then remove class "past" and add class "present"

      // else
      // remove class "past", remove class "present", add class "future"
      
    });
  }

  hourUpdater();

  function addPast(bt) {
    //grab all previous times and chnage the color to gray
    //console.log("this : "+this); test
    var getId = "#hour-"+bt;
    console.log("Id is "+getId);
    for (var i = 0; i<eventsArray.length; i++) {
      var timePeriod = eventsArray[i].eTime;
      if(getId.includes(timePeriod)) {
        $(getId).find("textarea").text(eventsArray[i].eValue);
        console.log("Adding event to calender "+eventsArray[i].eValue);
      }
    }
    $(getId).find("textarea").css("background", "lightgray");
  };

  function addPresent(ct) {
    var getId = "#hour-"+ct;
    console.log("Id is "+getId);
    //var grabTextarea = ".col-md-"+ct;
    //$("textarea").text("I am here");

    for (var i = 0; i<eventsArray.length; i++) {
      var timePeriod = eventsArray[i].eTime;
      if(getId.includes(timePeriod)) {
        $(getId).find("textarea").text(eventsArray[i].eValue);
        console.log("Adding event to calender "+eventsArray[i].eValue);
      }
    }
    $(getId).find("textarea").css("background", "red");
  };

  function addFuture(bt) {
    var getId = "#hour-"+bt;
    console.log("Id is "+getId);
    //var grabTextarea = ".col-md-"+bt;
    // *****
    for (var i = 0; i<eventsArray.length; i++) {
      var timePeriod = eventsArray[i].eTime;
      if(getId.includes(timePeriod)) {
        $(getId).find("textarea").text(eventsArray[i].eValue);
        console.log("Adding event to calender "+eventsArray[i].eValue);
      }
    }
    // ***** 
    //$(getId).find("textarea").text("Future");
    $(getId).find("textarea").css("background", "#4BF521");
  };

  // set up interval to check if current time needs to be updated
  // which means execute hourUpdater function every 15 seconds

  // load any saved data from localStorage
  function getStoredEvents() {
    var storedEvents = JSON.parse(localStorage.getItem("calEventsArray"));
    if(storedEvents !== null) {
        eventsArray = storedEvents;
    }
  };

  setInterval (function() {
    hourUpdater();
    console.log("In setInterval");
  }, 15000);

  // display current day on page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
});
