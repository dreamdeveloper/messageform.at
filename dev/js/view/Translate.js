define([
  'backbone',
  'env',
  'jquery',
  'underscore',
  'util/rangy',
  'diff',
  'hbs!template/translate',
  'model/SelectionOptions',
  'view/SelectionOptions',
  'util/contentEditableChange'
], function (Backbone, env, $, _, rangy, diff, template) {
  return Backbone.View.extend({
    initialize : function (options) {
      this.template = template;
    },
    events : {},
    render : function () {
      this.$el.html( this.template( this.model.toJSON() ) );
    }
  });
});
