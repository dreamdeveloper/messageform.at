define(['handlebars', 'messageformat', 'underscore'], function (Handlebars, MessageFormat, _) {
  function mfenglish (message, data, options) {
    var mf = new MessageFormat('en');
    var realData = {};
    _(data).forEach(function (variable) {
      realData[variable.key] = variable.example;
    });
    var res;

    try {
      res = mf.compile(message)(realData);
    }
    catch (e) {
      res = "*Not enough data to render english.*";
    }
    return res;
  }

  Handlebars.registerHelper('mfenglish', mfenglish);
  return mfenglish;
});
