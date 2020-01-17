/**
 * See LICENSE.md for license details.
 */

export default class ListRenderer {
    /**
     * @param {AutocompleteAddressSuggestions}
     */
    suggestions = {};

    /**
     * @param {string}
     */
    divider = '';

    /**
     * @param {AutocompleteAddressSuggestions} suggestions
     * @param {string} divider
     *
     * @constructor
     */
    constructor(suggestions, divider)
    {
        this.suggestions = suggestions;
        this.divider = divider;
    }

    /**
     * Renders data list as ul
     *
     * @param {HTMLElement} currentField
     */
    render(currentField)
    {
        this.removeDatalist(currentField);
        /** Disable native autocomplete to avoid overlapping suggestions. */
        currentField.setAttribute('autocomplete', 'off');

        const dataList = new Element('ul', {
            'id': 'datalist-' + currentField.id,
            'class' : 'datalist',
            'style' : 'width:' + currentField.offsetWidth + 'px',
        });

        const suggestionOptions = this.suggestions.getAddressSuggestionOptions(this.divider);
        if (suggestionOptions.length > 0) {
            suggestionOptions.each(function (option) {
                var $li = new Element('li', {'id': option.id, 'data-value': option.title});
                $li.update(option.title);
                dataList.insert({bottom: $li});
            });
        }
        currentField.insert({after: dataList});
        currentField.setAttribute('list', 'datalist-' + currentField.id);

        /**
         * Trigger an Item select when a datalist option is clicked.
         */
        dataList.observe('mousedown', function (e) {
            this.itemSelect(e.target, currentField);
        }.bind(this));

        /**
         * Hide the datalist when the field is no longer in focus.
         */
        currentField.observe('focusout', function () {
            this.removeDatalist(currentField);
        }.bind(this));

        /**
         * Add listener to observe address field navigation keydowns.
         */
        currentField.observe('keydown', this.navigationKeyListener.bind(this));
    }

    /**
     * Simulate a datalist element select event.
     *
     * @param {HTMLElement} item
     * @param {HTMLElement} field
     * @private
     */
    itemSelect(item, field)
    {
        field.value = item.dataset.value;
        const event = new Event('autocomplete:datalist-select');
        field.dispatchEvent(event);
        this.removeDatalist(field);
    }

    /**
     * @param {HTMLElement} currentField
     * @return {string}
     */
    getSuggestionUuid(currentField)
    {
        var fieldValue  = currentField.value,
            option      = currentField.next('ul').down('[data-value=\'' + fieldValue + '\']');

        return option.id;
    }

    /**
     * Remove the datalist from the DOM and stop observers.
     *
     * @param {HTMLElement} field
     */
    removeDatalist(field)
    {
        const datalist = document.querySelector('datalist-' + field.id);

        if (datalist) {
            datalist.remove();
        }
        /** It is not possible to stop observing a bound method, so we stop all keydown observers. */
        field.stopObserving('keydown');
    }

    /**
     * Add listener to observe address field navigation keydowns.
     *
     * @param {KeyboardEvent} e
     * @private
     */
    navigationKeyListener(e)
    {
        var isUp = e.key === 'ArrowUp',
            isDown = e.key === 'ArrowDown',
            isEnter = e.key === 'Enter',
            isTab = e.key === 'Tab';
        if (isUp || isDown || isEnter || isTab) {
            if (!isTab) {
                e.preventDefault();
            }
            this.triggerKeydown(e.target, isDown, isUp, isEnter, isTab);
        }
    }

    /**
     * Keyboard navigation for ul
     *
     * @param {HTMLElement} $field
     * @param {boolean} isDown
     * @param {boolean} isUp
     * @param {boolean} isEnter
     * @param {boolean} isTab
     */
    triggerKeydown($field, isDown, isUp, isEnter, isTab)
    {
        const fieldId = $field.id,
            dataList = document.querySelector('datalist-' + fieldId);
        let dataOptions;

        if (!dataList) {
            return;
        }

        dataOptions = dataList.childElements();
        const activeItem = dataList.down('[data-active]'),
            firstItem = dataOptions[0];

        if (!activeItem && isEnter) {
            return;
        }

        if (isDown && !activeItem) {
            firstItem.setAttribute('data-active', 'true');
        } else if (activeItem) {
            let prevVisible = null;
            let nextVisible = null;

            for ( let i = 0; i < dataOptions.length; i++ ) {
                const visItem = dataOptions[i];
                if ( visItem === activeItem ) {
                    prevVisible = dataOptions[i - 1];
                    nextVisible = dataOptions[i + 1];
                    break;
                }
            }
            activeItem.removeAttribute('data-active');

            if (isUp) {
                if (prevVisible) {
                    prevVisible.setAttribute('data-active', 'true');
                    if ( prevVisible.offsetTop < dataList.scrollTop ) {
                        dataList.scrollTop -= prevVisible.offsetHeight;
                    }
                } else {
                    dataOptions[dataOptions.length - 1].setAttribute('data-active', 'true');
                }
            }
            if (isDown) {
                if (nextVisible) {
                    nextVisible.setAttribute('data-active', 'true');
                } else {
                    dataOptions[0].setAttribute('data-active', 'true');
                }
            }

            if (isEnter || isTab) {
                this.itemSelect(activeItem, $field);
            }

            if (isTab) {
                // Focus the current field so the tab command moves the focus to the next input
                $field.focus();
            }
        }
    }
}
