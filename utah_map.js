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
  
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
    
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

function CenterControl(controlDiv, map) {
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Update';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    cityCircle.setMap(null)
  });
}