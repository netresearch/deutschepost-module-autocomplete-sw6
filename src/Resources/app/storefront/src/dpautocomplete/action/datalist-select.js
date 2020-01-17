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
     * @property {Object}
     */
    currentSuggestionObject = {};

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
        if (this.currentSuggestionObject.uuid) {
            return this.currentSuggestionObject;
        }

        return false;
    }

    /**
     * Updates all observed fields.
     *
     * @param {string} optionId
     * @param {AutocompleteAddressData} addressData
     */
    updateFields(optionId, addressData)
    {
        const self = this,
            suggestions = this.addressSuggestions;

        if (optionId) {
            this.currentSuggestionObject = suggestions.getByUuid(optionId);
        }
        if (self.currentSuggestionObject.uuid) {
            // Fill all fields with response values
            self.fields.forEach(function (selector, fieldName) {
                // Get data selector with address item
                const field = document.querySelector(selector);

                if (field && self.currentSuggestionObject[fieldName]) {
                    field.value = self.currentSuggestionObject[fieldName];
                    addressData.setDataFromField(field);
                }
            });
        }
    }
}
