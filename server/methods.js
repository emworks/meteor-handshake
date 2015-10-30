Accounts.onCreateUser(function(options, user) {
  Meteor.call('setNewLocation', user._id);
  Meteor.call('addCard', user._id);
  return user;
});

Meteor.methods({
  addUser: function(doc) {
    return Accounts.createUser(
      { email: doc.emails[0].address, password: doc.services.password }
    );
  },
  setNewLocation: function(userId) {
    Places.insert({
      date: new Date(),
      user: userId
    });
  },
  updateLocation: function(location) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Places.update(
      { user: Meteor.userId() },
      {
        $set: {
          date: new Date(),
          loc: location
        }
      }
    );
  },
  addCard: function(userId) {
    Cards.insert({
      createdAt: new Date(),
      owner: userId
    });
  },
  // getCardById: function(cardId) {
  //   if (!Meteor.userId()) {
  //     throw new Meteor.Error('not-authorized');
  //   }
  //   return Cards.findOne({ _id: cardId });
  // },
  // getCardByOwner: function() {
  //   if (!Meteor.userId()) {
  //     throw new Meteor.Error('not-authorized');
  //   }
  //   return Cards.findOne({ owner: Meteor.userId() });
  // },
  updateCard: function(fields) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Cards.update(
      { owner: Meteor.userId() },
      {
        $set: {
          updatedAt: new Date(),
          username: fields.username,
          title: fields.title,
          summary: fields.summary,
          phone: fields.phone
        }
      }
    );
    return true;
  },
  sendPhone: function(targetId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Cards.update(
      { owner: Meteor.userId() },
      {
        $push: {
          shareWith: targetId
        }
      }
    );
    return true;
  }
});
