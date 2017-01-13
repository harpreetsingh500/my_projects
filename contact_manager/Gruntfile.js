module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      main: {
        expand: true,
        cwd: "bower_components/components-font-awesome/",
        src: ["css/*min.css",
              "fonts/*"],
        dest: "public/stylesheets/font-awesome/"
      }
    },
    uglify: {
      my_target: {
        files: {
          "public/javascripts/all.js": ["public/javascripts/all.js"]
        }
      }
    },
    bower_concat: {
      all: {
        dest: "public/javascripts/vendor/all.js",
      }
    },
    concat: {
      options: {
        separator: ";"
      },
      dist: {
        src: ["public/javascripts/vendor/all.js", "public/javascripts/handlebarsTemplates.js", "public/javascripts/main.js"],
        dest: "public/javascripts/all.js"
      }
    },
    handlebars: {
      all: {
        files: {
          "public/javascripts/handlebarsTemplates.js": ["handlebars/**/*.hbs"]
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-bower-concat");
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks("grunt-contrib-handlebars");
  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.registerTask("default", ["bower_concat", "concat", "uglify"]);
};
