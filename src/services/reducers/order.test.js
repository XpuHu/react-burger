import { initialState, orderReducer as reducer } from './order';
import { GET_ORDER_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from '../constants/order';

const data = {
    name: 'order name',
    number: 111
};

describe( 'order reducer', () => {
    it( 'should return initial state', () => {
        expect( reducer( undefined, {} ) )
            .toEqual( initialState );
    } );

    it( 'should handle GET_ORDER_REQUEST', () => {
        expect( reducer( initialState, {
            type: GET_ORDER_REQUEST
        } ) )
            .toEqual( {
                ...initialState,
                orderRequest: true,
                orderFailed: false
            } );
    } );

    it( 'should handle GET_ORDER_SUCCESS', () => {
        expect( reducer( initialState, {
            type: GET_ORDER_SUCCESS,
            data
        } ) )
            .toEqual( {
                ...initialState,
                orderRequest: false,
                orderFailed: false,
                data
            } );
    } );

    it( 'should handle GET_ORDER_ERROR', () => {
        expect( reducer( initialState, {
            type: GET_ORDER_ERROR
        } ) )
            .toEqual( {
                ...initialState,
                orderRequest: false,
                orderFailed: true
            } );
    } );
} );