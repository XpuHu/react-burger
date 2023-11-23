describe( 'app works correctly with routes', function () {
    before( () => {
        cy.intercept( 'GET', 'ingredients', { fixture: 'ingredients' } );
        cy.intercept( 'GET', 'user', { fixture: 'user.json' } );
        // cy.intercept( 'POST', 'orders', { fixture: 'order.json' } ).as( 'postOrder' );

        cy.visit( 'http://localhost:3000' );

        window.localStorage.setItem(
            'refreshToken',
            JSON.stringify( 'test-refreshToken' )
        );
        window.localStorage.setItem(
            'accessToken',
            JSON.stringify( 'test-accessToken' )
        );
    } );

    it( 'should open constructor page by default', () => {
        cy.contains( 'Соберите бургер' );
    } );
} );