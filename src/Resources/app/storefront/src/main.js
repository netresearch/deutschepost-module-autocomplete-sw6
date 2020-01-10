/**
 * See LICENSE.md for license details.
 */

import DPAutocompletePlugin from './dpautocomplete/dpautocomplete.plugin';

const PluginManager = window.PluginManager;
PluginManager.register('DPAutocompletePlugin', DPAutocompletePlugin);

// Necessary for the webpack hot module reloading server
if (module.hot) {
    module.hot.accept();
}
