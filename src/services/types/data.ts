export type TIngredient = {
    _id: string,
    calories: number,
    carbohydrates: number,
    fat: number,
    image: string,
    image_large: string,
    image_mobile: string,
    name: string,
    price: number,
    proteins: number,
    type: string
}

export type TConstructorIngredient = TIngredient & { id: string }

export type TIngredientWithCount = TIngredient & { count: number }

export type TOrder = {
    name: string,
    number: number
}

export type TResponse = {
    success: boolean,
    message?: string,
    data?: any
}

export type TResponseWithUser = TResponse & { user: TUserData }

export type TResponseWithToken = TResponse & TToken

export type TResponseWithUserToken = TResponseWithUser & TToken

export type TUserData = {
    email: string,
    password: string,
    name: string
}

export type TAuthData = Omit<TUserData, 'name'>

export type TToken = {
    accessToken: string,
    refreshToken: string
}

export type TForm = {
    [key: string]: string
}

export type TFeedOrder = {
    _id: string,
    ingredients: Array<string>,
    status: OrderStatus,
    name: string,
    createdAt: string,
    updatedAt: string,
    number: number
}

export enum OrderStatus {
    created = 'created',
    pending = 'pending',
    done = 'done'
}

export type TFeedMessage = {
    success: boolean,
    orders: Array<TFeedOrder>,
    total: number,
    totalToday: number
}