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
  function updateMap()
  {
	  // Do stuff to update the map.
  }
  google.maps.event.addDomListener(button, 'click', updateMap);
    
  cityCircle = new google.maps.Circle({
	  strokeColor: '#FF0000',
	  strokeOpacity: 0.8,
	  strokeWeight: 2,
	  fillColor: '#FF0000',
	  fillOpacity: 0.35,
	  map: map,
	  center: {lat: 39, lng: -112},
	  radius: 20000
	});
}

function notifyMapChanged()
{
	document.getElementById("update").click();
}