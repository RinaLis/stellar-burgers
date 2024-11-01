import { deleteCookie, setCookie } from '../../../src/utils/cookie';


describe('тест для страницы конструктора бургера', function() {
    beforeEach(() => {
        setCookie('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTZiMmE2ZDgyOWJlMDAxYzc3Nzg5OCIsImlhdCI6MTczMDI4MDU1NSwiZXhwIjoxNzMwMjgxNzU1fQ.pTD__u6BJdkRr-bz35lXr6VcFqPspLACAjGdEIBF1xs');
        localStorage.setItem('refreshToken', 'e24fe3f2b3d2a401eee510a6206bb9e7831ffbf65fbbb79b934b4b13e4d5c59dcf02dce0662212c6');

        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients'}).as('getIngredients');
        cy.intercept('GET', 'api/auth/user', {fixture: 'user'}).as('getUser');
        cy.intercept('POST', 'api/orders', {fixture: 'order'}).as('addOrder');

        cy.visit('');
        
        cy.wait(['@getUser', '@getIngredients']);
    })
    afterEach(() => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
    })
    it('Тест подгрузки ингредиентов и добавления их в конструктор', () => {
        cy.get('[data-cy="constructor"]').as('constructor');
        
        cy.addIngredient('643d69a5c3f7b9001cfa093d');
        cy.addIngredient('643d69a5c3f7b9001cfa0943');
        cy.addIngredient('643d69a5c3f7b9001cfa0946');
        
        cy.get('@constructor').should('contain', 'Флюоресцентная булка R2-D3');
        cy.get('@constructor').should('contain', 'Соус фирменный Space Sauce');
        cy.get('@constructor').should('contain', 'Хрустящие минеральные кольца');
        
    })
    describe('Тест правильной работы модального окна', function() {
        it('Открытие модального окна ингредиента', () => {
            
            cy.get('[data-cy="modal"]').should('not.exist')
            cy.get('[data-cy="643d69a5c3f7b9001cfa093d"]').first().click();

            cy.get('[data-cy="modal"]').as('modal');
            cy.get('@modal').should('exist');
            cy.get('@modal').should('contain', 'Флюоресцентная булка R2-D3');
            
        })
        it('Закрытие модального окна по крестику', () => {
            cy.get('[data-cy="643d69a5c3f7b9001cfa093d"]').first().click();

            cy.get('[data-cy="modal"]').as('modal');
            cy.get('@modal').should('exist');

            cy.get('[data-cy="modal_close"]').click();
            cy.get('@modal').should('not.exist');
            
        })
        it('Закрытие модального окна по клику на оверлей', () => {
            cy.get('[data-cy="643d69a5c3f7b9001cfa093d"]').first().click();

            cy.get('[data-cy="modal"]').as('modal');
            cy.get('@modal').should('exist');

            cy.get('[data-cy="modal_overlay"]').click(0, 0, {force: true});
            cy.get('@modal').should('not.exist');
            
        })
        it('Закрытие модального окна по клику на Esc', () => {
            cy.get('[data-cy="643d69a5c3f7b9001cfa093d"]').first().click();

            cy.get('[data-cy="modal"]').as('modal');
            cy.get('@modal').should('exist');

            cy.get('body').type('{esc}');
            cy.get('@modal').should('not.exist');
            
        })
    })

    describe('Тест оформления заказа', function() {
        it('Проверка доступности кнопки оформления заказа до добавления ингредиентов и после', () => {
            cy.get('[data-cy="constructor"]').as('constructor');
            cy.get('[data-cy="order_button"]').as('addOrderButton');
            cy.get('@addOrderButton').should('be.disabled');
        
            cy.addIngredient('643d69a5c3f7b9001cfa093d');
            cy.get('@addOrderButton').should('be.disabled');
            cy.addIngredient('643d69a5c3f7b9001cfa0946');
            cy.get('@addOrderButton').should('be.enabled');       
        })
        it('Проверка оформления заказа', () => {
            cy.get('[data-cy="constructor"]').as('constructor');
        
            cy.addIngredient('643d69a5c3f7b9001cfa093d');
            cy.addIngredient('643d69a5c3f7b9001cfa0949');
            cy.addIngredient('643d69a5c3f7b9001cfa0942');
            cy.addIngredient('643d69a5c3f7b9001cfa0941'); 
            
            cy.get('@constructor').should('contain', 'Флюоресцентная булка R2-D3');
            cy.get('@constructor').should('contain', 'Соус Spicy-X');
            cy.get('@constructor').should('contain', 'Мини-салат Экзо-Плантаго');
            cy.get('@constructor').should('contain', 'Биокотлета из марсианской Магнолии');

            cy.get('[data-cy="order_button"]').as('addOrderButton');
            cy.get('@addOrderButton').click();

            cy.get('[data-cy="modal"]').as('modal');
            cy.get('@modal').should('exist');
            cy.get('@modal').should('contain', '58110');

            cy.get('[data-cy="modal_close"]').click();
            cy.get('@modal').should('not.exist');

            cy.get('@constructor').should('not.contain', 'Флюоресцентная булка R2-D3');
            cy.get('@constructor').should('not.contain', 'Соус Spicy-X');
            cy.get('@constructor').should('not.contain', 'Мини-салат Экзо-Плантаго');
            cy.get('@constructor').should('not.contain', 'Биокотлета из марсианской Магнолии');

            cy.get('[data-cy="order_button"]').as('addOrderButton');
            cy.get('@addOrderButton').should('be.disabled');

        })
    })
}); 