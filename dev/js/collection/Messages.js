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
        self.reset([/*{
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
        },
        {
          key : "writeContent",
          message : "{CONTENTCOUNT, plural, =0 {Be the first to write} other {Write}} a review.",
          lang : "en",
          md5 : "a2420a393c32e137d4072c2a9e38e7fe",
          contentType : "review",
          description : "The call to action on the main submission buttons. In this case we're not using the plural form on CONTENTCOUNT for pluralization, but just changing things when there are no reviews.",
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
          key : "groupAdd",
          message : "{PERSON} added {PLURAL_NUM_PEOPLE, plural, offset:1 =0 {no one} =1 {just {GENDER, select, male {him} female {her} other{them}}self} one {{GENDER, select, male {him} female {her} other{them}}self and one other person} other {{GENDER, select, male {him} female {her} other{them}}self and # other people}} to {GENDER, select, male {his} female {her} other {their}} group.",
          lang : "en",
          md5 : "a532ecff44676ac817890b437f6714c9",
          contentType : null,
          description : "This message shows up as a status on a user's profile badge and indicates the 'adding to group' related actions of a user.",
          variables : [{
            name : "PERSON",
            description : "The name of the person who did this stuff.",
            type : 'replacement',
            example : 'Pat'
          },{
            name : "PLURAL_NUM_PEOPLE",
            description : "The amount of content that currently exists for the subject. NOTE:: There is an offset of 1, since the total count includes the user.",
            type : "plural",
            offset : 1,
            options : [0, 1]
          }, {
            name : "GENDER",
            description : "The gender of the person who added someone to their group.",
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
