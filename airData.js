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
}

function getElement(){
	var e = document.getElementById("elements");
	airQuality.elementType=e.options[e.selectedIndex].value;
	$('#elementName').html(airQuality.elementType);
}