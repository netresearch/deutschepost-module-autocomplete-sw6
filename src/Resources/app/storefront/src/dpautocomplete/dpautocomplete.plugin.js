/**
 * See LICENSE.md for license details.
 */

import Plugin from 'src/plugin-system/plugin.class';

export default class DPAutocompletePlugin extends Plugin {
    static options = {
        token: null,
        fields: [],
        countries: [],
    };

    init()
    {

        this.options.fields.forEach(function (field) {
            const input = document.querySelector(field.selector);
            this.registerEvents(input);
        }.bind(this));
    }

    /**
     * @param {HTMLElement}element
     */
    registerEvents(element)
    {
        element.addEventListener('change', function () {
            this.handle();
        }.bind(this));
    }

    handle()
    {
        this.getSearchString(this.getFieldValues(this.options.fields));
    }

    /**
     *
     * @param fields
     * @return {[]}
     */
    getFieldValues(fields)
    {
        const addressData = [];
        fields.forEach(function (field) {
            const value = document.querySelector(field.selector).value;
            if (field.type !== 'country') {
                addressData.push(value);
            }
        });

        return addressData;
    }

    /**
     *
     * @param {string[]} addressData
     * @return {string}
     */
    getSearchString(addressData)
    {
        console.log(addressData.join(' '));
        return addressData.join(' ');
    }
}
