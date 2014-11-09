if (Meteor.isClient) {
  var last = 0;
  var currentRotation = 0;

  Template.timeSelector.rendered = function() {
    //set up event listener
    $('#scrollBox').scroll(function() {
      var newScroll = $('#scrollBox').scrollTop();
      var scrollChange = newScroll - last;

      last = newScroll;
      currentRotation += scrollChange;
      $('#timeSelector').css('transform', 'rotate(' + currentRotation + 'deg)');
      //set time of day
    });

    //TODO: Set to time of day currently
  };

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