({
  "appDir": "../../dev/",
  "dir": "../../build",
  "baseUrl": "js/",
  "optimizeCss": "standard",
  "optimize": "none",
  "inlineText": true,
  "paths": {
    "template": "../template"
  },
  "pragmasOnSave": {
    "excludeDev": true,
    "excludeHbsParser" : true,
    "excludeHbs" : true,
    "excludeAfterBuild" : true
  },
  "pragmas": {
    "testingExcludeBeforeSave": true
  },
  "modules": [
    {
      "name": "main"
    }
  ],
  "shim" : {
    "underscore": {
      exports : function () {
        return this._;
      }
    },
    "backbone" : {
      "deps" : ['underscore', 'jquery'],
      "exports" : function (_, $) {
        this._.noConflict();
        return this.Backbone.noConflict();
      }
    }
  }
})
