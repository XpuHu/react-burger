import { ingredientsReducer as reducer, initialState } from './ingredients';
import {
    CLEAR_COUNTS,
    DECREASE_COUNT,
    DELETE_CURRENT_INGREDIENT,
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    INCREASE_COUNT,
    SET_CURRENT_INGREDIENT
} from '../constants/ingredients';

const ingredients = [
    {
        '_id': '60666c42cc7b410027a1a9b3',
        'name': 'Филе Люминесцентного тетраодонтимформа',
        'type': 'main',
        'proteins': 44,
        'fat': 26,
        'carbohydrates': 85,
        'calories': 643,
        'price': 988,
        'image': 'https://code.s3.yandex.net/react/code/meat-03.png',
        'image_mobile': 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        'image_large': 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        '__v': 0,
        'count': 0
    },
    {
        '_id': '60666c42cc7b410027a1a9bf',
        'name': 'Сыр с астероидной плесенью',
        'type': 'main',
        'proteins': 84,
        'fat': 48,
        'carbohydrates': 420,
        'calories': 3377,
        'price': 4142,
        'image': 'https://code.s3.yandex.net/react/code/cheese.png',
        'image_mobile': 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
        'image_large': 'https://code.s3.yandex.net/react/code/cheese-large.png',
        '__v': 0,
        'count': 0
    },
    {
        '_id': '60666c42cc7b410027a1a9b2',
        'name': 'Флюоресцентная булка R2-D3',
        'type': 'bun',
        'proteins': 44,
        'fat': 26,
        'carbohydrates': 85,
        'calories': 643,
        'price': 988,
        'image': 'https://code.s3.yandex.net/react/code/bun-01.png',
        'image_mobile': 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        'image_large': 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        '__v': 0,
        'count': 0
    }
];

const ingredient = {
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
    '__v': 0
};

const stateWithIngredients = {
    ...initialState,
    ingredients
};

const ingredientsWithCount = ingredients.map( ingredient => ({
    ...ingredient,
    count: 2
}) );

const stateIngredientsWithCount = {
    ...initialState,
    ingredients: ingredientsWithCount
};

describe( 'ingredients reducer', () => {
    it( 'should return initial state', () => {
        expect( reducer( undefined, {} ) )
            .toEqual( initialState );
    } );

    it( 'should handle GET_INGREDIENTS_REQUEST', () => {
        expect( reducer( initialState, {
            type: GET_INGREDIENTS_REQUEST
        } ) )
            .toEqual( {
                ...initialState,
                ingredientsRequest: true,
                ingredientsFailed: false
            } );
    } );

    it( 'should handle GET_INGREDIENTS_SUCCESS', () => {
        expect( reducer( initialState, {
            type: GET_INGREDIENTS_SUCCESS,
            ingredients
        } ) )
            .toEqual( {
                ...initialState,
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients
            } );
    } );

    it( 'should handle GET_INGREDIENTS_ERROR', () => {
        expect( reducer( initialState, {
            type: GET_INGREDIENTS_ERROR
        } ) )
            .toEqual( {
                ...initialState,
                ingredientsRequest: false,
                ingredientsFailed: true,
                ingredients: []
            } );
    } );

    it( 'should handle SET_CURRENT_INGREDIENT', () => {
        expect( reducer( initialState, {
            type: SET_CURRENT_INGREDIENT,
            ingredient
        } ) )
            .toEqual( {
                ...initialState,
                currentIngredient: ingredient
            } );
    } );

    it( 'should handle DELETE_CURRENT_INGREDIENT', () => {
        expect( reducer( initialState, {
            type: DELETE_CURRENT_INGREDIENT
        } ) )
            .toEqual( {
                ...initialState,
                currentIngredient: null
            } );
    } );

    it( 'should handle INCREASE_COUNT if bun', () => {
        expect( reducer( stateWithIngredients, {
            type: INCREASE_COUNT,
            id: '60666c42cc7b410027a1a9b2'
        } ) )
            .toEqual( {
                ...stateWithIngredients,
                ingredients: [
                    {
                        '_id': '60666c42cc7b410027a1a9b3',
                        'name': 'Филе Люминесцентного тетраодонтимформа',
                        'type': 'main',
                        'proteins': 44,
                        'fat': 26,
                        'carbohydrates': 85,
                        'calories': 643,
                        'price': 988,
                        'image': 'https://code.s3.yandex.net/react/code/meat-03.png',
                        'image_mobile': 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
                        'image_large': 'https://code.s3.yandex.net/react/code/meat-03-large.png',
                        '__v': 0,
                        'count': 0
                    },
                    {
                        '_id': '60666c42cc7b410027a1a9bf',
                        'name': 'Сыр с астероидной плесенью',
                        'type': 'main',
                        'proteins': 84,
                        'fat': 48,
                        'carbohydrates': 420,
                        'calories': 3377,
                        'price': 4142,
                        'image': 'https://code.s3.yandex.net/react/code/cheese.png',
                        'image_mobile': 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
                        'image_large': 'https://code.s3.yandex.net/react/code/cheese-large.png',
                        '__v': 0,
                        'count': 0
                    },
                    {
                        '_id': '60666c42cc7b410027a1a9b2',
                        'name': 'Флюоресцентная булка R2-D3',
                        'type': 'bun',
                        'proteins': 44,
                        'fat': 26,
                        'carbohydrates': 85,
                        'calories': 643,
                        'price': 988,
                        'image': 'https://code.s3.yandex.net/react/code/bun-01.png',
                        'image_mobile': 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                        'image_large': 'https://code.s3.yandex.net/react/code/bun-01-large.png',
                        '__v': 0,
                        'count': 2
                    }
                ]
            } );
    } );

    it( 'should handle INCREASE_COUNT if not bun', () => {
        expect( reducer( stateWithIngredients, {
            type: INCREASE_COUNT,
            id: '60666c42cc7b410027a1a9b3'
        } ) )
            .toEqual( {
                ...stateWithIngredients,
                ingredients: [
                    {
                        '_id': '60666c42cc7b410027a1a9b3',
                        'name': 'Филе Люминесцентного тетраодонтимформа',
                        'type': 'main',
                        'proteins': 44,
                        'fat': 26,
                        'carbohydrates': 85,
                        'calories': 643,
                        'price': 988,
                        'image': 'https://code.s3.yandex.net/react/code/meat-03.png',
                        'image_mobile': 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
                        'image_large': 'https://code.s3.yandex.net/react/code/meat-03-large.png',
                        '__v': 0,
                        'count': 1
                    },
                    {
                        '_id': '60666c42cc7b410027a1a9bf',
                        'name': 'Сыр с астероидной плесенью',
                        'type': 'main',
                        'proteins': 84,
                        'fat': 48,
                        'carbohydrates': 420,
                        'calories': 3377,
                        'price': 4142,
                        'image': 'https://code.s3.yandex.net/react/code/cheese.png',
                        'image_mobile': 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
                        'image_large': 'https://code.s3.yandex.net/react/code/cheese-large.png',
                        '__v': 0,
                        'count': 0
                    },
                    {
                        '_id': '60666c42cc7b410027a1a9b2',
                        'name': 'Флюоресцентная булка R2-D3',
                        'type': 'bun',
                        'proteins': 44,
                        'fat': 26,
                        'carbohydrates': 85,
                        'calories': 643,
                        'price': 988,
                        'image': 'https://code.s3.yandex.net/react/code/bun-01.png',
                        'image_mobile': 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                        'image_large': 'https://code.s3.yandex.net/react/code/bun-01-large.png',
                        '__v': 0,
                        'count': 0
                    }
                ]
            } );
    } );

    it( 'should handle DECREASE_COUNT if bun', () => {
        expect( reducer( stateIngredientsWithCount, {
            type: DECREASE_COUNT,
            id: '60666c42cc7b410027a1a9b2'
        } ) )
            .toEqual( {
                ...stateIngredientsWithCount,
                ingredients: [
                    {
                        '_id': '60666c42cc7b410027a1a9b3',
                        'name': 'Филе Люминесцентного тетраодонтимформа',
                        'type': 'main',
                        'proteins': 44,
                        'fat': 26,
                        'carbohydrates': 85,
                        'calories': 643,
                        'price': 988,
                        'image': 'https://code.s3.yandex.net/react/code/meat-03.png',
                        'image_mobile': 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
                        'image_large': 'https://code.s3.yandex.net/react/code/meat-03-large.png',
                        '__v': 0,
                        'count': 2
                    },
                    {
                        '_id': '60666c42cc7b410027a1a9bf',
                        'name': 'Сыр с астероидной плесенью',
                        'type': 'main',
                        'proteins': 84,
                        'fat': 48,
                        'carbohydrates': 420,
                        'calories': 3377,
                        'price': 4142,
                        'image': 'https://code.s3.yandex.net/react/code/cheese.png',
                        'image_mobile': 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
                        'image_large': 'https://code.s3.yandex.net/react/code/cheese-large.png',
                        '__v': 0,
                        'count': 2
                    },
                    {
                        '_id': '60666c42cc7b410027a1a9b2',
                        'name': 'Флюоресцентная булка R2-D3',
                        'type': 'bun',
                        'proteins': 44,
                        'fat': 26,
                        'carbohydrates': 85,
                        'calories': 643,
                        'price': 988,
                        'image': 'https://code.s3.yandex.net/react/code/bun-01.png',
                        'image_mobile': 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                        'image_large': 'https://code.s3.yandex.net/react/code/bun-01-large.png',
                        '__v': 0,
                        'count': 0
                    }
                ]
            } );
    } );

    it( 'should handle DECREASE_COUNT if not bun', () => {
        expect( reducer( stateIngredientsWithCount, {
            type: DECREASE_COUNT,
            id: '60666c42cc7b410027a1a9b3'
        } ) )
            .toEqual( {
                ...stateIngredientsWithCount,
                ingredients: [
                    {
                        '_id': '60666c42cc7b410027a1a9b3',
                        'name': 'Филе Люминесцентного тетраодонтимформа',
                        'type': 'main',
                        'proteins': 44,
                        'fat': 26,
                        'carbohydrates': 85,
                        'calories': 643,
                        'price': 988,
                        'image': 'https://code.s3.yandex.net/react/code/meat-03.png',
                        'image_mobile': 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
                        'image_large': 'https://code.s3.yandex.net/react/code/meat-03-large.png',
                        '__v': 0,
                        'count': 1
                    },
                    {
                        '_id': '60666c42cc7b410027a1a9bf',
                        'name': 'Сыр с астероидной плесенью',
                        'type': 'main',
                        'proteins': 84,
                        'fat': 48,
                        'carbohydrates': 420,
                        'calories': 3377,
                        'price': 4142,
                        'image': 'https://code.s3.yandex.net/react/code/cheese.png',
                        'image_mobile': 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
                        'image_large': 'https://code.s3.yandex.net/react/code/cheese-large.png',
                        '__v': 0,
                        'count': 2
                    },
                    {
                        '_id': '60666c42cc7b410027a1a9b2',
                        'name': 'Флюоресцентная булка R2-D3',
                        'type': 'bun',
                        'proteins': 44,
                        'fat': 26,
                        'carbohydrates': 85,
                        'calories': 643,
                        'price': 988,
                        'image': 'https://code.s3.yandex.net/react/code/bun-01.png',
                        'image_mobile': 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                        'image_large': 'https://code.s3.yandex.net/react/code/bun-01-large.png',
                        '__v': 0,
                        'count': 2
                    }
                ]
            } );
    } );

    it( 'should handle CLEAR_COUNTS', () => {
        expect( reducer( stateIngredientsWithCount, {
            type: CLEAR_COUNTS
        } ) )
            .toEqual( {
                ...initialState,
                ingredients
            } );
    } );
} );