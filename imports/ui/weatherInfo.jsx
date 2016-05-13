import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import moment from 'moment';
import {Session} from 'meteor/session';
import getWeather from '/imports/util/getWeather';
import Weather from '/imports/collections/weather';
import _ from 'lodash';

const WeatherInfo = (props) => (
  <div>
    <h3>Weather</h3>
    {props.city}<br/>
    {moment(Session.get('time')).calendar()}<br/>
    {props.temperature}<br/>
    {props.rain} mm rain
  </div>
);

WeatherInfo.propTypes = {
  city: React.PropTypes.string,
  temperature: React.PropTypes.number,
  rain: React.PropTypes.number,
  listLoading: React.PropTypes.bool
};

export default WeatherInfoContainer = createContainer(params => {
  const handle = Meteor.subscribe('weather', params.city.get());
  const forecast = Weather.findOne({city: params.city.get()});
  const weather = getWeather(_.get(forecast, 'forecasts'));
  
  return {
    listLoading: handle.ready(),
    temperature: _.get(weather, 'temperature'),
    rain: _.get(weather, 'rain') || 0,
    city: params.city.get()
  };
}, WeatherInfo);