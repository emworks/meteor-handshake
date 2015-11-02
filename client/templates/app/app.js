Session.setDefault('loc', [ 30.280998, 60.002135100000004 ]);

Meteor.subscribe('places', { location: Session.get('loc'), distance: 100 });

Template.app.rendered = function() {
  this.autorun(function() {
    if (!Meteor.user()) return;
    Session.set('updateLocation', Meteor.setInterval(function() {
      if (!navigator.geolocation && !navigator.geolocation.length) return;
      navigator.geolocation.getCurrentPosition(function(position) {
        var loc = [ position.coords.longitude, position.coords.latitude ];
        Meteor.call('updateLocation', loc);
        Session.set('loc', loc);
      });
    }, 5000));
  });
};
