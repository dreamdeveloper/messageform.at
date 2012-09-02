define(['backbone', 'model/Message'], function (Backbone, Message) {
  return Backbone.Collection.extend({
    model : Message,
    initialize : function (options) {
      var self = this;

      this.on('dataReady', function () {
        self.isReady = true;
      }, this);
    },

    fetch : function () {
      var self = this;
      setTimeout(function () {
        self.reset([{
          key : "writeContent",
          message : "{CONTENTCOUNT, plural, =0 {Be the first to w} other {W}}rite a review.",
          lang : "en",
          md5 : "ae46547ccfc5db9d86bf7104e5e98ddc",
          contentType : "review",
          description : "The call to action on the main submission buttons.",
          variables : [{
            name : "CONTENTCOUNT",
            description : "The amount of content that currently exists for the subject.",
            type : "plural"
          }, {
            name : "GENDER",
            description : "The gender of the person who should be writing the content.",
            type : "select"
          }]
        },
        {
          key : "writeContent",
          message : "{CONTENTCOUNT, plural, =0 {Be the first to a} other {A}}sk a question.",
          lang : "en",
          md5 : "d8132f4341aed7dff3562edc1b77f3b3",
          contentType : "answer",
          description : "The call to action on the main submission buttons.",
          variables : [{
            name : "CONTENTCOUNT",
            description : "The amount of content that currently exists for the subject.",
            type : "plural"
          }, {
            name : "GENDER",
            description : "The gender of the person who should be writing the content.",
            type : "select"
          }]
        }]);

        // Trigger dataReady
        self.trigger('dataReady');
      }, 20);
    }
  });
});
