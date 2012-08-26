define(['backbone', 'collection/Messages'], function (Backbone, Messages) {
  return Backbone.Model.extend({
    initialize : function (options) {
      var self = this;

      this.on('dataReady', function () {
        self.isReady = true;
      }, this);

      // Instantiate message queue data dependency
      var messages = new Messages();
      messages.on('dataReady', function () {
        self.set('messages', messages);
        self.trigger('dataReady');
      });

      // Make a request for data
      messages.fetch();
    },

    toJSON : function () {
      var res = Backbone.Model.prototype.toJSON.apply(this, arguments);
      res.messages = this.get('messages').toJSON();
      return res;
    }
  });
});
