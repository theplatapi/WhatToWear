var last = 0;
var currentRotation = 0;
var position;
var time = new ReactiveVar(moment());
Session.setDefault('position', null);
Session.setDefault('city', null);
Session.setDefault('temperature', null);

//get city here
Tracker.autorun(function() {
  position = Geolocation.currentLocation();

  if (position) {
    HTTP.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ','
    + position.coords.longitude, function(err, data) {
      if (!err) {
        var city = data.data.results[0].address_components.filter(function(address_component) {
          return _.contains(address_component.types, 'locality')
        });

        if (city && city[0]) {
          Session.set('city', city[0].long_name);
        }
        else {
          console.log('no city!');
        }
      }
      else {
        console.log(err);
      }
    });
  }
});

//get forecast here
Tracker.autorun(function() {
  //query mongodb. If nothing, then ask server to update the db
  var forecast;
  var unixTime = moment(time.get()).utc().unix();

  if (!Session.equals('city', null)) {
    forecast = Weather.findOne({city: Session.get('city')});

    var line = forecast && forecast.forecasts.filter(function(element) {
          return element.date > unixTime;
        }).sort(function(a, b) {
          return a.date - b.date;
        });

    if (line && line[0]) {
      Session.set('temperature', kelvinToFarenheit(line[0].slope * unixTime + line[0].yIntercept));
    }
    else {
      console.log('hitting db');
      Meteor.call('getWeather', position.coords.latitude, position.coords.longitude,
          moment().utc().unix());
    }
  }
});

Template.timeSelector.rendered = function() {
  //TODO: go to end of second day
  var newHeight = parseInt($('#scrollContent').css('height')) + 360 * 2;

  $('#scrollContent').css('height', newHeight + 'px');
  //set initial wind. It is at 7am currently.
  //calculate minutes difference
  var minutesOff = time.get().diff(moment().hour(7).minute(0), 'minutes');

  currentRotation = minutesOff / 4;
  $('#timeSelector').css('transform', 'rotate(' + currentRotation + 'deg)');

  //set up event listener
  $('#scrollBox').scroll(function() {
    var newScroll = $('#scrollBox').scrollTop();
    var scrollChange = newScroll - last;

    last = newScroll;
    currentRotation += scrollChange;
    $('#timeSelector').css('transform', 'rotate(' + currentRotation + 'deg)');
    //4 minutes per degree
    time.set(time.get().add(scrollChange * 4, 'minutes'));
  });
};

Template.profiles.helpers({
  getTime: function() {
    return time.get().calendar();
  },

  getWeather: function() {
    if (!Session.equals('temperature', null)) {
      console.log('temp', Session.get('temperature'));
      return Session.get('temperature');
    }
  }
});

Template.avatar.helpers({
  getShirt: function() {
    //return shirt based on time and profile
    return "/clothes_top_pea_coat.png";
  },

  getPants: function() {
    //return pants based on time and profile
    return "/clothes_bottom_pants.png";
  }
});

var kelvinToFarenheit = function(kelvin) {
  return Math.round((kelvin - 273.15) * 9/5 + 32);
};
