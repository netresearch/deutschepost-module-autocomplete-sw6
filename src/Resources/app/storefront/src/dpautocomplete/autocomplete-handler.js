/**
 * See LICENSE.md for license details.
 */

import AutocompleteFields from './model/autocomplete-fields';
import AutocompleteAddressSuggestions from './model/autocomplete-address-suggestions';
import AutocompleteAddressData from './model/autocomplete-address-data';
import FieldInput from './action/field-input';
import CountrySelect from './model/country-select';
//import DatalistSelect from './action/datalist-select';
//import ListRenderer from './view/list-renderer';
//import ExampleData from './model/example-data';
import postdirektAutocomplete from '../../node_modules/postdirekt-autocomplete/dist/browser/postdirekt-autocomplete.es';
import 'regenerator-runtime/runtime';

export default class AddressAutocomplete {

    /**
     * @property {int} typingDelay
     */
    typingDelay = 300;

    /**
     * @property {string} timeoutId
     */
    timeoutId = null;

    /**
     * @property {string} addressItemDivider
     */
    addressItemDivider = ', ';

    /**
     * @property {AutocompleteFields} addressFields
     */
    addressFields = {};


    /**
     * @property {AutocompleteAddressSuggestions} addressSuggestions
     */
    addressSuggestions = {};

    /**
     * @property {AutocompleteAddressData} addressData
     */
    addressData = {};

    /**
     * @property {FieldInput} fieldInputAction
     */
    fieldInputAction = {};

    /**
     * @property {ListRenderer} datalistRenderer
     */
    //datalistRenderer = {};

    /**
     * @property {DatalistSelect} datalistSelectAction
     */
    //datalistSelectAction = {};

    /**
     * @property {CountrySelect} countrySelect
     */
    countrySelect = {};

    /**
     *
     * @property {string} deCountryId
     */
    deCountryId = null;

    /**
     *
     * @property {postdirektAutocomplete}
     */
    searchService = null;
    /**
     *
     * @param {{type: string, selector: string}[]} watchedFields
     * @param {{type: string, selector: string}} countrySelect
     * @param {string} deCountryId
     * @param {string} token
     */
    constructor(watchedFields, countrySelect, deCountryId, token)
    {
        this.token = token;
        this.stopEventPropagation = false;
        this.addressFields = new AutocompleteFields(watchedFields);
        this.addressSuggestions = new AutocompleteAddressSuggestions({}, this.addressFields);
        this.addressData = new AutocompleteAddressData({});
        this.countrySelect = new CountrySelect(countrySelect, deCountryId);
        this.fieldInputAction = new FieldInput(this.addressFields, this.addressData);
        //this.datalistSelectAction = new DatalistSelect(this.addressFields, this.addressSuggestions);
        //this.datalistRenderer = new ListRenderer(this.addressSuggestions, this.addressItemDivider)
    }

    start()
    {
        this.addressFields.getIds().forEach(function (fieldId) {
            const fieldItem = this.addressFields.getFieldById(fieldId);
            fieldItem.setAttribute('data-address-item', fieldId);
            fieldItem.addEventListener('keyup', this.handleFieldKeystroke.bind(this));
            fieldItem.addEventListener('focus', this.handleFieldFocus.bind(this));
            //fieldItem.addEventListener('autocomplete:datalist-select', this.handleDatalistSelect.bind(this));
        }.bind(this));

        /*for ongoing tasks*/
        this.removeListOnCountryChange();
        //this.fieldInputAction.updateAdressData();

        this.searchService = postdirektAutocomplete.createSearchService(this.token);
    }

    /**
     * Handles keystrokes, but does not react to navigation keys.
     * @public
     * @param {KeyboardEvent} e
     */
    handleFieldKeystroke(e)
    {
        const navigatorCodes = ['ArrowUp', 'ArrowDown', 'Escape', 'Enter', 'Space', 'Tab'];

        if (navigatorCodes.indexOf(e.code) === -1) {
            this.fieldInputAction.updateAddressDataFromField(e.target);
            this.triggerDelayedCallback(
                function () {
                    this.searchAction(e.target)
                }.bind(this),
                this.typingDelay
            );
        }
    }

    /**
     * @private
     * @param {FocusEvent} e
     */
    handleFieldFocus(e)
    {
        /** @var {HTMLElement} field */
        const field = e.target;
        this.fieldInputAction.updateAddressDataFromField(field);
    }

    /**
     * @private
     * @param {Event} e
     */
    /*handleDatalistSelect(e)
    {
        const uuid = this.datalistRenderer.getSuggestionUuid(e.target);
        // Update all observed fields after item was selected in datalist
        this.datalistSelectAction.updateFields(uuid);
        this.selectAction();

        // Restore focus to the input element
        (function(target) {
            target.focus();
        }).defer(e.target);
    }*/

    /**
     * Triggers an delayed callback.
     *
     * @private
     * @param {Function} callback Callback to execute after timeout
     * @param {int}      delay    Delay in milliseconds
     */
    triggerDelayedCallback(callback, delay)
    {
        // Clear timeout to prevent previous task from execution
        if (typeof this.timeoutId === 'number') {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = window.setTimeout(
            callback,
            delay
        );
    }

    /**
     * Executes a search request.
     *
     * @private
     * @param {HTMLElement} currentField
     */
    searchAction(currentField)
    {
        console.log(currentField);
        if (this.addressData.isEmpty()) {
            return;
        }

        if (this.countrySelect.isGermany) {
            const data = this.addressData.getData();

            this.searchService.search(
                this.searchService.requestBuilder.create(
                    {
                        country: 'de',
                        subject: postdirektAutocomplete.SearchSubjects.PostalCodesCitiesStreets,
                        combined: Object.values(data).join(' '),
                    }
                )
            ).then(console.log);
        }
    }

    /**
     * Executes a select request.
     *
     * @private
     */
    /*selectAction()
    {
        const selectedSuggestion = this.datalistSelectAction.getCurrentSuggestion();
        if (!selectedSuggestion || !selectedSuggestion.uuid) {
            throw 'Missing required field <uuid>';
        }
        //this.selectRequest.doSelectRequest(selectedSuggestion);
    }*/

    /**
     * Remove all datalists when country is not Germany.
     *
     * @private
     */
    removeListOnCountryChange()
    {
        this.countrySelect.listenOnChange(function (isGermany) {
            if (!isGermany) {
                this.addressFields.getFields().forEach(function (field) {
                    console.log(field);
                    //this.datalistRenderer.removeDatalist(field);
                }.bind(this));
            }
        }.bind(this));
    }
}
