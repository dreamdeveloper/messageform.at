define(['backbone', 'underscore', 'messageformat', 'locales'], function (Backbone, _, MessageFormat /*, locales */) {
  return Backbone.Model.extend({
    initialize : function () {},

    significantVariableCombos : function (locale) {
      var self = this;
      var localeMF = new MessageFormat(locale);
      var potentials = this.get('variables');
      var renderedMessages;

      var rawMessage = this.get('message');
      var messageFunc = localeMF.compile(rawMessage);
      var nums = this.getRelevantNumbers(this.calculateKeys(localeMF));
      var datasets = [];

      var ignores = [];

      _(potentials).forEach(function (variable, idx) {
        var allNums = [];

        if (_(variable.ignore).contains(locale)) {
          ignores.push(idx);
          return;
        }

        // Add in the explicit numbers for a plural case
        if (variable.type === 'plural') {
          // Generate a list of objects that contain
          // the keyword, an example and the type
          _(nums).forEach(function (num) {
            allNums.push({
              key : variable.name,
              type : 'plural',
              keyword : localeMF.pluralFunc(num),
              example : num + (variable.offset || 0),
              explicit : false
            });
          });

          _(variable.options).forEach(function (option) {
            allNums.push({
              key : variable.name,
              type : 'plural',
              keyword : '=' + option,
              example : option,
              explicit : true
            });
          });

          // Add as the possible values
          variable.values = allNums;
        }
        // Pretty much just add 'other' and pass a deep copy of the 'options' list
        else if (variable.type === 'select') {
          variable.values = _(variable.options || []).map(function (value) {
            return {
              key : variable.name,
              type : 'select',
              keyword : value,
              example : value,
              explicit : true // kinda...
            };
          });
          variable.values.push({
            key : variable.name,
            type : 'select',
            keyword : 'other',
            example : 'unkown',
            explicit : false
          });
        }
        else if (variable.type === 'replacement') {
          variable.values = [{
            key : variable.name,
            type : 'replacement',
            keyword : variable.name,
            example : variable.example,
            explicit : false
          }];
        }
      });

      var filteredPotentials = _.clone(potentials);
      _(ignores).forEach(function (ignoreIdx) {
        filteredPotentials[ignoreIdx] = undefined;
      });

      filteredPotentials = _(filteredPotentials).compact();

      // We need to do some cloning - so modifying this array in permutate
      // won't modify the stored values in this.variables, etc
      return this.permutate(filteredPotentials);
    },
    getRelevantNumbers : function (keySet) {
      var res = [];
      _(keySet).forEach(function (key) {
        _(key.nums).forEach(function (num) {
          res.push(num);
        });
      });

      return res;
    },
    calculateKeys : function (mf) {
      var keys = {};
      var key;
      // Seems like the highest number we'd need is 120, since
      // n % 100 > 19 is the highest test that occurs, but it's cheap,
      // so in case things change somehow, I'll donate an extra 100
      for (var i = 1; i < 220; i++) {

        // Get the key from the function on each number
        key = mf.pluralFunc(i);

        // If we haven't seen the key yet, add it
        if (!keys.hasOwnProperty(key)) {
          keys[key] = [i];
        }
      }

      // Give back some nice objects that pair the key with the
      // example number
      var res = _(keys).map(function (val, key) {
        return {
          'nums' : val,
          'keyword' : key
        };
      });

      return res;
    },

    // We want a result that is
    // - an array of sets of values that represent all possible combinations of data
    permutate : function (set, res) {
      res = res || [[]];

      // Bail if we have nothing to permutate
      if (!set || !set.length) {
        return res;
      }

      var newRes = [];
      var variable = set.shift();

      // Go through the current permutations
      _(res).forEach(function (oldPerm) {
        // Go through the possible values of the next variable
        _(variable.values).forEach(function (newVal) {
          // Clone the current permutation for each new value
          var permClone = _(oldPerm).map(function (val) {
            return _.clone(val);
          });

          // Add this permutation to the clone
          permClone.push(_.clone(newVal));

          // Add the clone to the new set
          newRes.push(permClone);
        });
      });

      return this.permutate(set, newRes);
    }
  });
});

