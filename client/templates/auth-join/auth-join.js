AutoForm.hooks({
  joinForm: {
    onSubmit: function(doc) {
      var self = this;
      self.event.preventDefault();
      if (doc) {
        Meteor.call('addUser', doc, function() {
          self.done();
          Router.go('home');
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
