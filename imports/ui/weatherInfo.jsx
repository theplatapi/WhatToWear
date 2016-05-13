import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import {Session} from 'meteor/session';
import getWeather from '/imports/util/getWeather';
import Weather from '/imports/collections/weather';
import _ from 'lodash';

export default WeatherInfo = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    this.userProfileSub = Meteor.subscribe('weather', this.props.city.get());
    let forecast = Weather.findOne({city: this.props.city.get()});
    let weather = getWeather(_.get(forecast, 'forecasts'));

    return {
      temperature: _.get(weather, 'temperature'),
      rain: _.get(weather, 'rain')
    }
  },

  render() {
    return (
      <div>
        <h3>Weather</h3>
        {this.props.city.get()}<br/>
        {moment(Session.get('time')).calendar()}<br/>
        {this.data.temperature}<br/>
        {this.data.rain || 0} mm rain
      </div>
    );
  }
});