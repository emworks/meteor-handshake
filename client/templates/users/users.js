Session.setDefault('geoUsers', [ Meteor.userId() ]);

Meteor.subscribe('allCards');

Template.users.helpers({
  cards: function() {
    return Meteor.user() && Cards.find({
      $and: [
        { owner: { $ne: Meteor.userId() } },
        { owner: { $in: Session.get('geoUsers') } }
      ]
    });
  }
});

Template.users.rendered = function() {
  this.autorun(function() {
    var geoUsers = Places.find({}).fetch();
    Session.set('geoUsers', _.pluck(geoUsers, 'user'));
  });
};
