exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        browserName: 'phantomjs',
        'phantomjs.binary.path': require('phantomjs-prebuilt').path,
        'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
    },
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 120000
    }
};
