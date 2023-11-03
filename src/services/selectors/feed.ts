import { RootState } from '../types';

export const getFeedOrders = (state: RootState) => state.ws.orders
export const getFeedOrdersToday = (state: RootState) => state.ws.totalToday
export const getFeedOrdersTotal = (state: RootState) => state.ws.total
