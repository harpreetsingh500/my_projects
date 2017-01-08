module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          "javascript/all.js": ["javascript/all.js"]
        }
      }
    },
    bower_concat: {
      all: {
        dest: "javascript/vendor/all.js",
        dependencies: {
          "jquery_lazyload": "jquery",
          "handlebars": "jquery"
        }
      }
    },
    concat: {
      options: {
        separator: ";"
      },
      dist: {
        src: ["javascript/vendor/all.js", "javascript/main.js"],
        dest: "javascript/all.js"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-bower-concat");
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask("default", ["bower_concat", "concat", "uglify"]);
};
