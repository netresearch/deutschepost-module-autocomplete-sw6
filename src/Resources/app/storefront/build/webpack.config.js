// eslint-disable-next-line func-names
const {resolve, join} = require("path");
module.exports = function (params) {
    return {
        resolve: {
            alias: {
                'shopware-storefront-sdk': resolve(
                    join(__dirname, '..', 'node_modules', 'shopware-storefront-sdk'),
                ),
                '@netresearch/postdirekt-autocomplete-library': resolve(
                    join(__dirname, '..', 'node_modules', '@netresearch/postdirekt-autocomplete-library'),
                ),
            },
        }
    };
};
