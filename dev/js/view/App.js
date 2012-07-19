define([
  'backbone',
  'env',
  'jquery',
  'util/rangy',
  'hbs!template/base',
  'util/contentEditableChange'
], function (Backbone, env, $, rangy, template) {
  return Backbone.View.extend({
    initialize : function (options) {
      this.template = template;
      rangy.init();

      // Handle highlights of text
      this.on('highlight', this.highlight, this);
    },
    options : {},
    events : {
      'focus #mf-input' : 'inputfocus',
      'blur #mf-input' : 'inputblur',
      'keyup #mf-input' : 'inputchange',
      'mouseup #mf-input' : 'highlight'
    },
    inputchange : function (e) {
      var $target = $(e.currentTarget);
      var val = $target.text();

      // Don't count the placeholder as a value
      if ($target.hasClass('placeholder-on')) {
        val = '';
      }
      this.highlight();

      // Constantly update the model
      this.model.set('message', val);
    },
    inputfocus : function (e) {
      var $target = $(e.currentTarget);

      if ($target.hasClass('placeholder-on')) {
        // Manage the placeholder class for different styling
        $target.removeClass('placeholder-on').addClass('placeholder-off');
        // Save the placholder text
        this.model.set('inputplaceholder', $target.text());

        // Removing the text right away cause the caret to lose placement.
        setTimeout(function () {
          $target.text('');
        }, 0);
      }

      // Pull in some extra space
      this.$mfarea.css('padding-bottom', this.$mfarea.css('line-height'));
    },
    inputblur : function (e) {
      var $target = $(e.currentTarget);
      var val = $.trim($target.text());
      if (!val) {
        $target.removeClass('placeholder-off').addClass('placeholder-on').text(this.model.get('inputplaceholder'));
      }

      // Pull back the extra space a touch
      this.$mfarea.css('padding-bottom', this.$mfarea.css('padding-top'));
      this.model.set('message', val);
    },
    highlight : function () {
      console.log(rangy.getSelection().getRangeAt(0).toString());
    },
    render : function () {
      var self = this;
      this.$el.html( this.template( this.model.toJSON() ) );

      this.$mfarea = this.$el.find('#mf-input');

      /*this.$mfarea.on('mouseup keyup', function (e) {
        self.trigger('highlight');
      });*/
    }
  });
});
