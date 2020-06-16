import './postdirekt-autocomplete/components/infobox';
import './postdirekt-autocomplete/components/api-test-button';

import deDe from '../snippet/de-DE';
import enGB from '../snippet/en-GB';

const { Module } = Shopware;

Module.register('postdirekt-autocomplete', {
    type: 'plugin',
    name: 'Postdirekt-Autocomplete',
    title: 'Deutsche Post Direkt Autocomplete',
    version: '1.0.0',
    snippets: {
        'de-DE': deDe,
        'en-GB': enGB
    }
});
