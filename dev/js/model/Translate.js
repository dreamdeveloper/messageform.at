define(['backbone', 'underscore', 'jquery', 'collection/Messages', 'messageformat'], function (Backbone, _, $, Messages, MessageFormat) {
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

      function handleMessages () {
        messages.each(function (msg) {
          // Set or override the variable combinations
          msg.set('varCombinations', msg.significantVariableCombos(self.get('toLang')));
        });

        // Save the messages along with their combos
        self.set('messages', messages);

        // Once we get combinations in, the data is ready
        self.trigger('dataReady');
      }

      // When we get new messages, handle them
      messages.on('dataReady', handleMessages);

      // Also do it again if we switch langs
      this.on("change:toLang", handleMessages);

      // Make a request for data
      messages.fetch();
    },

    toJSON : function () {
      var res = Backbone.Model.prototype.toJSON.apply(this, arguments);
      res.messages = this.get('messages').toJSON();
      res.locales = _.keys(MessageFormat.locale);
      return res;
    }
  });
});
