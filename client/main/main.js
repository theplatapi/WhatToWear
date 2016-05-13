import moment from 'moment';
import { Session } from 'meteor/session'
import { Template } from 'meteor/templating'

Session.set('time', moment().valueOf());

Template.main.helpers({
  getTemplate: function () {
    return Session.equals('temperature', null) ? 'loading' : 'avatar';
  }
});