import { constructorReducer as reducer, initialState } from './constructor';
import {
    ADD_BUN,
    ADD_INGREDIENT,
    CLEAR_CONSTRUCTOR,
    DELETE_BUN,
    DELETE_INGREDIENT,
    SET_TOTAL_PRICE,
    UPDATE_INGREDIENTS_ORDER
} from '../constants/constructor';

const bun = {
    '_id': '60666c42cc7b410027a1a9b1',
    'name': 'Краторная булка N-200i',
    'type': 'bun',
    'proteins': 80,
    'fat': 24,
    'carbohydrates': 53,
    'calories': 420,
    'price': 1255,
    'image': 'https://code.s3.yandex.net/react/code/bun-02.png',
    'image_mobile': 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    'image_large': 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    '__v': 0,
    'id': '123'
};

const ingredient = {
    '_id': '60666c42cc7b410027a1a9b5',
    'name': 'Говяжий метеорит (отбивная)',
    'type': 'main',
    'proteins': 800,
    'fat': 800,
    'carbohydrates': 300,
    'calories': 2674,
    'price': 3000,
    'image': 'https://code.s3.yandex.net/react/code/meat-04.png',
    'image_mobile': 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    'image_large': 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    '__v': 0,
    'id': '456'
};

const constructorIngredientList = [
    bun,
    ingredient
];

describe( 'constructor reducer', () => {
    it( 'should return initial state', () => {
        expect( reducer( undefined, {} ) )
            .toEqual( initialState );
    } );

    it( 'should handle ADD_INGREDIENT', () => {
        expect( reducer( initialState, {
            type: ADD_INGREDIENT,
            ingredient
        } ) )
            .toEqual( {
                ...initialState,
                constructorIngredientList: [ ingredient ]
            } );
    } );

    it( 'should handle DELETE_INGREDIENT', () => {
        expect( reducer( { ...initialState, constructorIngredientList }, {
            type: DELETE_INGREDIENT,
            id: ingredient.id
        } ) )
            .toEqual( {
                ...initialState,
                constructorIngredientList: [ bun ]
            } );
    } );

    it( 'should handle ADD_BUN', () => {
        expect( reducer( initialState, {
            type: ADD_BUN,
            bun
        } ) )
            .toEqual( {
                ...initialState,
                constructorBun: bun
            } );
    } );

    it( 'should handle DELETE_BUN', () => {
        expect( reducer( { ...initialState, constructorBun: bun }, {
            type: DELETE_BUN
        } ) )
            .toEqual( {
                ...initialState,
                constructorBun: null
            } );
    } );

    it( 'should handle SET_TOTAL_PRICE without bun', () => {
        expect( reducer( { ...initialState, constructorIngredientList }, {
            type: SET_TOTAL_PRICE
        } ) )
            .toEqual( {
                ...initialState,
                constructorIngredientList,
                totalPrice: ingredient.price + bun.price
            } );
    } );

    it( 'should handle SET_TOTAL_PRICE with bun', () => {
        expect( reducer( { ...initialState, constructorIngredientList: [ ingredient ], constructorBun: bun }, {
            type: SET_TOTAL_PRICE
        } ) )
            .toEqual( {
                ...initialState,
                constructorIngredientList: [ ingredient ],
                constructorBun: bun,
                totalPrice: ingredient.price + (2 * bun.price)
            } );
    } );

    it( 'should handle UPDATE_INGREDIENTS_ORDER', () => {
        expect( reducer( { ...initialState, constructorIngredientList: [ bun, ingredient ] }, {
            type: UPDATE_INGREDIENTS_ORDER,
            hoverIndex: 0,
            dragIndex: 1
        } ) )
            .toEqual( {
                ...initialState,
                constructorIngredientList: [ ingredient, bun ],
            } );
    } );

    it( 'should handle CLEAR_CONSTRUCTOR', () => {
        expect( reducer( { constructorIngredientList: [ bun, ingredient ], constructorBun: bun, totalPrice: 1000 }, {
            type: CLEAR_CONSTRUCTOR,
        } ) )
            .toEqual( initialState );
    } );
} );
