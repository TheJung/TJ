import { Messages } from "imports/collections/messages";

Meteor.publish('messages.all',  function () {
  return Messages.find({});
});