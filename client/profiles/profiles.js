import {Template} from 'meteor/templating';
import {Session} from 'meteor/session'

Template.profiles.events({
  'click .profile': function (event, template) {
    event.preventDefault();

    Session.set('profile', $(event.currentTarget).text().trim().toLowerCase());

    //change highlight
    template.$('.profile').parent().removeClass('active');
    template.$(event.currentTarget).parent().addClass('active');
  }
});