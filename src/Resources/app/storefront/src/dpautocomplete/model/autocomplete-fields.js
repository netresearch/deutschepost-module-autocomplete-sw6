/**
 * See LICENSE.md for license details.
 */

export default class AutocompleteFields {

    /** @var {{type: string, selector: string}[]} fieldDefinitions */
    fieldDefinitions = [];

    /**
     * Initialize.
     *
     * @param {{type: string, selector: string}[]} fieldDefinitions
     *
     * @constructor
     */
    constructor(fieldDefinitions)
    {
        this.fieldDefinitions = fieldDefinitions;
        this.fieldTypes       = fieldDefinitions.map(item => item.type);
        this.fieldSelectors   = fieldDefinitions.map(item => item.selector);
    }

    /**
     * Returns array of all autocomplete field IDs
     *
     * @returns {string[]}
     *
     */
    getIds()
    {
        return this.fieldSelectors;
    }

    /**
     * Returns array of all autocomplete field names
     *
     * @returns {string[]}
     *
     */
    getNames()
    {
        return this.fieldTypes;
    }

    /**
     * Returns array of all autocomplete fields
     *
     * @returns {HTMLElement[]}
     */
    getFields()
    {
        const formFields = [];

        this.fieldSelectors.forEach(function (fieldName) {
            const field = document.querySelector(fieldName);

            if (field) {
                formFields.push(field);
            }
        });

        return formFields;
    }

    /**
     * Returns autocomplete field by name
     *
     * @param {string} type
     *
     * @returns {HTMLElement}
     */
    getFieldByName(type)
    {
        const definition = this.fieldDefinitions.filter(item => item.type === type);
        return document.querySelector(definition.type);
    }

    /**
     *
     * @param selector
     * @return {any}
     */
    getFieldById(selector)
    {
        return document.querySelector(selector);
    }

    /**
     * Returns autocomplete field name by field id
     *
     * @param {string} id
     *
     * @returns {string}
     */
    getNameById(id)
    {
        const field = this.fieldDefinitions.find(item => item.selector === id);

        if (field !== undefined) {
            return field.type;
        }

        return '';
    }
}
