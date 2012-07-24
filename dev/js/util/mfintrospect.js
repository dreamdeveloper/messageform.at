define(['underscore', 'messageformat'], function (_, MessageFormat) {
  var mf = new MessageFormat();

  return {
    getVariables : function (str) {
      var ast = mf.parse(str);
      return this._parseASTforVars(ast.program);
    },
    _parseASTforVars : function (ast, plural_results, select_results) {
      var self = this;
      plural_results = plural_results || [];
      select_results = select_results || [];

      _(ast.statements).forEach(function (statement) {
        if ( statement.type === 'messageFormatPatternRight' ) {
          _(statement.statements).forEach(function (statement) {
            if ( statement.type === 'messageFormatElement' ) {
              if (statement.argumentIndex) {
                if ( statement.elementFormat && statement.elementFormat.key === 'plural' ) {
                  plural_results.push(statement.argumentIndex);

                  if ( statement.elementFormat.val && statement.elementFormat.val.pluralForms ) {
                    _(statement.elementFormat.val.pluralForms).forEach(function (pf) {
                      self._parseASTforVars(pf.val, plural_results, select_results);
                    });
                  }
                }
                else {
                  // TODO :: get potential variables.
                  select_results.push(statement.argumentIndex);
                }
              }
            }
          });
        }
      });

      return { plural : plural_results, select : select_results };
    }
  };
});
