module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
          //Compact Format
        //src: ['assets/scripts/*.js'] ,
        //dest: 'dist/<%= pkg.name %>.js'
        //Files Object Format
        // files: {
        //   'dist/<%= pkg.name %>.js': ['assets/scripts/*.js'],
        //   'dist/plugins.js': ['plugins/*.js']
        // }

        // Files Array Format
        files: [
          {src: ['assets/scripts/lib/jquery/*.js','assets/scripts/lib/angular/*.js','assets/scripts/lib/bootstrap/*.js','assets/scripts/lib/md5/*.js'], dest: 'assets/scripts/<%= pkg.name %>.js'}
        ]
      }
    }
  });

  // Load the plugin that provides the "concat" task.
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['concat']);

};