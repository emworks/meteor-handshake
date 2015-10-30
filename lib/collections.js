Schema = {};

/**
 * Users
 */

Schema.User = new SimpleSchema({
  emails: {
    type: [Object],
    blackbox: true
  },
  "emails.$.address": {
    type: String,
    label: "Email",
    regEx: SimpleSchema.RegEx.Email
  },
  services: {
    type: Object,
    blackbox: true
  },
  "services.password": {
    type: String,
    label: "Password",
    min: 4,
  }
});

Meteor.users.attachSchema(Schema.User);

/**
 * Places
 */

Places = new Mongo.Collection('places');

/**
 * Cards
 */

Cards = new Mongo.Collection('cards');

Schema.Card = new SimpleSchema({
  createdAt: {
    type: Date,
    optional: true
  },
  owner: {
    type: String,
    optional: true
  },
  username: {
    type: String,
    label: "Username",
    optional: true
  },
  title: {
    type: String,
    label: "Title",
    optional: true,
    max: 100
  },
  summary: {
    type: String,
    label: "Brief summary",
    optional: true,
    max: 160
  },
  phone: {
    type: String,
    label: "Phone",
    optional: true,
    min: 10
  },
  "shareWith.$": {
    type: String,
    optional: true
  }
});

Cards.attachSchema(Schema.Card);
