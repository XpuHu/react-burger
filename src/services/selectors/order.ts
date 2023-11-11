import { RootState } from '../types';

export const getOrderData = (state: RootState) => state.order.data
export const getOrderRequest = (state: RootState) => state.order.orderRequest
