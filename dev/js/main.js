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
        var JsDiff = this.JsDiff;
        this.JsDiff = undefined;
        return JsDiff;
      }
    }
  }
},[
'env', 'backbone',
'view/Create', 'model/Create',
'view/Translate', 'model/Translate',
'jquery', 'util/caret'
], function (env, Backbone, CreateView, CreateModel, TranslateView, TranslateModel, $) {
  env.set('locale', 'en_US');

  var AppRouter = Backbone.Router.extend({
    initialize : function () {},

    routes: {
      '' : 'home',
      'create' : 'create',
      'translate' : 'translate',
      '*path' : 'fourohfour'
    },

    home : function () {
      $('#app-container').html('home');
    },

    translate : function () {
      var model = env.get('translateModel') || new TranslateModel();

      var whenReady = function () {
        $(function () {
          // Insantiate view
          var view = env.get('translateView') || new TranslateView({
            model : model,
            el : '#app-container'
          });

          // Set the global state
          env.set({
            translateModel : model,
            translateView : view
          });

          // Render view
          view.render();
        });
      };

      // Either reinject or inject for the first time
      if (model.isReady) {
        whenReady();
      }
      else {
        model.bind('dataReady', whenReady);
      }
    },

    fourohfour : function (path) {
      $('#app-container').text('page `' + path + '` not found.');
    },

    create : function () {
      // Initialize the model
      var model = env.get('createModel') || new CreateModel();

      // Listen for the data
      var whenReady = function () {
        // Make sure the dom is ready
        $(function () {

          // Create a new view
          var view = env.get('createView') || new CreateView({
            model : model,
            el : '#app-container'
          });

          // Save these two core models and views
          // on the environment object
          env.set({
            createModel : model,
            createView : view
          });

          // Render the view
          view.render();
        });
      };

      // Either reinject or inject for the first time
      if (model.isReady) {
        whenReady();
      }
      else {
        model.bind('dataReady', whenReady);
      }
    }
  });

  // Make the nav fire routes
  $(function () {
    // Grab links in the nav
    $('.nav').find('li a').each(function () {
      var href = this.getAttribute('href');

      // If they start with a hash
      if (href && href.length && href.substr(0,1) === '#') {
        $(this).click(function () {
          var $this = $(this);
          $this.closest('ul').find('.active').removeClass('active');
          $this.closest('li').addClass('active');
          // Fire a nav event on click
          env.get('router').navigate(href.substr(2), {trigger:true});
          // Ignore everything else
          return false;
        });
      }
    });
  });

  // Kick off the app router
  env.set('router', new AppRouter());

  // Start everything
  Backbone.history.start();
});
