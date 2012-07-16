// These happen at compile time and make themselves obsolete
//>>excludeStart('excludeHbs', pragmas.excludeHbs)
define(['handlebars', "underscore", "messageformat"], function ( Handlebars, _, MessageFormat ) {
  var mf = new MessageFormat('en');

  function replaceLocaleStrings( ast, mapping, buildMap, load, write, config, parentRequire, i18nDeps ) {
    mapping = mapping || {};
    // Base set of things
    if ( ast && ast.type === "program" && ast.statements ) {
      var curAst    = ast,
      statementLoop = function (statement, i) {
        var newString = "<!-- i18n error -->", msg,
        // If it's a translation node
        mustache = statement.mustache;
        if ( mustache && mustache.id && mustache.id.string == "_" ) {
          if ( mustache.params.length && mustache.params[0].string ) {
            if ( statement.program && statement.program.statements ) {
              newString = statement.program.statements[0].string;
            }
            newString = mapping[ mustache.params[0].string ] || newString;
          }

          var code = [], key = mustache.params[ 0 ].string;

          code.push("/* START GENERATED MESSAGE */\n");
          code.push("define(['messageformat', 'handlebars', 'underscore'], function (MessageFormat, Handlebars, _) {\n");
          code.push("function " + key + "( data ) {\n");
          code.push( "return (" + mf.precompile( mf.parse( newString ) ) + ")(data);\n}\n" );
          code.push("Handlebars.registerHelper('_i18n_");
          code.push( key );
          code.push("', function () {\n");
          code.push("var data = {};\n");
          code.push("var args = [].slice.call( arguments, 0, arguments.length-1 );\n");
          code.push("_(args).forEach(function (arg) {\n");
          code.push("  _.extend(data, arg);\n");
          code.push("});");
          code.push( "\nreturn " + key + "(data);\n" );
          code.push( "});" );
          code.push("\nreturn " + key + ";");
          code.push("\n});\n");
          code.push("/* END GENERATED MESSAGE */");

          var compiledName = '_i18n_' + key,
              text         = code.join('');

          buildMap[ compiledName + '@i18n' ] = text;

          // Grab the key, and all the params that are passed to it.
          var dataName = _( mustache.params.slice(1) ).map(function ( param ) {
            return param.string || param.original;
          }).join(' ');

          curAst.statements[ i ] = Handlebars.parse('{{{_i18n_' +
              key + ' ' +
              dataName +
              '}}}'
            ).statements[0];

          i18nDeps.push( compiledName );
          load.fromText(compiledName, text);
        }
        // If we need to recurse
        if ( statement.program ) {
          statement.program = replaceLocaleStrings( statement.program, mapping, buildMap, load, write, config, parentRequire, i18nDeps );
        }
      };

      _(ast.statements).forEach(statementLoop);
      if ( ast.inverse && ast.inverse.type === "program" ) {
        curAst = ast.inverse;
        _(ast.inverse.statements).forEach(statementLoop);
      }
    }
    return ast;
  }

  return replaceLocaleStrings;
});
//>>excludeEnd('excludeHbs')
