$(document).ready(function() {

  // Global vars
  var unit = 0; // default is farenheit
  function unitConvert(u) {
    if (u === 1) {
      return ['C', 'Metric', 'm/s']
    } else {
      return ['F', 'Imperial', 'mph']
    }
  };

  // Request function 1
  function displayLocation(latitude, longitude) {
    var request = new XMLHttpRequest();
    var method = 'GET';
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
    var async = true;
    request.open(method, url, async);
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        var data = JSON.parse(request.responseText);
        var address = data.results;
        var addy = address.filter(function(a) {
          return a.types.indexOf('locality') > -1;
        })[0]

        $('.city').html(addy.formatted_address);
      }
    };
    request.send();
  };

  // Weather
  function convertDirection(d) {
    if (d > 11.25 && d <= 33.75) return 'NNE'
    else if (d > 33.75 && d <= 56.25) return 'NE'
    else if (d > 56.25 && d <= 78.75) return 'ENE'
    else if (d > 78.75 && d <= 101.25) return 'E'
    else if (d > 101.25 && d <= 123.75) return 'ESE'
    else if (d > 123.75 && d <= 146.25) return 'SE'
    else if (d > 146.25 && d <= 168.75) return 'SSE'
    else if (d > 168.75 && d <= 191.25) return 'S'
    else if (d > 191.25 && d <= 213.75) return 'SSW'
    else if (d > 213.75 && d <= 236.25) return 'SW'
    else if (d > 236.25 && d <= 258.75) return 'WSW'
    else if (d > 258.75 && d <= 281.25) return 'W'
    else if (d > 281.25 && d <= 303.75) return 'WNW'
    else if (d > 303.75 && d <= 326.25) return 'NW'
    else if (d > 326.25 && d <= 348.75) return 'NNW'
    else return 'N';
  };

  function displayWeather(latitude, longitude) {
    var request = new XMLHttpRequest();
    var method = 'GET';
    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=' + unitConvert(unit)[1];
    var async = true;
    request.open(method, url, async);
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        var data = JSON.parse(request.responseText);
        var desc = data.weather[0].description;
        var temp = Math.round(data.main.temp * 10) / 10;
        var wind = [convertDirection(data.wind.deg),
          Math.round(data.wind.speed * 10) / 10,
          unitConvert(unit)[2]
        ].join(' ');
        var imgIcon = data.weather[0].icon;

        $('.desc').html(desc);
        $('.temp-val').html(temp);
        $('.unit').html(unitConvert(unit)[0]);
        $('.wind').html(wind);
        $("#icon").attr("src", "https://openweathermap.org/img/w/" + imgIcon + ".png");

      }
    };
    request.send();
  };

  // Request function 2
  var successCallback = function(position) {
    var x = position.coords.latitude;
    var y = position.coords.longitude;
    displayLocation(x, y);
    displayWeather(x, y);
  };

  // Main functional call
  navigator.geolocation.getCurrentPosition(successCallback);

  // Addtional jQuery magic
  $(".unit").hover(
    function() {
      $(this).addClass("unit-hover");
      $('.unit').html(unitConvert((unit + 1) % 2)[0]);
    },
    function() {
      $(this).removeClass("unit-hover");
      $('.unit').html(unitConvert(unit)[0]);
    }
  );

  $(".unit").click(function() {
    unit = (unit + 1) % 2
    navigator.geolocation.getCurrentPosition(successCallback);
  })

})