function getElement(){
	var e = document.getElementById("elements");
	AirDataPoint.measType=e.options[e.selectedIndex].value;
	$('#elementName').html(AirDataPoint.measType);
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

function notifyMapChanged()
{
	document.getElementById("update").click();
}

var AirDataPoint = function(date, magnitude, measType, location)
{
	this.date = date;
	this.magnitude = magnitude;
	this.measType = measType;
	this.location = location;
}

var dataPoint = new AirDataPoint(new Date(2015, 10, 23), 100, "test", {lat:39, lng:-112});
var allDataPoints = [dataPoint, new AirDataPoint(new Date(2015, 10, 23), 50, "test", {lat:39, lng:-111}), new AirDataPoint(new Date(2015, 10, 23), 100, "test", {lat:39, lng:-110})];

function update()
{
}

var AirQualityMap = function()
{
	this.allDataPoints = [];
	//var updateButton = 
}

function initMap()
{
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39, lng: -112},
    scrollwheel: false,
    zoom: 6
  });
  
  var button = document.getElementById("update");
  var MAX_SIZE = 60000;
  
  function getNormalizeFactor()
  {
	  var maxSize = 0;
	  for(var i = 0; i < allDataPoints.length; i++)
	  {
		  var dataPt = allDataPoints[i];
		  if (dataPt.magnitude > maxSize)
			  maxSize = dataPt.magnitude;
	  }
	  return MAX_SIZE / maxSize;
  }
  
  var maxNumCircles = 100;
  circles = []; // An array of 100 circles to be used at will.
  for(var i = 0; i < maxNumCircles; i++)
  {
	  var cityCircle = new google.maps.Circle({
	  strokeColor: '#FF0000',
	  strokeOpacity: 0.8,
	  strokeWeight: 2,
	  fillColor: '#FF0000',
	  fillOpacity: 0.35,
	  map: map,
	  center: {lat: 39, lng: -112},
	  radius: 60000
	});
	circles[i] = cityCircle;
  }
  
  function updateMap()
  {
	  factor = getNormalizeFactor();
	  clearCircles();
	  var i = 0;
	  for(var i2 = 0; i2 < allDataPoints.length; i2++)
	  {
		  options = getSpecifiedOptions(allDataPoints[i2].magnitude * factor, allDataPoints[i2].location);
		  circles[i].setOptions(options)
		  circles[i].setMap(map);
		  i++;
	  }
  }
  
  function clearCircles()
  {
	  for(var i = 0; i < circles.length; i++)
	  {
		  circles[i].setMap(null);
	  }
  }
  
  function getSpecifiedOptions(radius, location)
  {
	  var result = {
		  strokeColor: '#FF0000',
		  strokeOpacity: 0.8,
		  strokeWeight: 2,
		  fillColor: '#FF0000',
		  fillOpacity: 0.35,
		  map: null,
		  center: location,
		  radius: radius
	  };
	  result.center = location;
	  return result;
  }
  
  google.maps.event.addDomListener(button, 'click', updateMap);
  notifyMapChanged();
}