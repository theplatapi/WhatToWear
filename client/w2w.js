import $ from 'jquery';

import {Template} from 'meteor/templating'

Template.settings.events({
  'click .gender': function (event) {
    $('.gender').removeClass('active btn-primary').addClass('btn-default');
    $(event.currentTarget).addClass('active btn-primary').removeClass('btn-default');
  }
});