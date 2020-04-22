swplugins = require('@shopware-ag/e2e-testsuite-platform/cypress/plugins');
module.exports = (on, config) => {
    swplugins(on, config);
    on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
            console.log('Expand window size');
            launchOptions.args.push('--window-size=1920,1680');

            return launchOptions
        }
    })

};
