Session.setDefault('card', '');

Meteor.subscribe('allCards');

Template.profile.rendered = function() {
  var ctrl = Iron.controller();
  this.autorun(function() {
    if (!Meteor.user()) return false;
    Session.set('card', Cards.findOne({ owner: Meteor.userId() }));
    // Meteor.call('getCardByOwner', function (error, data) {
    //   if (!data) return false;
    //   Session.set('card', data);
    // });
  });
};

Template.profile.helpers({
  card: function() {
    return Session.get('card');
  }
});

AutoForm.hooks({
  updateCardForm: {
    onSubmit: function(doc) {
      var self = this;
      self.event.preventDefault();
      if (doc) {
        Meteor.call('updateCard', doc, function (error, data) {
          IonPopup.alert({
            template: data ? 'Successfully updated' : 'Something went wrong'
          });
        });
      } else {
        self.done();
      }
      return false;
    },
    onError: function (type, error) {
      IonPopup.alert({
        template: error
      });
    }
  }
});
