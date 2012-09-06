define(['handlebars', 'messageformat', 'underscore'], function (Handlebars, MessageFormat, _) {
  Handlebars.registerHelper('ifEquals', function (data1, data2, options) {
    if (data1 === data2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  return;
});
