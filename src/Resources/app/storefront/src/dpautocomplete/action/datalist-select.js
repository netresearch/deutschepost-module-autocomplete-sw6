/**
 * See LICENSE.md for license details.
 */

export default class DatalistSelect {
    /**
     * @property {Map<string, string>}
     */
    fields = {};

    /**
     * @property {AutocompleteAddressSuggestions}
     */
    addressSuggestions = {};

    /**
     * @property {Object[]}
     */
    currentSuggestionObject = false;

    /**
     * Initialize.
     *
     * @param {Map<string, string>} fields
     * @param {AutocompleteAddressSuggestions} addressSuggestions
     * @constructor
     */
    constructor(fields, addressSuggestions)
    {
        this.fields          = fields;
        this.addressSuggestions = addressSuggestions;
    }

    /**
     * Returns the selected suggestion object.
     *
     * @returns {boolean|Object}
     */
    getCurrentSuggestion()
    {
        if (this.currentSuggestionObject && this.currentSuggestionObject[0]) {
            return this.currentSuggestionObject[0];
        }

        return false;
    }

    /**
     * Updates all observed fields.
     *
     * @param {string} optionId
     */
    updateFields(optionId)
    {
        const self        = this,
            suggestions = this.addressSuggestions;

        if (optionId) {
            this.currentSuggestionObject = suggestions.getByUuid(optionId);
        }
        console.log(this.currentSuggestionObject);
        if (self.currentSuggestionObject && self.currentSuggestionObject.length) {
            // Fill all fields with response values
            /*self.fields.forEach(function (selector, fieldName) {
                // Get data selector with address item
                const field = document.querySelector(selector);

                if (field && self.currentSuggestionObject[0][fieldName]) {
                    field.value = self.currentSuggestionObject[0][fieldName];
                }
            });*/
        }
    }
}
