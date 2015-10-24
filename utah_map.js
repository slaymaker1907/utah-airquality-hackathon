var AirDataPoint = function(date, magnitude, measType, location)
{
	this.date = date;
	this.magnitude = magnitude;
	this.measType = measType;
	this.location = location;
}

var dataPoint = new AirDataPoint(new Date(2015, 10, 23), 100, "test", {lat:39, lng:-112});
var allDataPoints = [dataPoint];

function update()
{
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
	  for(dataPt in allDataPoints)
		  if (dataPt.magnitude > maxSize)
			  maxSize = dataPt.magnitude;
	  return MAX_SIZE * maxSize;
  }
  
  function updateMap()
  {
	  factor = getNormalizeFactor();
	  clearCircles();
	  var i = 0;
	  for(pt in allDataPoints)
	  {
		  options = getSpecifiedOptions(pt.magnitude * factor, pt.location);
		  circles[i].setOptions(options)
		  circles[i].setMap(map);
	  }
  }
  
  function clearCircles()
  {
	  for(circle in circles)
	  {
		  circle.setMap(null);
	  }
  }
  
  function getSpecifiedOptions(radius, location)
  {
	  return {
		  strokeColor: '#FF0000',
		  strokeOpacity: 0.8,
		  strokeWeight: 2,
		  fillColor: '#FF0000',
		  fillOpacity: 0.35,
		  map: null,
		  center: location,
		  radius: radius
	  };
  }
  
  var circles = []; // An array of 100 circles to be used at will.
  for(i = 0; i < 100; i++)
  {
	  cityCircle = new google.maps.Circle({
	  strokeColor: '#FF0000',
	  strokeOpacity: 0.8,
	  strokeWeight: 2,
	  fillColor: '#FF0000',
	  fillOpacity: 0.35,
	  map: null,
	  center: {lat: 39, lng: -112},
	  radius: 60000
	});
	circles.push(cityCircle);
  }
  
  google.maps.event.addDomListener(button, 'click', updateMap);
  updateMap();
}

function notifyMapChanged()
{
	document.getElementById("update").click();
}