if (Meteor.isClient) {
  var last = 0;
  var currentRotation = 0;
  var time = new ReactiveVar(moment());

  Template.timeSelector.rendered = function() {
    //set initial wind. It is at 7am currently.
    //calculate minutes difference
    var minutesOff = time.get().diff(moment().hour(7).minute(0), 'minutes');

    currentRotation = minutesOff / 4;
    $('#timeSelector').css('transform', 'rotate(' + currentRotation + 'deg)');

    //set up event listener
    $('#scrollBox').scroll(function() {
      var newScroll = $('#scrollBox').scrollTop();
      var scrollChange = newScroll - last;

      last = newScroll;
      currentRotation += scrollChange;
      $('#timeSelector').css('transform', 'rotate(' + currentRotation + 'deg)');
      //4 minutes per degree
      time.set(time.get().add(scrollChange * 4, 'minutes'));
    });
  };

  Template.profiles.helpers({
    getTime: function() {
      return time.get().calendar();
    }
  });

  Template.avatar.helpers({
    getShirt: function() {
      //return shirt based on time and profile
      return "/clothes_top_pea_coat.png";
    },

    getPants: function() {
      //return pants based on time and profile
      return "/clothes_bottom_pants.png";
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}