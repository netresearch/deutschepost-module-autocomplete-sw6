/**
 * See LICENSE.md for license details.
 */

export default class FieldInput {

    /**
     * @property {AutocompleteFields} fields
     */
    fields = {};

    /**
     * @property {AutocompleteAddressData} addressData
     */
    addressData = {};

    /**
     * Initialize.
     *
     * @param {AutocompleteFields} fields
     * @param {AutocompleteAddressData} addressData
     *
     * @constructor
     */
    constructor(fields, addressData)
    {
        this.fields     = fields;
        this.addressData   = addressData;
    }

    /**
     * Update the address data model with information from an input element.
     *
     * @param {HTMLElement} field
     */
    updateAddressDataFromField(field)
    {
        const fieldId = field.getAttribute('data-address-item'),
            name    = this.fields.getNameById(fieldId),
            item    = this.fields.getFieldById(fieldId);
        this.addressData.setDataValue(name, item.value);
    }

    /**
     * Update the address data model with information from all input elements.
     */
    updateAdressData()
    {
        this.fields.getFields().forEach(function (field) {
            this.updateAddressDataFromField(field);
        }.bind(this));
    }
}
