import moment from 'moment';
import {Session} from 'meteor/session';
import {Template} from 'meteor/templating';
import {HTTP} from 'meteor/http';
import {ReactiveVar} from 'meteor/reactive-var'
import _ from 'lodash';

import './main.html';
import ClothingCardContainer from '/imports/ui/ClothingCard.jsx'

Session.set('time', moment().valueOf());
let city = new ReactiveVar(null);

let setCityName = position => {
  let [lat, lon] = [position.coords.latitude, position.coords.longitude];

  HTTP.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon, (err, data) => {
    let city_name = _.chain(data)
      .get('data.results[0].address_components')
      .find(address_component => {
        return _.includes(address_component.types, 'locality');
      })
      .get('long_name')
      .value();

    if (city_name) {
      city.set(city_name)
    }
    else {
      console.log('No city', err);
    }
  });
};

Template.main.onCreated(function () {
  let template = this;

  template.autorun(function () {
    let position = Geolocation.currentLocation();

    if (position) {
      setCityName(position);
    }
  });
});

Template.main.helpers({
  getCityReactive: () => {
    return city;
  },

  ClothingCardContainer() {
    return ClothingCardContainer;
  }
});