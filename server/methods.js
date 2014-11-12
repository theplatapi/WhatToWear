//TODO: Move key into settings file
var apiKey = '9eba2a821655bbf395eb34efb4fa72cc';

Meteor.methods({
  getWeather: function(lat, lon) {
    var forecasts = [];
    var forecast = HTTP.get('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&APPID=' + apiKey).data;
    var length = forecast.list.length;

    for (var i = 1; i < length; i++) {
      var previous = forecast.list[i - 1];
      var current = forecast.list[i];
      var slope = (current.main.temp - previous.main.temp) / (current.dt - previous.dt);

      //index is up to that time, so dt[i-1] to dt[i]
      forecasts.push({
        date: current.dt,
        slope: slope,
        yIntercept: current.main.temp - slope * current.dt
      });
    }
    Weather.upsert({city: forecast.city.name}, {$set: {downloaded: new Date(), forecasts: forecasts}});
  }
});