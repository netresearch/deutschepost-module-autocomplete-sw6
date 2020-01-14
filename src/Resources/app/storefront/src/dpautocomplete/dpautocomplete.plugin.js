/**
 * See LICENSE.md for license details.
 */

import Plugin from 'src/plugin-system/plugin.class';

export default class DPAutocompletePlugin extends Plugin {
    static options = {
        token: null,
        fields: [],
    };

    init()
    {
        this.options.fields.forEach(function (field) {
            console.log(field);
            const input = document.querySelector(field.selector);
            input.addEventListener('change', function () {
                console.log(this.options.fields);
            }.bind(this));
        }.bind(this));
    }
}
