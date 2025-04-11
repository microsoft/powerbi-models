var argv = require('yargs').argv;

process.env.CHROME_BIN = require('puppeteer').executablePath();

const flags = [
    '--disable-extensions',
    '--no-proxy-server',
    '--js-flags="--max_old_space_size=6500"',
    '--high-dpi-support=1',
    '--no-sandbox',
    '--headless',
    '--disable-gpu',
    '--window-size=800,800',
];
module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', 'karma-typescript'],
        files: [
            './tmp/**/*.js'
        ],
        exclude: [],
        preprocessors: {
          './src/**/*.ts': ['karma-typescript'],
          './test/**/*.ts': ['karma-typescript']
        },
        reporters: argv.debug ? ['spec', 'kjhtml'] : ['spec', 'coverage', 'progress', 'karma-typescript', 'junit', 'kjhtml'],
        autoWatch: true,
        browsers: ["Chrome_headless_custom"],
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-spec-reporter',
            'karma-junit-reporter',
            'karma-jasmine-html-reporter',
            'karma-coverage',
            'karma-typescript'
        ],
        customLaunchers: {
            'Chrome_headless_custom': {
                base: 'Chrome',
                flags: flags.concat("--no-sandbox", "--window-size=800,800"),
            },
        },
        junitReporter: {
          outputDir: 'test-results',
          outputFile: 'testresults.xml',
          useBrowserName: false
        }, 
        preprocessors: { './tmp/**/*.js': ['coverage'] },
        coverageReporter: {
            dir: 'coverage',
            reporters: [
                { type: 'cobertura', subdir: '.', file: 'cobertura-coverage.xml' },
                { type: 'html', subdir: 'html' }
            ]
        },
        karmaTypescriptConfig: {
          tsconfig: './tsconfig.json',
          reports: {
            "cobertura": {
              "directory": "coverage",
              "filename": "cobertura-coverage.xml"
            },
            "html": "coverage/html"
          } 
        },
        retryLimit: 0,
        logLevel: argv.debug ? config.LOG_DEBUG : config.LOG_INFO,
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
        }
    });
};