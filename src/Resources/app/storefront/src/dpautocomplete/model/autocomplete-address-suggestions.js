/**
 * See LICENSE.md for license details.
 */

export default class AutocompleteAddressSuggestions {

    /**
     *
     * @type {Object[]}
     */
    suggestions = [];

    /**
     * @param {Map<string,string>} autocompleteFields
     *
     * @constructor
     */
    constructor( autocompleteFields)
    {
        this.autocompleteFields = autocompleteFields;
    }

    /**
     * Sets suggestion object.
     *
     * @param {Object[]} suggestions
     *
     */
    setAddressSuggestions(suggestions)
    {
        this.suggestions = suggestions;
    }

    /**
     * Returns suggestion object.
     *
     * @returns {Object[]}
     *
     */
    getAddressSuggestions()
    {
        return this.suggestions;
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
        return this.suggestions.find(item => item.uuid === uuid);
    }

    /**
     * Build datalist options
     *
     * @param {String} divider
     * @return {{id: string, title: string}[]}
     */
    getAddressSuggestionOptions(divider)
    {
        if (this.suggestions.length > 0) {
            return this.suggestions.map(function (suggestionItem) {
                const addressParts = [];

                // Combine all address items to suggestion string, divided by divider
                this.autocompleteFields.forEach(function (selector, fieldName) {
                    if (suggestionItem[fieldName] && suggestionItem[fieldName].length) {
                        addressParts.push(suggestionItem[fieldName]);
                    }
                });

                return {
                    id: suggestionItem.uuid,
                    title: addressParts.join(divider),
                };

            }.bind(this));
        }

        return [];
    }
}
