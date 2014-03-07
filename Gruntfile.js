module.exports = function (grunt) {
  'use strict';

  var pkg = grunt.file.readJSON('package.json');
  var templateFile = 'src/js/template.js';
  var jsOutputFile = 'public/<%= pkg.name %>.js';
  var jsInputFiles = [
    'vendor/js/**/*.js',
    'src/js/siemens.js',
    templateFile,
    'src/js/*.js',
    'src/js/collections/*.js',
    'src/js/views/*.js'
  ];

  grunt.initConfig({
    pkg: pkg,

    concurrent: {
      dev: {
        tasks: ['connect:specs:keepalive', 'watch:js', 'watch:stylus', 'watch:templates', 'watch:specs']
      },
      options: {
        logConcurrentOutput: true,
        limit: 5
      }
    },

    connect: {
      specs: {
        options: {
          port: 9000
        }
      }
    },

    jasmine: {
      specs: {
        src: 'src/js/<%= pkg.name %>.js',
        options: {
          host : 'http://localhost:9000/',
          specs: 'spec/**/*[Ss]pec.js',
          helpers: 'spec/support/*.js',
          keepRunner: true,
          styles: 'public/<%= pkg.name %>.css',
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfigFile: 'src/js/config.js',
            requireConfig: {
              baseUrl: 'src/js'
            }
          }
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'spec/**/*.js'],
      options: {
        ignores: ['spec/support/mock-ajax.js', templateFile, 'src/js/vendor/**/*.js'],
        globals: {
          jQuery: true,
          module: true,
          document: true
        }
      }
    },

    jst: {
      compile: {
        options: {
          amd: true,
          processName: function(filename) {
            return filename.toLowerCase().replace(/src\/templates\//, '').replace(/\.html\.jst/, '');
          },
          templateSettings: {
            variable: "data"
          }
        },
        files: {
          'src/js/template.js': ["src/templates/**/*.html.jst"]
        }
      }
    },

    notify: {
      watch: {
        options: {
          title: "Siemens Build",
          message: "Finished JST, Uglify & Stylus."
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: "src/js",
          findNestedDependencies: true,
          generateSourceMaps: true,
          include: ['config.js', 'siemens.js'],
          mainConfigFile: "src/js/config.js",
          uglify2: {
            compress: true,
            mangle: true,
            // output: {
              // beautify: true
            // },
            preserveComments: 'some'
          },
          useStrict: true,
          out: jsOutputFile,
          optimize: 'uglify2',
          preserveLicenseComments: false
        }
      }
    },

    stylus: {
      compile: {
        files: {
          'public/<%= pkg.name %>.css': 'src/css/siemens.css.styl'
        },
        options: {
          urlfunc: 'dataUrl'
        }
      }
    },

    watch: {
      js: {
        files: jsInputFiles,
        tasks: ['requirejs:compile', 'notify:watch']
      },
      stylus: {
        files: 'src/css/**/*.css.styl',
        tasks: ['stylus:compile', 'notify:watch']
      },
      templates: {
        files: 'src/templates/**/*.html.jst',
        tasks: ['jst:compile', 'notify:watch']
      },
      specs: {
        files: 'specs/**/*.js',
        tasks: ['jasmine:specs:build', 'notify:watch']
      }
    }
  });

  require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', '!grunt-template-jasmine-requirejs']});

  grunt.registerTask('build', ['jst', 'requirejs:compile', 'stylus:compile', 'jasmine:specs:build']);
  grunt.registerTask('test', ['jshint', 'jasmine:specs']);
};
