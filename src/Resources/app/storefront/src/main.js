/**
 * See LICENSE.md for license details.
 */

import DPAutocompletePlugin from './dpautocomplete/dpautocomplete.plugin';

const PluginManager = window.PluginManager;
PluginManager.register('AutocompletePlugin', DPAutocompletePlugin, '[data-autocomplete-plugin]');

// Necessary for the webpack hot module reloading server
if (module.hot) {
    module.hot.accept();
}
