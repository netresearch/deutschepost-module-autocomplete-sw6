/**
 * See LICENSE.md for license details.
 */

import Plugin from 'src/plugin-system/plugin.class';
import AddressAutocomplete from './autocomplete-handler';

export default class DPAutocompletePlugin extends Plugin {
    static options = {
        token: null,
        fields: [],
        countries: [],
        deCountryId: null,
        isDeCountrySelect: false,
    };

    init()
    {
        const countrySelectSelector = this.options.fields.filter(item => item.type === 'country')[0],
            watchedFields = this.options.fields.filter(item => item.type !== 'country');

        const Handler = new AddressAutocomplete(watchedFields, countrySelectSelector, this.options.deCountryId, this.options.token);
        Handler.start();
    }

}
