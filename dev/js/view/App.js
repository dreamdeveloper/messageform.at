define(['backbone', 'env', 'jquery', 'util/linecount', 'hbs!template/base'], function (Backbone, env, $, linecount, template) {
  return Backbone.View.extend({
    initialize : function (options) {
      this.template = template;
    },
    options : {
      linecount : {
        charsMode : 'from_ta',
        fontAttrs : ['font-family', 'font-size', 'text-decoration', 'font-style', 'font-weight']
      }
    },
    events : {
      'focus .placeholder-on' : 'inputfocus',
      'blur .placeholder-off' : 'inputblur',
      'keyup textarea' : 'inputchange'
    },
    inputchange : function (e) {
      var $target = $(e.currentTarget);
      var val = $target.val();

      // Don't count the placeholder as a value
      if ($target.hasClass('placeholder-on')) {
        val = '';
      }

      // Constantly update the model
      this.model.set('message', val);

      // Determin the line count of the text area.
      console.log(linecount($target, this.options.linecount));
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
      var val = $.trim($target.val());
      if (!val) {
        $target.removeClass('placeholder-off').addClass('placeholder-on').val(this.model.get('inputplaceholder'));
      }
      this.model.set('message', val);
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
