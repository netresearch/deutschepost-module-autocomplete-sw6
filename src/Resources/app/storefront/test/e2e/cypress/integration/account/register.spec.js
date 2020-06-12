/// <reference types="Cypress" />
describe('PostdirektAutocompleteCypressTest: Test registration address', () => {
    afterEach(function () {
        if (this.currentTest.state === 'failed') {
            cy.screenshot(this.currentTest.fullTitle(), {
                capture: 'fullPage'
            });
        }
    });
    it('configure autocomplete plugin', () => {
        cy.login('admin')
            .then(() => {
                cy.setLocaleToEnGb();
            });
        cy.visit('/admin#/sw/plugin/settings/NRLEJPostDirektAutocomplete');
        cy.server();
        cy.route({
            url: '/api/v1/_action/system-config/batch',
            method: 'post'
        }).as('saveData');
        cy.get('.sw-card.sw-system-config__card--0').should('be.visible');
        cy.get('.sw-card.sw-system-config__card--0 .sw-card__title').contains('Deutsche Post Direkt');
        cy.get('.sw-card.sw-system-config__card--1').should('be.visible');
        cy.get('.sw-card.sw-system-config__card--1 .sw-card__title').contains('Autocomplete Settings');
        cy.get('input[name="NRLEJPostDirektAutocomplete.config.active"]').should('be.visible').check();
        cy.get('input[name="NRLEJPostDirektAutocomplete.config.logging"]').should('be.visible');
        cy.get('input[name="NRLEJPostDirektAutocomplete.config.apiUser"]').should('be.visible')
            .clear()
            .type(Cypress.env('AUTOCOMPLETE_USER'));
        cy.get('input[name="NRLEJPostDirektAutocomplete.config.apiPassword"]').should('be.visible')
            .clear()
            .type(Cypress.env('AUTOCOMPLETE_PASSWORD'));
        cy.get('.sw-plugin-config__save-action').click();
        cy.wait('@saveData').then(() => {
            cy.get('.sw-notifications__notification--0 .sw-alert__message').should('be.visible')
                .contains('Configuration has been saved.');
        });
        cy.openUserActionMenu();
        cy.get('.sw-admin-menu__logout-action').click();
    });

    it('test billing address with diff shipping address', () => {
        cy.visit('/account/login');
        cy.get('.register-card').should('be.visible');

        cy.get('#personalSalutation').select('Mr.');
        cy.get('input[name="firstName"]').type('John');
        cy.get('input[name="lastName"]').type('Doe');
        cy.get('select[name="billingAddress[countryId]"]').select('Germany');
        cy.get('input[name="billingAddress[zipcode]"]').type('0422');
        cy.wait(100).then(() => {
            cy.get('#datalist-billingAddressAddressZipcode').should('be.visible');
        });
        cy.get('#datalist-billingAddressAddressZipcode').find('li').first().should('contain', 'Leipzig');
        cy.get('#datalist-billingAddressAddressZipcode').find('li').first().click().then(($li) => {
            let zip = $li.get(0).innerText.split(',')[0];

            cy.get('input[name="billingAddress[zipcode]"]').should('have.value', zip);
            cy.get('input[name="billingAddress[city]"]').should('have.value', 'Leipzig');
        });
        cy.get('input[name="billingAddress[street]"]').type('No');
        cy.get('#datalist-billingAddressAddressStreet').find('li').first().should('contain', 'Non');
        cy.get('#datalist-billingAddressAddressStreet').find('li').first().click().then(($li) => {
            let streetName = $li.get(0).innerText.split(',')[0];

            cy.get('input[name="billingAddress[street]"]').should('have.value', streetName);
        });

        cy.get('input[name="billingAddress[street]"]').type(' 11d');
        cy.get('.custom-control-label').click();
        cy.get('#shippingAddressAddressCountry').select('Germany');
        cy.get('#shippingAddressAddressCity').type('Leipz');
        cy.wait(200).then(() => {
            cy.get('#datalist-shippingAddressAddressCity').should('be.visible');
        });
        cy.get('#datalist-shippingAddressAddressCity').find('li').first().click().then(($li) => {
            let zip = $li.get(0).innerText.split(',')[0];
            cy.get('input[name="shippingAddress[zipcode]"]').should('have.value', zip);
            cy.get('input[name="shippingAddress[city]"]').should('have.value', 'Leipzig');
        });
        cy.get('input[name="shippingAddress[street]"]').type('An');
        cy.get('#datalist-shippingAddressAddressStreet').find('li').first().should('contain', 'An');
        // test keyboard navigation
        cy.get('input[name="shippingAddress[street]"]').type('{downarrow}');

        cy.get('#datalist-shippingAddressAddressStreet').find('[data-active]').then(($li) => {
            let streetName = $li.get(0).innerText.split(',')[0];
            cy.get('input[name="shippingAddress[street]"]').type('{enter}').should('have.value', streetName);
        });
    });
});
