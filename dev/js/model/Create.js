define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    initialize : function (options) {
      var self = this;
      this.set({data:1});

      this.on('dataReady', function () {
        self.isReady = true;
      }, this);

      setTimeout(function () {
        self.trigger('dataReady');
      }, 0);
    }
  });
});
