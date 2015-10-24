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
var allDataPoints2 = [dataPoint];

function update()
{
}

function initMap()
{
  // Create a map object and specify the DOM element for display.
  var map1 = new google.maps.Map(document.getElementById('map1'), {
    center: {lat: 39, lng: -112},
    scrollwheel: false,
    zoom: 6
  });
  
  var map2 = new google.maps.Map(document.getElementById('map2'), {
    center: {lat: 39, lng: -112},
    scrollwheel: false,
    zoom: 6
  });
  
  var button = document.getElementById("update");
  var MAX_SIZE = 60000;
  
  function getNormalizeFactor(dataPts)
  {
	  var maxSize = 0;
	  for(var i = 0; i < dataPts.length; i++)
	  {
		  var dataPt = dataPts[i];
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
	  map: map1,
	  center: {lat: 39, lng: -112},
	  radius: 60000
	});
	circles[i] = cityCircle;
  }
  circles2 = []; // An array of 100 circles to be used at will.
  for(var i = 0; i < maxNumCircles; i++)
  {
	  var cityCircle = new google.maps.Circle({
	  strokeColor: '#FF0000',
	  strokeOpacity: 0.8,
	  strokeWeight: 2,
	  fillColor: '#FF0000',
	  fillOpacity: 0.35,
	  map: map2,
	  center: {lat: 39, lng: -112},
	  radius: 60000
	});
	circles2[i] = cityCircle;
  }
  
  function updateMap()
  {
	  factor = getNormalizeFactor(allDataPoints);
	  factor2 = getNormalizeFactor(allDataPoints2);
	  clearCircles();
	  for(var i = 0; i < allDataPoints.length; i++)
	  {
		  options = getSpecifiedOptions(allDataPoints[i].magnitude * factor, allDataPoints[i].location);
		  circles[i].setOptions(options)
		  circles[i].setMap(map1);
	  }
	  for(var i = 0; i < allDataPoints2.length; i++)
	  {
		  options = getSpecifiedOptions(allDataPoints2[i].magnitude * factor, allDataPoints2[i].location);
		  circles2[i].setOptions(options)
		  circles2[i].setMap(map2);
	  }
  }
  
  function clearCircles()
  {
	  for(var i = 0; i < circles.length; i++)
	  {
		  circles[i].setMap(null);
	  }
	  for(var i = 0; i < circles2.length; i++)
	  {
		  circles2[i].setMap(null);
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