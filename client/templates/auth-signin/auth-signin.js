AutoForm.hooks({
  signinForm: {
    onSubmit: function(doc) {
      var self = this;
      self.event.preventDefault();
      if (doc.emails[0].address && doc.services.password) {
        Meteor.loginWithPassword(
          doc.emails[0].address, doc.services.password,
          function(error) {
            if (error) {
              self.done(error);
            } else {
              self.done();
              Router.go('home');
            }
          }
        );
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
