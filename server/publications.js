import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import Weather from '/imports/collections/weather';

Meteor.publish('weather', function () {
  return Weather.find({downloaded: {$gte: moment().subtract(12, 'hours').toDate()}});
});