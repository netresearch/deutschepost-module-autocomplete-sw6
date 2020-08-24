/// <reference types="Cypress" />
describe('PostdirektAutocompleteCypressTest: Test checkout address', () => {
    it('go to checkout and fill billing address', () => {

        let product = cy.getRandomProductInformationForCheckout().then(product => {
            cy.visit(product.url);
            cy.get('.btn-buy').first().click();

            // Off canvas
            cy.get('.offcanvas.is-open').should('be.visible');

            // Checkout
            cy.get('.offcanvas-cart-actions .btn-primary').click();

            cy.get('.register-card').should('be.visible');
            cy.get('select[name="billingAddress[countryId]"]').select('Germany');
            cy.get('input[name="billingAddress[zipcode]"]').type('042');
            cy.wait(200).then(() => {
                cy.get('#datalist-billingAddressAddressZipcode').should('be.visible');
            });
            cy.get('#datalist-billingAddressAddressZipcode').find('li').first().should('contain', 'Leipzig');
            cy.get('#datalist-billingAddressAddressZipcode').find('li').first().click().then(($li) => {
                let zip = $li.get(0).innerText.split(',')[0];

                cy.get('input[name="billingAddress[zipcode]"]').should('have.value', zip);
                cy.get('input[name="billingAddress[city]"]').should('have.value', 'Leipzig');
            });
        });

    });
});
