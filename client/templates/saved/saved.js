Meteor.subscribe('allCards');

Template.saved.helpers({
  cards: function() {
    return Meteor.user() && Cards.find({ shareWith: Meteor.userId() });
  }
});
