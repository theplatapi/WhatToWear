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
    });

    //TODO: Set to time of day currently
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}