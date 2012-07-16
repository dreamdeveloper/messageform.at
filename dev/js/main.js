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
},['env', 'backbone', 'view/App', 'model/App'], function (env, Backbone, AppView, AppModel) {

  var router;

  var AppRouter = Backbone.Router.extend({
    initialize : function () {},

    routes: {
      '' : 'home'
    },

    home : function () {
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
            appView : view,
            appRouter : router
          });

          // Render the view
          view.render();
        });
      });
    }
  });

  // Kick off the app router
  router = new AppRouter();

  // Start everything
  Backbone.history.start();
});
