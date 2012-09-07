define([
  'backbone',
  'env',
  'jquery',
  'underscore',
  'util/rangy',
  'diff',
  'hbs!template/translate'
], function (Backbone, env, $, _, rangy, diff, template) {
  return Backbone.View.extend({
    initialize : function (options) {
      this.template = template;
    },
    events : {
      'change #translate-to' : 'setToLang',
      'click .ignore-variable' : 'ignoreVariable'
    },
    setToLang : function (e) {
      this.model.set('toLang', e.target.value);
    },
    ignoreVariable : function (e) {
      e.preventDefault();
      e.stopPropagation();

      var $el = $(e.target);
      this.model.get('messages').ignore($el.attr('data-md5'), $el.attr('data-variable'), this.model.get('toLang'));
      // A lot like a lang change, so we'll use it.
      this.model.trigger('change:toLang', this.model.get('toLang'));
    },
    render : function () {
      this.$el.html( this.template( this.model.toJSON() ) );
    }
  });
});
