import Big from 'big.js';
import moment from 'moment';
import { Template } from 'meteor/templating'

var currentRotation = 0;
var last = 0;


//update time every minute on the dot
let interval = 60 * 1000;
let now = new Date();
let delay = interval - now % interval;

//TODO: Do we need outer?
Meteor.setTimeout(function () {
  Session.set('time', moment(Session.get('time')).add(1, 'minute').valueOf());

  Meteor.setInterval(function () {
    let time = Session.get('time');
    Session.set('time', moment(time).add(1, 'minute').valueOf());
  }, interval);
}, delay);


var setScrollHeight = function (self, radius) {
  //So we can at least scroll a bit.
  if (radius === 0) {
    radius = 20;
  }
  //circumference is 1 day
  var circumference = new Big(Math.PI).times(2).times(radius);
  var extraHeight = circumference.times(3);
  var newHeight = $(document).height() + Math.round(extraHeight);

  self.$('#scrollContent').css('height', newHeight + 'px');
};

Template.timeSelector.rendered = function () {
  var self = this;
  //set initial dial turn. Morning is 7am.
  let time = moment(Session.get('time'));
  console.log("time", time.calendar());
  var minutesOff = time.diff(moment().hour(7).minute(0), 'minutes');
  var radius = self.$('#timeSelector').width() / 2;

  currentRotation = new Big(minutesOff / 4);
  self.$('#timeSelector').css('transform', 'rotate(' + currentRotation + 'deg)');
  //set initial scroll height
  setScrollHeight(self, radius);

  //set up event listener
  self.$('#scrollBox').scroll(function () {
    var newRadius = self.$('#timeSelector').width() / 2;

    //dial radius changed from screen resize.
    if (newRadius !== radius) {
      setScrollHeight(self, newRadius);
      radius = newRadius;
    }

    //calculate degrees to move time dial
    var newScroll = self.$('#scrollBox').scrollTop();
    var scrollChange = newScroll - last;
    var radians = new Big(Math.atan2(1, radius)).times(scrollChange);
    var newRotation = radians.times(new Big(180).div(Math.PI));

    last = newScroll;
    currentRotation = currentRotation.plus(newRotation);
    self.$('#timeSelector').css('transform', 'rotate(' + currentRotation.toString() + 'deg)');
    //4 minutes per degree
    Session.set('time', moment(Session.get('time')).add(newRotation.times(4).toString(), 'minutes').valueOf());
  });
};