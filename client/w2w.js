import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import $ from 'jquery';

import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { ReactiveVar } from 'meteor/reactive-var'
import { Tracker } from 'meteor/tracker'

import Weather from '/imports/collections/weather';

Meteor.subscribe('weather');

var profile = new ReactiveVar(business);
var kelvinToFahrenheit = function (kelvin) {
  return Math.round((kelvin - 273.15) * 9 / 5 + 32);
};
Session.setDefault('temperature', null);
Session.setDefault('rain', null);

//get forecast
Tracker.autorun(function () {
  var forecast;
  var unixTime = moment(Session.get('time')).unix();

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

Template.weatherInfo.helpers({
  getTime: function () {
    return moment(Session.get('time')).calendar();
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