import PropTypes from "prop-types";

export const ingredientType = {
    ingredientType: PropTypes.shape( {
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number,
    } ),
};

export const ingredientsType = {
    ingredients: PropTypes.arrayOf( ingredientType.ingredientType ),
};

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
};

export type TConstructorIngredient = TIngredient & { id: string };

export type TOrder = {
    name: string,
    number: number
}