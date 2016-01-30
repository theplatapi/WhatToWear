var last = 0;
var currentRotation = 0;
var time = new ReactiveVar(moment());
var profile = new ReactiveVar(business);
var kelvinToFahrenheit = function (kelvin) {
  return Math.round((kelvin - 273.15) * 9 / 5 + 32);
};
var setScrollHeight = function (self, radius) {
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

//update time every minute on the dot
var interval = 60 * 1000, now = new Date, delay = interval - now % interval;

Meteor.setTimeout(function () {
  time.set(time.get().add(1, 'minute'));
  Meteor.setInterval(function () {
    time.set(time.get().add(1, 'minute'));
  }, interval);
}, delay);

//get city
Tracker.autorun(function () {
  var position = Geolocation.currentLocation();

  if (position) {
    HTTP.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ','
      + position.coords.longitude, function (err, data) {
      if (!err) {
        var city = data.data.results[0].address_components.filter(function (address_component) {
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

//get forecast
Tracker.autorun(function () {
  var forecast;
  var unixTime = moment(time.get()).utc().unix();

  if (!Session.equals('city', null)) {
    forecast = Weather.findOne({city: Session.get('city')});

    if (!forecast) {
      Meteor.call('getWeather', Session.get('city'));
    }
    else {
      var line = forecast.forecasts.filter(function (element) {
        return element.date > unixTime;
      }).reduce(function (prev, curr) {
        if (prev.date < curr.date) {
          return prev;
        }
        return curr;
      });

      if (line) {
        //linearly interpolate the current temperature
        Session.set('temperature', kelvinToFahrenheit(line.slope * unixTime + line.yIntercept));
        Session.set('rain', line.rain);
      }
    }
  }
});

Template.timeSelector.rendered = function () {
  var self = this;
  //set initial dial turn. Morning is 7am.
  var minutesOff = time.get().diff(moment().hour(7).minute(0), 'minutes');
  var radius = self.$('#timeSelector').width() / 2;

  currentRotation = new Big(minutesOff / 4);
  self.$('#timeSelector').css('transform', 'rotate(' + currentRotation + 'deg)');
  //set initial scroll height
  setScrollHeight(self, radius);

  //set up event listener
  self.$('#scrollBox').scroll(function () {
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

Template.weatherInfo.helpers({
  getTime: function () {
    return time.get().calendar();
  },

  getWeather: function () {
    if (!Session.equals('temperature', null)) {
      return Session.get('temperature') + '\xBAF';
    }
  },

  getCity: function () {
    if (!Session.equals('city', null)) {
      return Session.get('city');
    }
  },

  getRain: function () {
    if (!Session.equals('rain', null)) {
      return Session.get('rain');
    }

    return 0;
  }
});

Template.avatar.helpers({
  getShirt: function () {
    return profile.get().getClothes(Session.get('temperature')).top;
  },

  getPants: function () {
    return profile.get().getClothes(Session.get('temperature')).bottom;
  }
});

Template.main.helpers({
  getTemplate: function () {
    return Session.equals('temperature', null) ? 'loading' : 'avatar';
  }
});

Template.profiles.events({
  'click .profile': function (event) {
    event.preventDefault();

    //use string to access global variable name
    profile.set(window[$(event.currentTarget).text().trim().toLowerCase()]);

    //change highlight
    $('.profile').parent().removeClass('active');
    $(event.currentTarget).parent().addClass('active');
  }
});

Template.settings.events({
  'click .gender': function (event) {
    $('.gender').removeClass('active btn-primary').addClass('btn-default');
    $(event.currentTarget).addClass('active btn-primary').removeClass('btn-default');
    console.log($(event.currentTarget).text());
  }
});