var argv = require('yargs').argv;
const flags = [
    '--disable-extensions',
    '--no-proxy-server',
    '--js-flags="--max_old_space_size=6500"',
    '--high-dpi-support=1'
];
module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            './tmp/**/*.js'
        ],
        exclude: [],
        reporters: argv.debug ? ['spec', 'kjhtml'] : ['spec', 'coverage', 'kjhtml'],
        autoWatch: true,
        browsers: [argv.chrome ? 'Chrome_headless' : 'PhantomJS'],
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-spec-reporter',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-jasmine-html-reporter'
        ],
        customLaunchers: {
            'Chrome_headless': {
                base: 'Chrome',
                flags: flags.concat("--no-sandbox", "--window-size=800,800"),
            },
        },
        preprocessors: { './tmp/**/*.js': ['coverage'] },
        coverageReporter: {
            reporters: [
                { type: 'html' },
                { type: 'text-summary' }
            ]
        },
        retryLimit: 0,
        logLevel: argv.debug ? config.LOG_DEBUG : config.LOG_INFO,
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
        }
    });
};