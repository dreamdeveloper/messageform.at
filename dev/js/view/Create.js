define([
  'backbone',
  'env',
  'jquery',
  'underscore',
  'util/rangy',
  'diff',
  'hbs!template/create',
  'model/SelectionOptions',
  'view/SelectionOptions',
  'util/contentEditableChange'
], function (Backbone, env, $, _, rangy, diff, template, SelectOptsModel, SelectOptsView) {
  return Backbone.View.extend({
    initialize : function (options) {
      this.template = template;
      rangy.init();

      // Handle highlights of text
      this.on('highlight', this.highlight, this);
      this.on('textselect', this.showOptions, this);
    },
    options : {},
    events : {
      'focus #mf-input' : 'inputfocus',
      'blur #mf-input' : 'inputblur',
      'keyup #mf-input' : 'inputchange',
      'mouseup #mf-input' : 'highlight'
    },
    inputchange : _.debounce(function (e) {
      var $target = $(e.currentTarget);
      var val = $target.text();

      // Don't count the placeholder as a value
      if ($target.hasClass('placeholder-on')) {
        val = '';
      }
      this.highlight();

      // Constantly update the model
      this.model.set('message', val);
    }, 500),
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
    showOptions : function (fulltext, selectedtext, start, end) {
      var self = this;

      this.popupModel = new SelectOptsModel({
        container : this.$mfarea,
        fulltext : fulltext,
        selectedtext : selectedtext,
        start : start,
        end : end
      });

      this.popupView = new SelectOptsView({
        el : $('#popup-container'),
        model : self.popupModel
      });

      this.popupView.render();
    },
    highlight : function () {
      // Get the currently selected text
      try {
        var range = rangy.getSelection().getRangeAt(0);

        // Bail if it's just whitespace or nothing.
        if (!$.trim(range.toString())) {
          return;
        }

        this.trigger('textselect', this.$mfarea.text(), range.toString(), range.startOffset, range.endOffset);
      }
      catch (e) {
        if (window.console && console.log) {
          //console.log(e);
        }
      }
    },
    render : function () {
      var self = this;
      this.$el.html( this.template( this.model.toJSON() ) );

      this.$mfarea = this.$el.find('#mf-input');
    }
  });
});
