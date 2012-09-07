define(['underscore', 'handlebars'], function (_, Handlebars) {
  function ifContains (needle, haystack, options) {
    if (_(haystack).contains(needle)) {
      return options.fn(this);
    }
    return options.inverse(this);
  }

  Handlebars.registerHelper('ifContains', ifContains);
  return ifContains;
});
