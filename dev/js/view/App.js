define(['backbone', 'env', 'jquery', 'hbs!template/base'], function (Backbone, env, $, template) {
  return Backbone.View.extend({
    initialize : function (options) {
      this.template = template;
    },
    events : {
      'focus .placeholder-on' : 'inputfocus',
      'blur .placeholder-off' : 'inputblur',
      'change textarea' : 'inputchange'
    },
    inputchange : function (e) {
      var $target = $(e.currentTarget);
      var val = $target.val();

      if ($target.hasClass('placeholder-on')) {
        val = '';
      }
      console.log(val);
    },
    inputfocus : function (e) {
      var $target = $(e.currentTarget);

      // Manage the placeholder class for different styling
      $target.removeClass('placeholder-on').addClass('placeholder-off');

      // Save the placholder text
      this.model.set('inputplaceholder', $target.val());

      // Removing the text right away cause the caret to lose placement.
      setTimeout(function () {
        $target.val('');
      }, 0);
    },
    inputblur : function (e) {
      var $target = $(e.currentTarget);
      if ( !$.trim($target.val()) ) {
        $target.removeClass('placeholder-off').addClass('placeholder-on').val(this.model.get('inputplaceholder'));
      }
    },
    render : function () {
      var self = this;
      this.$el.html( this.template( this.model.toJSON() ) );

      this.$el.find('textarea').select(function () {
        console.log(arguments);
      });
    }
  });
});
