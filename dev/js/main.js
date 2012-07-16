require({
  "paths": {
    "template": "../template"
  },
  'shim' : {
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
},['hbs!template/base'], function (tmpl) {
  console.log(tmpl());
  return {};
});
