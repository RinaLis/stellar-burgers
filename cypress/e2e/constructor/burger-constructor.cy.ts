import { deleteCookie, setCookie } from '../../../src/utils/cookie';

const testId = {
    bun: {
        id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3'
    },
    ingredients: [
        {
            id: '643d69a5c3f7b9001cfa0943',
            name: 'Соус фирменный Space Sauce'
        },
        {
            id: '643d69a5c3f7b9001cfa0946',
            name: 'Хрустящие минеральные кольца'
        },
    ]
}

const testOrder = {
    bun: {
        id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3'
    },
    ingredients: [
        {
            id: '643d69a5c3f7b9001cfa0949',
            name: 'Мини-салат Экзо-Плантаго'
        },
        {
            id: '643d69a5c3f7b9001cfa0942',
            name: 'Соус Spicy-X'
        },
        {
            id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии'
        },
    ]
}

describe('тест для страницы конструктора бургера', function() {
    beforeEach(() => {
        setCookie('accessToken', `Bearer ${Cypress.env('accessToken')}`);
        localStorage.setItem('refreshToken', Cypress.env('refreshToken'));

        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients'}).as('getIngredients');
        cy.intercept('GET', 'api/auth/user', {fixture: 'user'}).as('getUser');

        cy.visit('');
        
        cy.wait(['@getUser', '@getIngredients']);
    })
    afterEach(() => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
    })
    it('Тест подгрузки ингредиентов и добавления их в конструктор', () => {
        cy.get('[data-cy="constructor"]').as('constructor');
        
        cy.addIngredient(testId.bun.id);
        cy.addIngredient(testId.ingredients[0].id);
        cy.addIngredient(testId.ingredients[1].id);
        
        cy.get('@constructor').should('contain', testId.bun.name);
        cy.get('@constructor').should('contain', testId.ingredients[0].name);
        cy.get('@constructor').should('contain', testId.ingredients[1].name);
        
    })
    describe('Тест правильной работы модального окна', function() {
        it('Открытие модального окна ингредиента', () => {
            
            cy.get('[data-cy="modal"]').should('not.exist')
            cy.get(`[data-cy="${testId.bun.id}"]`).first().click();

            cy.get('[data-cy="modal"]').as('modal');
            cy.get('@modal').should('exist');
            cy.get('@modal').should('contain', testId.bun.name);
            
        })
        it('Закрытие модального окна по крестику', () => {
            cy.get(`[data-cy="${testId.bun.id}"]`).first().click();

            cy.get('[data-cy="modal"]').as('modal');
            cy.get('@modal').should('exist');

            cy.get('[data-cy="modal_close"]').click();
            cy.get('@modal').should('not.exist');
            
        })
        it('Закрытие модального окна по клику на оверлей', () => {
            cy.get(`[data-cy="${testId.bun.id}"]`).first().click();

            cy.get('[data-cy="modal"]').as('modal');
            cy.get('@modal').should('exist');

            cy.get('[data-cy="modal_overlay"]').click(0, 0, {force: true});
            cy.get('@modal').should('not.exist');
            
        })
        it('Закрытие модального окна по клику на Esc', () => {
            cy.get(`[data-cy="${testId.bun.id}"]`).first().click();

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
        
            cy.addIngredient(testOrder.bun.id);
            cy.get('@addOrderButton').should('be.disabled');
            cy.addIngredient(testOrder.ingredients[0].id);
            cy.get('@addOrderButton').should('be.enabled');       
        })
        it('Проверка оформления заказа', () => {
            cy.get('[data-cy="constructor"]').as('constructor');
        
            cy.addIngredient(testOrder.bun.id);
            cy.addIngredient(testOrder.ingredients[0].id);
            cy.addIngredient(testOrder.ingredients[1].id);
            cy.addIngredient(testOrder.ingredients[2].id); 
            
            cy.get('@constructor').should('contain', testOrder.bun.name);
            cy.get('@constructor').should('contain', testOrder.ingredients[0].name);
            cy.get('@constructor').should('contain', testOrder.ingredients[1].name);
            cy.get('@constructor').should('contain', testOrder.ingredients[2].name);

            cy.get('[data-cy="order_button"]').as('addOrderButton');
            cy.get('@addOrderButton').click();
            cy.intercept('POST', 'api/orders', {fixture: 'order'}).as('addOrder');
            cy.wait('@addOrder').then(({request}) => {
                expect(request.headers.authorization).to.eq(`Bearer ${Cypress.env('accessToken')}`);
                expect(request.body.ingredients).to.have.length(5);
                expect(request.body.ingredients[0]).to.eq(testOrder.bun.id);
                expect(request.body.ingredients[1]).to.eq(testOrder.ingredients[0].id)
                expect(request.body.ingredients[2]).to.eq(testOrder.ingredients[1].id)
                expect(request.body.ingredients[3]).to.eq(testOrder.ingredients[2].id)
                expect(request.body.ingredients[4]).to.eq(testOrder.bun.id)
              })

            cy.get('[data-cy="modal"]').as('modal');
            cy.get('@modal').should('exist');
            cy.get('@modal').should('contain', '58110');

            cy.get('[data-cy="modal_close"]').click();
            cy.get('@modal').should('not.exist');

            cy.get('@constructor').should('not.contain', testOrder.bun.name);
            cy.get('@constructor').should('not.contain', testOrder.ingredients[0].name);
            cy.get('@constructor').should('not.contain', testOrder.ingredients[1].name);
            cy.get('@constructor').should('not.contain', testOrder.ingredients[2].name);

            cy.get('[data-cy="order_button"]').as('addOrderButton');
            cy.get('@addOrderButton').should('be.disabled');

        })
    })
}); 