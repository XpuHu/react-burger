import { store } from "../store";
import { TIngredientsActions } from "../actions/ingredients";
import { TConstructorActions } from "../actions/constructor";
import { TOrderActions } from "../actions/order";
import { TAuthActions } from "../actions/auth";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

// Типизация action'ов
type TApplicationActions = TIngredientsActions | TConstructorActions | TOrderActions | TAuthActions

export type RootState = ReturnType<typeof store.getState>

// Типизация thunk'ов
// export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;

// Типизация dispatch
// export type AppDispatch = Dispatch<TApplicationActions>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;