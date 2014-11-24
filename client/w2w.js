var last = 0;
var currentRotation = 0;
var time = new ReactiveVar(moment());
var kelvinToFarenheit = function(kelvin) {
  return Math.round((kelvin - 273.15) * 9 / 5 + 32);
};
var setScrollHeight = function(self, radius) {
  //So we can at least scroll a bit.
  if (radius === 0) {
    radius = 20;
  }
  //circumference is 1 day
  var circumference = new Big(Math.PI).times(2).times(radius);
  var extraHeight = circumference.times(3);
  var newHeight = $(document).height() + Math.round(extraHeight);

  self.$('#scrollContent').css('height', newHeight + 'px');
};
Session.setDefault('city', null);
Session.setDefault('temperature', null);
Session.setDefault('rain', null);

//get city here
Tracker.autorun(function() {
  var position = Geolocation.currentLocation();

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
  var forecast;
  var unixTime = moment(time.get()).utc().unix();

  if (!Session.equals('city', null)) {
    forecast = Weather.findOne({city: Session.get('city')});

    //reject if the weather is 12 hours old
    if (!forecast || moment(forecast.downloaded).add(12, 'hours').isBefore(moment())) {
      Meteor.call('getWeather', Session.get('city'));
    }
    else {
      var line = forecast.forecasts.filter(function(element) {
        return element.date > unixTime;
      }).reduce(function(prev, curr) {
        if (prev.date < curr.date) {
          return prev;
        }
        return curr;
      });

      if (line) {
        //linearly interpolate the current temperature
        Session.set('temperature', kelvinToFarenheit(line.slope * unixTime + line.yIntercept));
        Session.set('rain', line.rain);
      }
    }
  }
});

Template.timeSelector.rendered = function() {
  var self = this;
  //set initial dial turn. Morning is 7am.
  var minutesOff = time.get().diff(moment().hour(7).minute(0), 'minutes');
  var radius = self.$('#timeSelector').width() / 2;

  currentRotation = new Big(minutesOff / 4);
  self.$('#timeSelector').css('transform', 'rotate(' + currentRotation + 'deg)');
  //set initial scroll height
  setScrollHeight(self, radius);

  //set up event listener
  self.$('#scrollBox').scroll(function() {
    var newRadius = self.$('#timeSelector').width() / 2;

    //dial radius changed from screen resize.
    if (newRadius !== radius) {
      setScrollHeight(self, newRadius);
      radius = newRadius;
    }

    //calculate degrees to move time dial
    var newScroll = self.$('#scrollBox').scrollTop();
    var scrollChange = newScroll - last;
    var radians = new Big(Math.atan2(1, radius)).times(scrollChange);
    var newRotation = radians.times(new Big(180).div(Math.PI));

    last = newScroll;
    currentRotation = currentRotation.plus(newRotation);
    self.$('#timeSelector').css('transform', 'rotate(' + currentRotation.toString() + 'deg)');
    //4 minutes per degree
    time.set(time.get().add(newRotation.times(4).toString(), 'minutes'));
  });
};

Template.profiles.helpers({
  getTime: function() {
    return time.get().calendar();
  },

  getWeather: function() {
    if (!Session.equals('temperature', null)) {
      return Session.get('temperature') + '\xBAF';
    }
  },

  getCity: function() {
    if (!Session.equals('city', null)) {
      return Session.get('city');
    }
  },

  getRain: function() {
    if (!Session.equals('rain', null)) {
      return Session.get('rain');
    }
  }
});

Template.profiles.events({
  'click .list-group-item': function() {
    console.log("hi!");
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

Template.main.helpers({
  getTemplate: function() {
    return Session.equals('temperature', null) ? 'loading' : 'profiles';
  }
});

