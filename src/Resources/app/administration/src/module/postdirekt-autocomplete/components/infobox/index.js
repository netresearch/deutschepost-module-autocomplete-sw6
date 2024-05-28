import template from './infobox.html.twig';
import './infobox.scss';

Shopware.Component.register('infobox', {
    template: template,

    props: {
        logo: {
            type: String,
            required: true,
        },
        version: {
            type: String,
            required: true,
        },
        headerColor: {
            type: String,
            required: true,
        },
        bodyColor: {
            type: String,
            required: true,
        },
    },
    methods: {
        getLogoPath() {
            return "bundles/nrlejpostdirektaddressfactory/static/assets/images/addressfactory-logo.png";
        },
    }
});
