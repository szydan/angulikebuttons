module.exports = function (grunt) {
  "use strict";

  require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', 'gruntify-*']});

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    meta: {
      banner: "/*!\n * <%= pkg.name %>\n * <%= pkg.description %>\n * @version <%= pkg.version %> - <%= grunt.template.today(\'yyyy-mm-dd\') %>\n * @author <%= pkg.author.name %> <<%= pkg.author.url %>>\n */\n"
    },
    eslint: {
      source: {
        files: {
          src: ["angulikebuttons.js"]
        }
      },
      fixSource: {
        options: {
          fix: true
        },
        files: {
          src: ["angulikebuttons.js"]
        }
      }
    },
    mochaTest: {
      backend: {
        options: {
          //reporter: 'spec',
          //captureFile: 'results.txt', // Optionally capture the reporter output to a file
          //quiet: false, // Optionally suppress output to standard out (defaults to false)
          //clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['__tests__/**/*.js']
      }
    },
    watch: {
      lintit: {
        options: {
          spawn: false
        },
        files: ['Gruntfile.js',"angulikebuttons.js"],
        tasks: ['eslint:source']
      }
    },
    parallel: {
      lintit: {
        options: {
          stream: true
        },
        tasks: [
          {
            grunt: true,
            args: ['watch:lintit']
          }
        ]
      },
    }
  });


  // Default task.
  grunt.registerTask('default', 'launch webserver and watch tasks', [
    'parallel:lintit',
  ]);
};
