import './postdirekt-autocomplete/components/infobox';
import './postdirekt-autocomplete/components/api-test-button';
import './postdirekt-autocomplete/components/housenumber-info';

const {Module} = Shopware;

Module.register('postdirekt-autocomplete', {
    type: 'plugin',
    name: 'Postdirekt-Autocomplete',
    title: 'Deutsche Post Direkt Autocomplete',
    version: '1.0.0'
});
