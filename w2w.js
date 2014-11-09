if (Meteor.isClient) {
  //.scroll( handler )
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

//Set the timer wind to the time of day. Don't allow significant scrollback. Just wind the wheel with resistance.\

//                 night
//morning                             evening
//               afternoon