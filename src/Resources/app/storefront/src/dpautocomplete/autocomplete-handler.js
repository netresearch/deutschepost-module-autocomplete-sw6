/**
 * See LICENSE.md for license details.
 */

import AutocompleteAddressSuggestions from './model/autocomplete-address-suggestions';
import AutocompleteAddressData from './model/autocomplete-address-data';
import CountrySelect from './model/country-select';
import DatalistSelect from './action/datalist-select';
import ListRenderer from './view/list-renderer';
import postdirektAutocomplete from '../../node_modules/postdirekt-autocomplete/dist/browser/postdirekt-autocomplete.es';
import 'regenerator-runtime/runtime';

export default class AddressAutocomplete {

    /**
     * @property {int} typingDelay
     */
    typingDelay = 500;

    /**
     * @property {string} timeoutId
     */
    timeoutId = null;

    /**
     * @property {string} addressItemDivider
     */
    addressItemDivider = ', ';

    /**
     * @property {Map<string, string>} addressFields
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
     * @property {ListRenderer} datalistRenderer
     */
    datalistRenderer = {};

    /**
     * @property {DatalistSelect} datalistSelectAction
     */
    datalistSelectAction = {};

    /**
     * @property {CountrySelect} countrySelect
     */
    countrySelect = {};

    /**
     *
     * @property {string} deCountryId
     */
    deCountryId = '';

    /**
     *
     * @property {SearchService}
     */
    searchService;
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
        // this.addressFields = new AutocompleteFields(watchedFields);
        this.addressFields = new Map(watchedFields.map(field => [field.type, field.selector]));
        this.addressSuggestions = new AutocompleteAddressSuggestions(this.addressFields);
        this.addressData = new AutocompleteAddressData();
        this.countrySelect = new CountrySelect(countrySelect, deCountryId);
        this.datalistSelectAction = new DatalistSelect(this.addressFields, this.addressSuggestions);
        this.datalistRenderer = new ListRenderer(this.addressSuggestions, this.addressItemDivider)
    }

    start()
    {
        this.addressFields.forEach(function (selector, type) {
            const fieldItem = document.querySelector(selector);
            fieldItem.setAttribute('data-address-item', type);
            fieldItem.addEventListener('keyup', this.handleFieldKeystroke.bind(this));
            fieldItem.addEventListener('focus', this.handleFieldFocus.bind(this));
            fieldItem.addEventListener('autocomplete:datalist-select', this.handleDatalistSelect.bind(this));
        }.bind(this));

        /*for ongoing tasks*/
        this.removeListOnCountryChange();
        this.addressFields.forEach(function (selector) {
            /** @var {HTMLInputElement} field */
            const field = document.querySelector(selector);
            this.addressData.setDataFromField(field);
        }.bind(this));
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
            /** @var {HTMLInputElement} field */
            const field = e.target;
            if (field) {
                this.addressData.setDataFromField(field);
                this.triggerDelayedCallback(
                    function () {
                        this.searchAction(field)
                    }.bind(this),
                    this.typingDelay
                );
            }
        }
    }

    /**
     * @private
     * @param {FocusEvent} e
     */
    handleFieldFocus(e)
    {
        /** @var {HTMLInputElement} field */
        const field = e.target;
        this.addressData.setDataFromField(field);
    }

    /**
     * @private
     * @param {Event} e
     */
    handleDatalistSelect(e)
    {
        const uuid = this.datalistRenderer.getSuggestionUuid(e.target);
        console.log(uuid);

        // Update all observed fields after item was selected in datalist
        //this.datalistSelectAction.updateFields(uuid);
        //this.selectAction();
    }

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
            ).then(function (response) {
                this.addressSuggestions.setAddressSuggestions(response.addresses);
                /* Only render anything if the input is still active. */
                if (currentField === document.activeElement) {
                    this.datalistRenderer.render(currentField);
                }
            }.bind(this));
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
                this.addressFields.forEach(function (selector) {
                    const field = document.querySelector(selector);
                    this.datalistRenderer.removeDatalist(field);
                }.bind(this));
            }
        }.bind(this));
    }
}
