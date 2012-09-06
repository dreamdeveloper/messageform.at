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
      'change #translate-to' : 'setToLang'
    },
    setToLang : function (e) {
      this.model.set('toLang', e.target.value);
    },
    render : function () {
      this.$el.html( this.template( this.model.toJSON() ) );
    }
  });
});
