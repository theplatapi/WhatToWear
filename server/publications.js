import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import Weather from '/imports/collections/weather';

let updateWeather = (city) => {
  let forecasts = [];
  let query = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=' + Meteor.settings.owmKey;
  let forecast = HTTP.get(query).data;
  let length = forecast.list.length;

  for (var i = 1; i < length; i++) {
    let previous = forecast.list[i - 1];
    let current = forecast.list[i];
    let slope = (current.main.temp - previous.main.temp) / (current.dt - previous.dt);

    //index is up to that time, so dt[i-1] to dt[i]
    forecasts.push({
      date: current.dt,
      slope: slope,
      yIntercept: current.main.temp - slope * current.dt,
      rain: current.rain ? current.rain["3h"] : 0
    });
  }
  Weather.upsert({city: city}, {$set: {downloaded: new Date(), forecasts: forecasts}});
};

let purgeWeather = (city, time) => {
  //Remove weather data older than 12 hours
  Weather.remove({city: city, downloaded: {$lt: time}});
};

Meteor.publish('weather', function (city) {
  let twelveHoursAgo = moment().subtract(12, 'hours').toDate();
  let cached = Weather.findOne({city: city, downloaded: {$gte: twelveHoursAgo}});

  if (!cached) {
    this.ready();
    updateWeather(city);
    purgeWeather(city, twelveHoursAgo);
  }
  else {
    return Weather.find({city: city, downloaded: {$gte: twelveHoursAgo}});
  }
});