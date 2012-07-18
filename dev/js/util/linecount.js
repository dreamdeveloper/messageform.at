define(['jquery'], function($){
  function LineCounter (textarea) {
    var self = this;

    this.textarea = textarea;
    this.$textarea = $(textarea);

    this.testdiv = $('<div>').css({
      "position" : "absolute",
      "left" : "-99999px",
      "top" : "0",
      "width" : self.$textarea.width() + 'px'
    }).appendTo('body');
  }

  return {
    create : function (textarea) {
      return new LineCounter(textarea);
    }
  };
});
