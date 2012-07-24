define(['env', 'backbone', 'underscore', 'hbs!template/SelectionOptionsPopup', 'messageformat', 'util/mfintrospect'], function (env, Backbone, _, tmpl, MessageFormat, mfi) {

  return Backbone.View.extend({
    initialize : function (opts) {
      this.template = tmpl;
      this.mf = new MessageFormat(env.get('locale'));
      this.model.set('plural_keywords', this.calculateKeys());

      this.accent();
    },

    events : {
      'blur .selection-popup' : 'hide',
      'keyup input' : 'renderPreview'
    },

    hide : function (e) {
      var self = this;
      setTimeout(function () {
        if ( !$.contains(self.el, $(':focus')[0]) ) {
          var fulltext = self.model.get('fulltext');
          var start = self.model.get('start');
          var end = self.model.get('end');
          var $target = $(e.target);
          var newText = fulltext.substr(0, start) + self.buildPluralForm() + fulltext.substr(end);
          self.model.get('container').text(newText);
          self.model.set('fulltext', newText);
          self.$el.hide();
        }
      }, 0);
    },

    buildPluralForm : function () {
      return '{' + this.$el.find('#variable-name').val() + ', plural, ' + _(this.$el.find('.plural-option')).map(function (val, key) {
        var $input = $(val);
        return $input.data('plural-name') + ' {' + $input.val() + '}';
      }).join(' ') + '}';
    },

    accent : function () {
      var $container = this.model.get('container');
      var start = this.model.get('start');
      var end = this.model.get('end');
      var fulltext = this.model.get('fulltext');
      var selectedtext = this.model.get('selectedtext');

      $container.html(
        fulltext.substr(0, start) +
        '<span class="accent">' + selectedtext + '</span>' +
        fulltext.substr(end)
      );
    },

    renderPreview : _.debounce(function () {
      var self = this;
      var fulltext = self.model.get('fulltext');
      var start = self.model.get('start');
      var end = self.model.get('end');

      var tryCompile = fulltext.substr(0, start) + self.buildPluralForm() + fulltext.substr(end);

      var mfVars = mfi.getVariables(tryCompile);

      var perms = [];
      _(mfVars.plural).forEach(function (varname) {
        var outs = [];
        _(mfVars.plural).forEach(function (varname2) {
          if ( varname !== varname2 ) {
            _(this.calculateKeys()).forEach(function (k, idx) {
              _(k.nums).forEach(function (num) {
                outs.push();
              });
            });
          }
        });
      });

    }, 400),

    calculateKeys : function () {
      var keys = {};
      var key;
      for (var i = 1; i < 213; i++) {
        key = this.mf.pluralFunc(i);
        if (!keys.hasOwnProperty(key)) {
          keys[key] = [i];
        }
      }
      // Always add zero
      keys[this.mf.pluralFunc(0)].push(0);
      var res = _(keys).map(function (val, key) {
        return {
          'nums' : val,
          'keyword' : key
        };
      });

      // memoize
      this.calculateKeys = function () { return res; };

      return res;
    },

    render : function () {
      var $container = this.model.get('container');
      this.$el.html(this.template(this.model.toJSON()));
      var popup = this.$el.find('.selection-popup');
      popup.focus();
      popup.css({
        'top' : ($container.offset().top + $container.outerHeight() - 1)+ 'px',
        'left' : $container.offset().left + 'px',
        'width' : $container.width() + 4 + 'px'
      });
      this.$el.show();
    }
  });
});

