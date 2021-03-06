module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      lib: {
        src: [
          'public/lib/jquery.js',
          'public/lib/underscore.js',
          'public/lib/backbone.js',
          'public/lib/handlebars.js',
        ],
        dest: 'public/dist/lib.js'
      },
      client: {
        src: [
          'public/client/**/*.js', 
        ],
        dest: 'public/dist/client.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      target: {
        files: {
          'public/dist/client.min.js': ['public/dist/client.js'],
          'public/dist/lib.min.js': ['public/dist/lib.js'],
        }
      }
    },

    eslint: {
      target: [
        'public/client/**/*.js',
        'app/**/*.js',
        'server-config.js',
        'server.js'
        // Add list of files to lint here
      ]
    },

    cssmin: {
      target: {
        files: {
          'public/dist/output.css': ['public/style.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify:target'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin:target']
      }
    },

    shell: {
      prodServer: {
        command: [
          'git push live master'
          // 'node server.js'
        ].join(' && '),
        options: {
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
      cmd: 'grunt',
      grunt: true,
      args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });


  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      grunt.task.run(['shell:prodServer']);
      // add your production server task here
    }
    grunt.task.run([ 'server-dev' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////


  grunt.registerTask('test', [
    'mochaTest',
    'lint'
  ]);

  grunt.registerTask('lint', [
    'eslint'
  ]);

  grunt.registerTask('build', [
    'concat',
    'cssmin:target',
    'uglify:target'
  ]);

  // grunt.registerTask('upload', function(n) {
  //   if (grunt.option('prod')) {
  //     // add your production server task here
  //   } else {
  //     grunt.task.run([ 'server-dev' ]);
  //   }
  // });

  // use process.env.MODE === 'production' ?
  // MODE=production

  grunt.registerTask('deploy', function(n) {
    if (grunt.option('prod')) {
      grunt.task.run(['build']);
      // add your production server task here
    } else {
      grunt.task.run(['test', 'shell:prodServer']);
    }
    grunt.task.run([ 'server-dev' ]);

  });
};