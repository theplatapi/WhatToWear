import Big from 'big.js';
import moment from 'moment';
import {Template} from 'meteor/templating'

let currentRotation = 0;
let last = 0;

//update time every minute on the dot
let interval = 60 * 1000;

Meteor.setInterval(() => {
  let time = Session.get('time');
  Session.set('time', moment(time).add(1, 'minute').valueOf());
}, interval);


let setScrollHeight = (template, radius) => {
  //So we can at least scroll a bit.
  if (radius === 0) {
    radius = 20;
  }
  //circumference is 1 day
  let circumference = new Big(Math.PI).times(2).times(radius);
  let extraHeight = circumference.times(3);
  let newHeight = $(document).height() + Math.round(extraHeight);

  template.$('#scrollContent').css('height', newHeight + 'px');
};

Template.timeSelector.rendered = () => {
  let template = this;
  //set initial dial turn. Morning is 7am.
  let time = moment(Session.get('time'));
  let minutesOff = time.diff(moment().hour(7).minute(0), 'minutes');
  let radius = template.$('#timeSelector').width() / 2;

  currentRotation = new Big(minutesOff / 4);
  template.$('#timeSelector').css('transform', 'rotate(' + currentRotation + 'deg)');
  //set initial scroll height
  setScrollHeight(template, radius);

  //set up event listener
  template.$('#scrollBox').scroll(() => {
    let newRadius = template.$('#timeSelector').width() / 2;

    //dial radius changed from screen resize.
    if (newRadius !== radius) {
      setScrollHeight(template, newRadius);
      radius = newRadius;
    }

    //calculate degrees to move time dial
    let newScroll = template.$('#scrollBox').scrollTop();
    let scrollChange = newScroll - last;
    let radians = new Big(Math.atan2(1, radius)).times(scrollChange);
    let newRotation = radians.times(new Big(180).div(Math.PI));

    last = newScroll;
    currentRotation = currentRotation.plus(newRotation);
    template.$('#timeSelector').css('transform', 'rotate(' + currentRotation.toString() + 'deg)');
    //4 minutes per degree
    Session.set('time', moment(Session.get('time')).add(newRotation.times(4).toString(), 'minutes').valueOf());
  });
};