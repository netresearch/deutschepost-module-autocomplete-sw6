import template from './api-test-button.html.twig';

const {Mixin} = Shopware;

const AUTOCOMPLETE_API_URL = 'https://autocomplete2.postdirekt.de/autocomplete2/token'

Shopware.Component.register('postdirekt.autocomplete.api-test-button', {
    template: template,

    mixins: [
        Mixin.getByName('notification'),
    ],
    methods: {
        getSystemConfig() {
            let p = this.$parent;
            while (p) {
                if (p.$options?.name === 'sw-system-config') {
                    return p;
                }
                p = p.$parent;
            }
            return null;
        },
        getConfigValue(configData, key) {
            return (configData[null] && configData[null][key]) || configData[key];
        },
        onButtonClick() {
            const sysConfig = this.getSystemConfig();
            if (!sysConfig) {
                console.error('Failed retrieving config field values. Make sure the button\'s nested inside a sw-system-config component.');
                return;
            }
            
            const username = this.getConfigValue(sysConfig.actualConfigData, 'NRLEJPostDirektAutocomplete.config.apiUser');
            const password = this.getConfigValue(sysConfig.actualConfigData, 'NRLEJPostDirektAutocomplete.config.apiPassword');
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
