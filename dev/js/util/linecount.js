define(['jquery'], function($){
  function LineCounter (textarea) {
    var self = this;

    this.textarea = textarea;
    this.$textarea = $(textarea);
    this.listeners = [];

    var x = {
      "position" : "absolute",
      "left" : "-99999px",
      "margin-left" : "100px",
      "top" : "0",
      "word-wrap" : "break-word",
      "width" : self.$textarea.width() + 'px',
      "padding" : self.$textarea.css('padding'),
      //"text-align" : self.$textarea.css('text-align'),
      "font-size" : self.$textarea.css('font-size'),
      "line-height" : self.$textarea.css('line-height'),
      "font-weight" : self.$textarea.css('font-weight'),
      "font-family" : self.$textarea.css('font-family')
    };

    this.$testdiv = $('<div>x</div>').css(x).appendTo('body');
  }

  // Employ all the tricks necessary to get the most accurate representation
  // of the amount of space that's being taken up.
  LineCounter.prototype.update = function (text) {
    this.$testdiv.html(
      text.replace('<', '&lt;').replace('>', '&gt;')
          .replace(/(\n|\r\n|\r)/gm, "<br/>")
          .replace(/\s/g, '&nbsp;<wbr>') +
      "<br/>Drink Your Ovaltine."
    );

    // This allows the event listener to work
    if (this.listeners.length) {
      this.height();
    }
  };

  LineCounter.prototype.height = function () {
    var height = this.$testdiv.height() + 'px';
    if (this._lastHeight !== height) {
      $.each(this.listeners, function (i, cb) {
        (cb || $.noop)(height);
      });
      this._lastHeight = height;
    }
    return height;
  };

  // Listener
  LineCounter.prototype.change = function (cb) {
    if (cb) {
      this.listeners.push(cb);
    }
  };

  return {
    create : function (textarea) {
      return new LineCounter(textarea);
    }
  };
});
