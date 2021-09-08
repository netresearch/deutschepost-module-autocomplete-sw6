/**
 * See LICENSE.md for license details.
 */

import Plugin from 'src/plugin-system/plugin.class';
import autocomplete from '@netresearch/postdirekt-autocomplete-library';

export default class DPAutocompletePlugin extends Plugin {
    options = {
        token: null,
        hint: null,
        streetFieldSelector: null,
        cityFieldSelector: null,
        postalCodeFieldSelector: null,
        countryFieldSelector: null,
        deCountryId: null
    };

    init() {
        const streetInput = document.querySelector(this.options.streetFieldSelector);
        const cityInput = document.querySelector(this.options.cityFieldSelector);
        const postalCodeInput = document.querySelector(this.options.postalCodeFieldSelector);
        const countryInput = document.querySelector(this.options.countryFieldSelector);
        autocomplete.init(
            streetInput,
            cityInput,
            postalCodeInput,
            countryInput,
            this.options.deCountryId,
            this.options.token,
            this.options.hint
        );
    }

}
