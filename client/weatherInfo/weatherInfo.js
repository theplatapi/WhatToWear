import moment from 'moment';
import {Session} from 'meteor/session';
import getWeather from '/imports/util/getWeather';
import Weather from '/imports/collections/weather';
import _ from 'lodash';

let temperature = new ReactiveVar(null);
let rain = new ReactiveVar(null);


Template.weatherInfo.onCreated(function () {
  let template = this;

  template.autorun(() => {
    let city = Template.currentData().city.get();
    template.subscribe('weather', city);
  });

  template.autorun(() => {
    let forecast = Weather.findOne({city: Template.currentData().city.get()});
    let weather = getWeather(_.get(forecast, 'forecasts'));
    temperature.set(_.get(weather, 'temperature'));
    rain.set(_.get(weather, 'rain'));
  });
});

Template.weatherInfo.helpers({
  getTime: function () {
    return moment(Session.get('time')).calendar();
  },

  getWeather: function () {
    if (_.isNumber(temperature.get())) {
      return temperature.get() + '\xBAF';
    }
  },

  getCity: function () {
    return Template.currentData().city.get();
  },

  getRain: function () {
    return rain.get() || 0;
  }
});