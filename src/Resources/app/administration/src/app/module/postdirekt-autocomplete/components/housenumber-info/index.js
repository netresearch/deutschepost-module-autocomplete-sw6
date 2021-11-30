import template from './housenumber-info.html.twig';
import '../infobox/infobox.scss';

Shopware.Component.register('housenumberinfo', {
    template: template,

    props: {
        bodyColor: {
            type: String,
            required: true,
        },
    },
});
