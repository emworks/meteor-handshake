Session.setDefault('card', '');

Meteor.subscribe('allCards');

Template.user.rendered = function() {
  var ctrl = Iron.controller();
  this.autorun(function() {
    if (!Meteor.user()) return;
    Session.set('card', Cards.findOne({ _id: ctrl.params._id }));
    // allCards.findOne({ _id: ctrl.params._id });
    // Meteor.call('getCardById', ctrl.params._id, function (error, data) {
    //   if (!data) return;
    //   Session.set('card', data);
    // });
    Session.set('shareWith', Cards.findOne({ owner: Meteor.userId() }).shareWith);
    // Meteor.call('getCardByOwner', function (error, data) {
    //   if (!data) return;
    //   Session.set('isPhoneSent', data.shareWith
    //     && !!~data.shareWith.indexOf(Session.get('card').owner));
    // });
  });
};

Template.user.helpers({
  card: function() {
    return Session.get('card');
  },
  isPhoneShared: function() {
    return Session.get('card') &&
      Session.get('card').shareWith &&
      !!~Session.get('card').shareWith.indexOf(Meteor.userId());
  },
  isPhoneSent: function() {
    return Session.get('shareWith') &&
      !!~Session.get('shareWith').indexOf(Session.get('card').owner);
  }
});

Template.user.events({
  'click #send-phone': function(event, template) {
    event.preventDefault();
    Meteor.call('sendPhone', Session.get('card').owner, function (error, data) {
      IonPopup.alert({
        template: data ? 'Phone is sent' : 'Something went wrong'
      });
    });
  }
});
