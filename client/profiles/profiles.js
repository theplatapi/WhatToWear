import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import $ from 'jquery';
import WeatherInfo from '/imports/ui/WeatherInfo';

import './profiles.html';

Template.profiles.events({
  'click .profile': function (event, template) {
    event.preventDefault();

    Session.set('profile', $(event.currentTarget).text().trim().toLowerCase());

    //change highlight
    template.$('.profile').parent().removeClass('active');
    $(event.currentTarget).parent().addClass('active');
  }
});

Template.profiles.helpers({
  WeatherInfo() {
    return WeatherInfo;
  },

  getCityReactive() {
    return Template.currentData().city;
  }
});