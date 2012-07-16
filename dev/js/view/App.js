define(['backbone', 'env', 'hbs!template/base'], function (Backbone, env, template) {
  return Backbone.View.extend({
    initialize : function (options) {
      this.template = template;
    },
    render : function () {
      this.$el.html( this.template( this.model.toJSON() ) );
    }
  });
});
