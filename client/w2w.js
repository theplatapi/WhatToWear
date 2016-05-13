import moment from 'moment';
import $ from 'jquery';

import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'

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
    return Template.currentData().city.get();
  },

  getRain: function () {
    if (!Session.equals('rain', null)) {
      return Session.get('rain');
    }

    return 0;
  }
});

Template.settings.events({
  'click .gender': function (event) {
    $('.gender').removeClass('active btn-primary').addClass('btn-default');
    $(event.currentTarget).addClass('active btn-primary').removeClass('btn-default');
    console.log($(event.currentTarget).text());
  }
});