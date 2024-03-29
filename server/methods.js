Meteor.methods({
  getWeather: function(city) {
    //Get download within last 12 hours
    var twelveHoursAgo = moment().subtract(12, 'hours').toDate();
    var cached = Weather.findOne({city: city, downloaded: {$gte: twelveHoursAgo}});

    if (!cached) {
      var forecasts = [];
      var forecast = HTTP.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID='
      + Meteor.settings.owmKey).data;
      var length = forecast.list.length;

      for (var i = 1; i < length; i++) {
        var previous = forecast.list[i - 1];
        var current = forecast.list[i];
        var slope = (current.main.temp - previous.main.temp) / (current.dt - previous.dt);

        //index is up to that time, so dt[i-1] to dt[i]
        forecasts.push({
          date: current.dt,
          slope: slope,
          yIntercept: current.main.temp - slope * current.dt,
          rain: current.rain ? current.rain["3h"] : 0
        });
      }
      Weather.upsert({city: city}, {$set: {downloaded: new Date(), forecasts: forecasts}});

      //Remove weather data older than 12 hours
      this.unblock();
      Weather.remove({downloaded: {$lt: twelveHoursAgo}});
    }
  }
});