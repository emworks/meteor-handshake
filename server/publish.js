Meteor.startup(function () {

  Meteor.publish("allCards", function () {
    return Cards.find({});
  });

  Places._ensureIndex({"loc": "2dsphere"});

  Meteor.publish("places", function (options) {
    return Places.find(
      { loc: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: options.location
            },
            $maxDistance: options.distance
          }
        }
      },
      { user: 1 }
    );
  });

});
