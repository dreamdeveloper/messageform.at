require({
  shim : {
    'underscore': {
      exports : function () {
        return this._;
      }
    },
    'backbone' : {
      deps : ['underscore', 'jquery'],
      exports : function (_, $) {
        this._.noConflict();
        return this.Backbone.noConflict();
      }
    }
  }
},['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
  console.log($, _, Backbone);
  return {};
});
