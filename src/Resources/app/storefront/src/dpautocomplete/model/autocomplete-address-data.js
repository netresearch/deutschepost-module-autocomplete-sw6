/**
 * See LICENSE.md for license details.
 */

export default class AutocompleteAddressData {

    /**
     * @param {Object} addressData
     *
     * @constructor
     */
    constructor(addressData)
    {
        this.addressData = addressData;
    }

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
        for (var key in this.addressData) {
            if (this.addressData[key].length) {
                return false;
            }
        }

        return true;
    }
}
