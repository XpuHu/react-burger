describe( 'app works correctly with constructor', function () {
    beforeEach( () => {
        cy.intercept( 'GET', 'ingredients', { fixture: 'ingredients' } );
        cy.intercept( 'GET', 'user', { fixture: 'user.json' } );
        cy.intercept( 'POST', 'api/orders', { fixture: 'order.json' } ).as( 'postOrder' );

        cy.visit( 'http://localhost:3000' );

        window.localStorage.setItem( 'refreshToken', JSON.stringify( 'test-refreshToken' ) );
        window.localStorage.setItem( 'accessToken', JSON.stringify( 'test-accessToken' ) );

        cy.get( '[data-test-id=burger-ingredient]' ).as( 'ingredients' );
        cy.get( '@ingredients' ).first().as( 'bun' );
        cy.get( '@ingredients' ).eq( 4 ).as( 'ingredient' );
        cy.get( '[class^=burger-constructor_burgerConstructor__]' ).as( 'constructor' );
    } );

    it( 'should show modal on ingredient click', () => {
        cy.get( '@bun' ).click();
        cy.get( '[data-test-id=ingredient-details]' ).should( 'exist' );
    } );

    it( 'should show modal with details about selected ingredient on click', () => {
        cy.get( '@bun' ).click();

        cy.get( '@bun' ).find( '[class^=burger-ingredient_description__]' ).invoke( 'text' ).then( ( text ) => {
            cy.get( '[data-test-id=ingredient-details]' ).contains( text );
        } );
    } );

    it( 'should hide modal on modal cross click', () => {
        cy.get( '@bun' ).click();

        cy.get( '[data-test-id=ingredient-details]' ).should( 'exist' );

        cy.get( '[class^=modal_close__]' ).click();
        cy.get( '[data-test-id=ingredient-details]' ).should( 'not.exist' );
    } );

    it( 'should drag from ingredients and drop bun on constructor', () => {
        // Переносим первую булку
        cy.get( '@bun' ).as( 'firstBun' ).trigger( 'dragstart' );
        cy.get( '@constructor' ).trigger( 'drop' );
        cy.get( '@firstBun' ).find( '.counter__num' ).contains( '2' );

        cy.get( '@firstBun' ).find( '[class^=burger-ingredient_description__]' ).invoke( 'text' ).then( text => {
            cy.get( '[class^=constructor-ingredients-list_ingredientsList__]' ).not( text );
            cy.get( '.constructor-element__text' ).contains( text );
        } );
        cy.get( '@firstBun' ).find( '[class^=burger-ingredient_price__]' ).invoke( 'text' ).then( text => {
            cy.get( '[class^=constructor-ingredients-list_ingredientsList__]' ).not( text );
            cy.get( '.constructor-element__price' ).contains( text );
        } );

        // Переносим другую булку
        cy.get( '@ingredients' ).eq( 1 ).as( 'secondBun' ).trigger( 'dragstart' );
        cy.get( '@constructor' ).trigger( 'drop' );
        cy.get( '@secondBun' ).find( '.counter__num' ).contains( '2' );
        cy.get( '@firstBun' ).find( '.counter__num' ).should( 'not.exist' );

        cy.get( '@secondBun' ).find( '[class^=burger-ingredient_description__]' ).invoke( 'text' ).then( text => {
            cy.get( '[class^=constructor-ingredients-list_ingredientsList__]' ).not( text );
            cy.get( '.constructor-element__text' ).contains( text );
        } );
        cy.get( '@secondBun' ).find( '[class^=burger-ingredient_price__]' ).invoke( 'text' ).then( text => {
            cy.get( '[class^=constructor-ingredients-list_ingredientsList__]' ).not( text );
            cy.get( '.constructor-element__price' ).contains( text );
        } );


    } );

    it( 'should drag from ingredients and drop ingredient on constructor', () => {
        // Переносим ингредиент
        cy.get( '@ingredient' ).trigger( 'dragstart' );
        cy.get( '@constructor' ).trigger( 'drop' );
        cy.get( '@ingredient' ).find( '.counter__num' ).contains( '1' );

        // Переносим ингредиент ещё раз
        cy.get( '@ingredient' ).trigger( 'dragstart' );
        cy.get( '@constructor' ).trigger( 'drop' );
        cy.get( '@ingredient' ).find( '.counter__num' ).contains( '2' );

        cy.get( '@ingredient' ).find( '[class^=burger-ingredient_description__]' ).invoke( 'text' ).then( text => {
            cy.get( '[class^=constructor-ingredients-list_ingredientsList__]' ).contains( text );
            cy.get( '.constructor-element__text' ).contains( text );
        } );

        cy.get( '@ingredient' ).find( '[class^=burger-ingredient_price__]' ).invoke( 'text' ).then( text => {
            cy.get( '[class^=constructor-ingredients-list_ingredientsList__]' ).contains( text );
            cy.get( '.constructor-element__price' ).contains( text );
        } );
    } );

    it( 'should delete ingredient from constructor', () => {
        // Добавляем два разных ингредиента
        cy.get( '@ingredient' ).as( 'firstIngredient' ).trigger( 'dragstart' );
        cy.get( '@constructor' ).trigger( 'drop' );
        cy.get( '@ingredients' ).eq( 3 ).as( 'secondIngredient' ).trigger( 'dragstart' );
        cy.get( '@constructor' ).trigger( 'drop' );

        // Удаляем второй ингредиент
        cy.get( '@secondIngredient' ).find( '[class^=burger-ingredient_description__]' ).invoke( 'text' ).then( name => {
            cy.get( '.constructor-element' ).contains( name ).parent().as( 'el' );
            cy.get( '@el' ).find( '.constructor-element__action' ).click();
            cy.get( '[class^=constructor-ingredients-list_ingredientsList__]' ).not( name );
        } );

        cy.get( '@firstIngredient' ).find( '.counter__num' ).contains( '1' );
        cy.get( '@secondIngredient' ).find( '.counter__num' ).should( 'not.exist' );
    } );

    it( 'should show order button and correct price when adding ingredients to constructor', () => {
        cy.get( '@ingredient' ).trigger( 'dragstart' );
        cy.get( '@constructor' ).trigger( 'drop' );

        cy.get( '[class^=burger-constructor-total_burgerTotal__]' ).find( 'button' ).as( 'button' ).should( 'exist' );
        cy.get( '@button' ).should( 'not.be.disabled' );

        cy.get( '[class^=burger-constructor-total_burgerTotal__]' ).find( 'span' ).as( 'price' ).should( 'exist' );
        cy.get( '@price' ).should( 'not.contain.text', '0' );

        // Считаем итоговую сумму
        cy.get( '@ingredient' ).find( '[class^=burger-ingredient_price__]' ).invoke( 'text' ).then( text => {
            cy.get( '@price' ).should( 'contain.text', text );
        } );

        // Добавляем булку
        cy.get( '@bun' ).trigger( 'dragstart' );
        cy.get( '@constructor' ).trigger( 'drop' );

        // Считаем итоговую сумму
        cy.get( '@ingredient' ).find( '[class^=burger-ingredient_price__]' ).invoke( 'text' ).then( ingredientPrice => {
            cy.get( '@bun' ).find( '[class^=burger-ingredient_price__]' ).invoke( 'text' ).then( bunPrice => {
                cy.get( '@price' ).should( 'contain.text', bunPrice * 2 + +ingredientPrice );
            } );
        } );
    } );

    it( 'should show order modal when clicking on order button', () => {
        cy.get( '@bun' ).trigger( 'dragstart' );
        cy.get( '@constructor' ).trigger( 'drop' );
        cy.get( '@ingredient' ).trigger( 'dragstart' );
        cy.get( '@constructor' ).trigger( 'drop' );

        cy.get( '[class^=burger-constructor-total_burgerTotal__]' ).find( 'button' ).click();
        cy.get( '[data-test-id=order-details]' ).should( 'exist' );
        cy.get( '[class^=order-details_orderId__]' ).should( 'exist' );

        cy.get( 'body' ).type( '{esc}' );
        cy.get( '[data-test-id=order-details]' ).should( 'not.exist' );
        cy.get( '[class^=burger-constructor-total_burgerTotal__]' ).should( 'not.exist' );
    } );
} );