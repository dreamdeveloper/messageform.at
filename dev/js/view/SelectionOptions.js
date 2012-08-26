define(['env', 'backbone', 'underscore', 'hbs!template/SelectionOptionsPopup', 'hbs!template/preview', 'messageformat', 'util/mfintrospect'], function (env, Backbone, _, tmpl, previewTemplate, MessageFormat, mfi) {

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

    permutate : function (n, from, got, res) {
      res = res || [];
      got = got || [];
      var cnt = 0;
      if (got.length == n) {
        res.push(_(got.join('-').split('-')).map(function (x){ return parseInt(x, 10); }));
        return 1;
      }
      for (var i = 0; i < from.length; i++) {
        got.push(from[i]);
        cnt += this.permutate(n, from, got, res);
        got.pop();
      }
      return res;
    },

    renderPreview : _.debounce(function () {
      var self = this;
      var fulltext = self.model.get('fulltext');
      var start = self.model.get('start');
      var end = self.model.get('end');

      var tryCompile = fulltext.substr(0, start) + self.buildPluralForm() + fulltext.substr(end);

      try {
        var message = this.mf.compile(tryCompile);
        var mfVars = mfi.getVariables(tryCompile);
        var variables = mfVars.plural;
        var nums = this.getRelevantNumbers(this.calculateKeys());

        var datasets = [];
        _(this.permutate(variables.length, nums)).forEach(function (vals) {
          var data = {};
          _(variables).forEach(function (vari, idx) {
            data[vari] = vals[idx];
          });
          datasets.push(data);
        });

        var renderedMessages = _(datasets).map(function (data) {
          return message(data);
        });

        this.$preview.html(previewTemplate({ messages : renderedMessages }));
      }
      catch (e) {}

    }, 400),

    getRelevantNumbers : function (keySet) {
      var res = [];
      _(keySet).forEach(function (key) {
        _(key.nums).forEach(function (num) {
          res.push(num);
        });
      });

      return res;
    },

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
      this.$preview = this.$el.find('.message-preview');
    }
  });
});

