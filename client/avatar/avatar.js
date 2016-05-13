import {Template} from 'meteor/templating'
import {Session} from 'meteor/session'
import _ from 'lodash';
import profiles from '/imports/profiles/profiles';
import Weather from '/imports/collections/weather';
import getTemperature from '/imports/util/getTemperature';

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
    temperature.set(getTemperature(_.get(forecast, 'forecasts')));
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
  }
});