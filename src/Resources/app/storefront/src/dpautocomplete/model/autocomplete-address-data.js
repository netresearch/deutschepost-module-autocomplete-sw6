/**
 * See LICENSE.md for license details.
 */

export default class AutocompleteAddressData {

    /**
     * @type {{Object}}
     */
    addressData = {};

    /**
     * setAddressData.
     *
     * @param {Object} addressData
     */
    setData(addressData)
    {
        this.addressData = addressData;
    }

    /**
     *
     * @param {HTMLInputElement} field
     */
    setDataFromField(field)
    {
        this.setDataValue(field.getAttribute('data-address-item'), field.value)
    }

    /**
     * setAddressData.
     *
     * @param {String} key
     * @param {String} value
     */
    setDataValue(key, value)
    {
        this.addressData[key] = value;
    }

    /**
     * Returns current address object
     *
     * @returns {Object} addressData
     */
    getData()
    {
        return this.addressData;
    }

    /**
     * Returns TRUE if the object is empty, FALSE if some address data is set.
     *
     * @returns {boolean}
     */
    isEmpty()
    {
        for (const key in this.addressData) {
            if (this.addressData[key].length) {
                return false;
            }
        }

        return true;
    }
}
