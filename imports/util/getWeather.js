import moment from 'moment';
import {Session} from 'meteor/session'

let kelvinToFahrenheit = function (kelvin) {
  return Math.round((kelvin - 273.15) * 9 / 5 + 32);
};

export default getWeather = (forecast => {
  let unixTime = moment(Session.get('time')).unix();

  //Find the correct forecast element
  let line = _.chain(forecast)
    .sortBy('date')
    .find(elem => {
      //TODO: Return date where forecast[i-1].date <= unixTime <= forecast[i].date
      return elem.date > unixTime;
    })
    .value();

  if (line) {
    return {
      //linearly interpolate the current temperature
      temperature: kelvinToFahrenheit(line.slope * unixTime + line.yIntercept),
      rain: line.rain
    };
  }
});