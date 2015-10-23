function initMap()
{
  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39, lng: -112},
    scrollwheel: false,
    zoom: 6
  });
}
