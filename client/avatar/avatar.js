import {Template} from 'meteor/templating'
import {Session} from 'meteor/session'
import _ from 'lodash';
import profiles from '/imports/profiles/profiles';
import Weather from '/imports/collections/weather';
import getWeather from '/imports/util/getWeather';

Session.setDefault('profile', 'business');
let temperature = new ReactiveVar(null);

Template.avatar.onCreated(function () {
  let template = this;

  template.autorun(() => {
    let city = Template.currentData().city.get();
    template.subscribe('weather', city);
  });

  template.autorun(() => {
    let forecast = Weather.findOne({city: Template.currentData().city.get()});
    let weather = getWeather(_.get(forecast, 'forecasts'));
    temperature.set(_.get(weather, 'temperature'));
  });
});

Template.avatar.helpers({
  getShirt: function () {
    let profile = profiles[Session.get('profile')];
    return profile.getClothes(temperature.get()).top;
  },

  getPants: function () {
    let profile = profiles[Session.get('profile')];
    return profile.getClothes(temperature.get()).bottom;
  },

  hasTemperature: function () {
    return _.isNumber(temperature.get());
  }
});