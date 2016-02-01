Meteor.publish('weather', function () {
  return Weather.find({downloaded: {$gte: moment().subtract(12, 'hours').toDate()}});
});