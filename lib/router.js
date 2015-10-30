var destroySession = function() {
  if (Object.keys(Session.keys).length) {
    Meteor.clearInterval(Session.get('updateLocation'));
    Object.keys(Session.keys).forEach(function(key){
      Session.set(key, undefined);
    });
    Session.keys = {};
  }
};

Router.configure({
  layoutTemplate: 'app'
});

Router.map(function() {
  this.route('signin', {
    onBeforeAction: function() {
      Meteor.logout();
      destroySession();
      this.next();
    }
  });
  this.route('join');
  this.route('home', {
    path: '/',
    onBeforeAction: function() {
      destroySession();
      this.next();
    },
    action: function() {
      Router.go('profile', Meteor.users.findOne({_id:Meteor.userId()}));
    }
  });
  this.route('profile');
  this.route('users');
  this.route('saved');
  this.route('user', {
    path: '/users/:_id'
  });
});

Router.onBeforeAction(function() {
  if (!Meteor.user() && !Meteor.loggingIn()) {
    Router.go('signin');
  } else {
    this.next();
  }
}, {except: ['signin', 'join']});
