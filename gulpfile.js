var gulp = require('gulp');
var del = require('del'),
    header = require('gulp-header'),
    help = require('gulp-help-four'),
    rename = require('gulp-rename'),
    tslint = require('gulp-tslint'),
    typedoc = require("gulp-typedoc"),
    uglify = require('gulp-uglify'),
    karma = require('karma'),
    watch = require('gulp-watch'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    webpackConfig = require('./webpack.config'),
    webpackTestConfig = require('./webpack.test.config'),
    runSequence = require('gulp4-run-sequence'),
    argv = require('yargs').argv;
;

help(gulp, undefined);

var package = require('./package.json');
var webpackBanner = "// " + package.name + " v" + package.version + "\n"
    + "// Copyright (c) Microsoft Corporation.\n"
    + "// Licensed under the MIT License.";
var banner = webpackBanner + "\n";

gulp.task('build', 'Build for release', function (done) {
    return runSequence(
        'tslint:build',
        'clean:dist',
        'compile:ts',
        'min',
        'header',
        'clean:extradts',
        done
    );
});

gulp.task('test', 'Runs all tests', function (done) {
    return runSequence(
        'tslint:test',
        'clean:tmp',
        'compile:spec',
        'test:js',
        done
    );
});

gulp.task("docs", 'Compile documentation from src code', function () {
    return gulp
        .src(["src/**/*.ts"])
        .pipe(typedoc({
            mode: 'modules',
            includeDeclarations: true,

            // Output options (see typedoc docs)
            out: "./docs",
            json: "./docs/json/" + package.name + ".json",

            // TypeDoc options (see typedoc docs)
            ignoreCompilerErrors: true,
            version: true
        }))
        ;
});

gulp.task('compile:ts', 'Compile source files', function () {
    webpackConfig.plugins = [
        new webpack.BannerPlugin({
            banner: webpackBanner,
            raw: true
        })
    ];

    return gulp.src(['./src/**/*.ts'])
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('./dist'));
});

gulp.task('header', 'Add header to distributed files', function () {
    return gulp.src(['./dist/*.d.ts'])
        .pipe(header(banner))
        .pipe(gulp.dest('./dist'));
});

gulp.task('min', 'Minify build files', function () {
    return gulp.src(['!./dist/*.min.js', './dist/models.js'])
        .pipe(uglify())
        .pipe(header(banner))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('clean:dist', 'Clean dist folder', function () {
    return del([
        './dist/**/*'
    ]);
});

gulp.task('clean:tmp', 'Clean tmp folder', function () {
    return del([
        './tmp/**/*'
    ]);
});

gulp.task('clean:extradts', 'Clean unused dts files', function () {
    return del([
        './dist/validators'
    ]);
});

gulp.task('compile:spec', 'Compile spec tests', function () {
    return gulp.src(['./test/test.spec.ts'], { allowEmpty: true })
        .pipe(webpackStream(webpackTestConfig))
        .pipe(gulp.dest('./tmp'));
});

gulp.task('test:js', 'Run spec tests', function (done) {
    new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: argv.debug ? false : true,
        captureTimeout: argv.timeout || 60000
    }, function () {
        done();
    })
    .on('browser_register', (browser) => {
        if (argv.chrome) {
            browser.socket.on('disconnect', function (reason) {
                if (reason === "transport close" || reason === "transport error") {
                    done(0);
                    process.exit(0);
                }
            });
       }
    })
    .start();

    if (argv.chrome) {
        return watch(["src/**/*.ts", "test/**/*.ts"], function () {
            runSequence( 'tslint:test', 'clean:tmp', 'compile:spec');
        });
    }
});

gulp.task('tslint:build', 'Run TSLint on src', function () {
    return gulp.src(["src/**/*.ts"])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task('tslint:test', 'Run TSLint on src and tests', function () {
    return gulp.src(["src/**/*.ts", "test/**/*.ts"])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});