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
      exports : function () {
        // Handle getting rid of underscore here
        // because it needs to be global for Backbone
        this._.noConflict();
        return this.Backbone.noConflict();
      }
    },
    'diff' : {
      exports : function () {
        console.log('asdfasdf');
        console.log(this.JsDiff);
        return this.JsDiff;
      }
    }
  }
},['env', 'backbone', 'view/App', 'model/App', 'jquery', 'util/caret'], function (env, Backbone, AppView, AppModel, $) {

  var AppRouter = Backbone.Router.extend({
    initialize : function () {},

    routes: {
      '' : 'home',
      'create' : 'create',
      'translate' : 'translate',
      '*path' : 'fourohfour'
    },

    home : function () {
      alert('homepage is gone for now');
    },

    fourohfour : function (path) {
      alert('page not found: ' + path);
    },

    create : function () {
      // Initialize the model
      var model = new AppModel();

      // Listen for the data
      model.bind('dataReady', function () {
        // Make sure the dom is ready
        $(function () {

          // Create a new view
          var view = new AppView({
            model : model,
            el : '#app-container'
          });

          // Save these two core models and views
          // on the environment object
          env.set({
            appModel : model,
            appView : view
          });

          // Render the view
          view.render();
        });
      });
    }
  });

  // Kick off the app router
  env.set('router', new AppRouter());

  // Start everything
  Backbone.history.start();
});
