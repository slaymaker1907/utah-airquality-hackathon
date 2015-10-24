var airQuality = {
	enteredTime:Date(),
	closeTime:function(){},
	magnitude:0,
	elementType:""
	
}
window.onload=function(){
		YUI().use('calendar', function (Y) {

		  // Create a new instance of Calendar, setting its width
		  // and height, allowing the dates from the previous
		  // and next month to be visible and setting the initial
		  // date to be November, 1982.
		  var calendar = new Y.Calendar({
		          contentBox: "#mycalendar",
		          height:'200px',
		          width:'400px',
		          showPrevMonth: true,
		          showNextMonth: true,
		          date: new Date(2013,1,1)}).render();
		  	
		});

		  // Get a reference to Y.DataType.Date
    var dtdate = Y.DataType.Date;

    // Listen to calendar's selectionChange event.
    calendar.on("selectionChange", function (ev) {
    	// Get the date from the list of selected
      // dates returned with the event (since only
      // single selection is enabled by default,
      // we expect there to be only one date)
      var newDate = ev.newSelection[0];

      // Format the date and output it to a DOM
      // element.
      Y.one("#selecteddate").setHTML(dtdate.format(newDate));
    });
}

function getElement(){
	var e = document.getElementById("elements");
	airQuality.elementType=e.options[e.selectedIndex].value;
	$('#elementName').html(airQuality.elementType);
}