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
    message?: string
}

export type TUserData = {
    email: string,
    password: string,
    firstName: string
}

export type TAuthData = Omit<TUserData, 'firstName'>