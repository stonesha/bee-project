import DeckGL, { GeoJsonLayer } from "deck.gl";

function updateRoute() {
    // Set the profile
    var profile = "driving";
    // Get the coordinates that were drawn on the map
    var data = draw.getAll();
    var lastFeature = data.features.length - 1;
    var coords = data.features[lastFeature].geometry.coordinates;
    // Format the coordinates
    var newCoords = coords.join(';')
    // Set the radius for each coordinate pair to 25 meters
    var radius = [];
    coords.forEach(element => {
      radius.push(25);
    });
    getMatch(newCoords, radius, profile);
  }
  
  // Make a Map Matching request
  function getMatch(coordinates, radius, profile) {
    // Separate the radiuses with semicolons
    var radiuses = radius.join(';')
    // Create the query
    var query = 'https://api.mapbox.com/matching/v5/mapbox/' + profile + '/' + 
    coordinates + '?geometries=geojson&radiuses=' + radiuses + 
    '&steps=true&access_token=' + mapboxgl.accessToken;
  
    $.ajax({
      method: 'GET',
      url: query
    }).done(function(data) {
      // Get the coordinates from the response
      var coords = data.matchings[0].geometry;
      console.log(coords);
      // Code from the next step will go here
    });
  }

  function addRoute(coords) {
    // If a route is already loaded, remove it
    if (map.getSource('route')) {
      map.removeLayer('route')
      map.removeSource('route')
    } else { // Add a new layer to the map
      map.addLayer({
        "id": "route",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {},
            "geometry": coords
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "#03AA46",
          "line-width": 8,
          "line-opacity": 0.8
        }
      });
    };
  }

  // Make a Map Matching request
function getMatch(coordinates, radius, profile) {
    // Separate the radiuses with semicolons
    var radiuses = radius.join(';')
    // Create the query
    var query = 'https://api.mapbox.com/matching/v5/mapbox/' + profile + '/' + coordinates + '?geometries=geojson&radiuses=' + radiuses + '&steps=true&access_token=' + mapboxgl.accessToken;
    console.log(query)
    $.ajax({
      method: 'GET',
      url: query
    }).done(function(data) {
      // Get the coordinates from the response
      var coords = data.matchings[0].geometry;
      // Draw the route on the map
      addRoute(coords);
    });
  }