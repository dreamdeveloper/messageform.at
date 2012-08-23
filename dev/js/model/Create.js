define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    initialize : function (options) {
      var self = this;
      this.set({data:1});
      setTimeout(function () {
        self.trigger('dataReady');
      }, 0);
    }
  });
});
