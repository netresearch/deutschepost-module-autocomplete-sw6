import template from './api-test-button.html.twig';

const {Mixin} = Shopware;

const AUTOCOMPLETE_API_URL = 'https://autocomplete2.postdirekt.de/autocomplete2/token'

Shopware.Component.register('postdirekt.autocomplete.api-test-button', {
    template: template,

    mixins: [
        Mixin.getByName('notification'),
    ],
    methods: {
        onButtonClick() {
            const username = document.querySelector("[id='NRLEJPostDirektAutocomplete.config.apiUser']").value
            const password = document.querySelector("[id='NRLEJPostDirektAutocomplete.config.apiPassword']").value
            const headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

            fetch(AUTOCOMPLETE_API_URL, {
                method: 'GET',
                headers: headers,
            })
            .then((response) => {
                if (response.ok) {
                    this.createNotificationSuccess({
                        title: this.$t('postdirekt-autocomplete.apiTest.successTitle'),
                        message: this.$t('postdirekt-autocomplete.apiTest.successMessage'),
                    });
                } else {
                    throw new Error(this.$t("postdirekt-autocomplete.apiTest.errorMessage"));
                }
            })
            .catch((error) => {
                this.createNotificationError({
                    title: this.$t('postdirekt-autocomplete.apiTest.errorTitle'),
                    message: error.message,
                });
            });
        }
    }
});
