exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        browserName: 'chrome'
    },
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 120000
    }
};
