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
          message : "{CONTENTCOUNT, plural, =0 {Be the first to write} other {Write}} a review.",
          lang : "en",
          md5 : "a2420a393c32e137d4072c2a9e38e7fe",
          contentType : "review",
          description : "The call to action on the main submission buttons.",
          variables : [{
            name : "CONTENTCOUNT",
            description : "The amount of content that currently exists for the subject.",
            type : "plural",
            options : [0]
          }, {
            name : "GENDER",
            description : "The gender of the person who should be writing the content.",
            type : "select",
            options : ['male', 'female']
          }]
        },
        /*{
          key : "writeContent",
          message : "{CONTENTCOUNT, plural, =0 {Be the first to ask} other {Ask}} a question.",
          lang : "en",
          md5 : "f6dd2459ff3eaa36698d9b0809823f1b",
          contentType : "answer",
          description : "The call to action on the main submission buttons.",
          variables : [{
            name : "CONTENTCOUNT",
            description : "The amount of content that currently exists for the subject.",
            type : "plural",
            options : [0]
          }, {
            name : "GENDER",
            description : "The gender of the person who should be writing the content.",
            type : "select",
            options : ['male', 'female']
          }]
        },*/
        {
          key : "messageCountAlert",
          message : "You have {NUMMSG, plural, one {1 new message} other {# new messages}}.",
          lang : "en",
          md5 : "c518d90b85481802103ea7c52ce9a7db",
          contentType : null,
          description : "This is an alert at the top of the page when a user logs in that tells them how many new messages they've got since the last time they logged in.",
          variables : [{
            name : "NUMMSG",
            description : "The number of messages they've received.",
            type : "plural"
          }, {
            name : "GENDER",
            description : "The gender of the person who has received these messages.",
            type : "select",
            options : ['male', 'female']
          }]
        }]);

        // Trigger dataReady
        self.trigger('dataReady');
      }, 20);
    }
  });
});
