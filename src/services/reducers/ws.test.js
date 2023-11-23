import { wsInitialState as initialState, wsReducer as reducer } from './ws';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from '../constants/ws';

const error = new ErrorEvent( 'ошибка' );
const data = {
    success: true,
    orders: [
        {
            _id: '1',
            ingredients: [ '1', '2' ],
            status: 'created',
            name: 'order 1',
            createdAt: '2023-11-16T10:43:37.307Z',
            updatedAt: '2023-11-16T10:43:37.307Z',
            number: 123
        },
        {
            _id: '2',
            ingredients: [ '4', '2' ],
            status: 'done',
            name: 'order 2',
            createdAt: '2023-10-16T10:43:37.307Z',
            updatedAt: '2023-10-16T10:43:37.307Z',
            number: 111
        }
    ],
    total: 10000,
    totalToday: 10
};

describe( '', () => {
    it( 'should return initial state', () => {
        expect( reducer( undefined, {} ) )
            .toEqual( initialState );
    } );

    it( 'should handle WS_CONNECTION_SUCCESS', () => {
        expect( reducer( initialState, {
            type: WS_CONNECTION_SUCCESS
        } ) )
            .toEqual( {
                ...initialState,
                error: undefined,
                wsConnected: true
            } );
    } );

    it( 'should handle WS_CONNECTION_ERROR', () => {
        expect( reducer( initialState, {
            type: WS_CONNECTION_ERROR,
            payload: error
        } ) )
            .toEqual( {
                ...initialState,
                error,
                wsConnected: false
            } );
    } );

    it( 'should handle WS_CONNECTION_CLOSED', () => {
        expect( reducer( initialState, {
            type: WS_CONNECTION_CLOSED,
            payload: error
        } ) )
            .toEqual( {
                ...initialState,
                error: undefined,
                wsConnected: false
            } );
    } );

    it( 'should handle WS_GET_MESSAGE', () => {
        expect( reducer( initialState, {
            type: WS_GET_MESSAGE,
            payload: data
        } ) )
            .toEqual( {
                ...initialState,
                error: undefined,
                orders: data.orders,
                total: data.total,
                totalToday: data.totalToday
            } );
    } );
} );