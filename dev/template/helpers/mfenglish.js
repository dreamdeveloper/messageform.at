define(['handlebars', 'messageformat', 'underscore'], function (Handlebars, MessageFormat, _) {
  function mfenglish (message, data, options) {
    var mf = new MessageFormat('en');
    var realData = {};
    _(data).forEach(function (variable) {
      realData[variable.key] = variable.example;
    });
    return mf.compile(message)(realData);
  }

  Handlebars.registerHelper('mfenglish', mfenglish);
  return mfenglish;
});
