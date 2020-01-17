/**
 * See LICENSE.md for license details.
 */

export default class AutocompleteAddressSuggestions {

    /**
     *
     * @param {Object} data
     * @param {AutocompleteFields} autocompleteFields
     *
     * @constructor
     */
    constructor(data, autocompleteFields)
    {
        this.data = data;
        this.autocompleteFields = autocompleteFields;
    }

    /**
     * Sets suggestion object.
     *
     * @param {Object} data
     *
     */
    setAddressSuggestions(data)
    {
        this.data = data;
    }

    /**
     * Returns suggestion object.
     *
     * @returns {Object}
     *
     */
    getAddressSuggestions()
    {
        return this.data;
    }
    /**
     * Returns suggestion item by Uuid.
     *
     * @param {String} uuid
     *
     * @returns {Object}
     *
     */
    getByUuid(uuid)
    {
        return this.data.filter(function (item) {
            return item.uuid === uuid;
        });
    }

    /**
     * Build datalist options
     *
     * @param {String} divider
     * @return {{id: string, title: string}[]}
     */
    getAddressSuggestionOptions(divider)
    {
        const suggestions = this.getAddressSuggestions(),
            options = [];
        if (suggestions.length > 0) {
            suggestions.forEach(function (suggestionItem) {
                const addressParts = [],
                    option = {};

                // Combine all address items to suggestion string, divided by divider
                this.autocompleteFields.getNames().forEach(function (fieldName) {
                    if (suggestionItem[fieldName] && suggestionItem[fieldName].length) {
                        addressParts.push(suggestionItem[fieldName]);
                    }
                });

                option.id = suggestionItem.uuid;
                option.title = addressParts.join(divider);

                options.push(option);
            }.bind(this));
        }

        return options;
    }
}
