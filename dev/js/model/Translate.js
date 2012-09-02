define(['backbone', 'underscore', '$', 'collection/Messages'], function (Backbone, _, $, Messages) {
  return Backbone.Model.extend({
    options : {
      fromLang : 'en',
      toLang : 'es'
    },

    initialize : function (options) {
      var self = this;

      this.set(_.extend(this.options, options));

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
      var res = this.__super__.toJSON.apply(this, arguments);
      res.messages = this.get('messages').toJSON();
      return res;
    }
  });
});
