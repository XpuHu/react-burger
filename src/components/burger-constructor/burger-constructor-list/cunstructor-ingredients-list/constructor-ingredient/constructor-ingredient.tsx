import style from "./constructor-ingredient.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useRef } from "react";
import { DELETE_INGREDIENT, UPDATE_INGREDIENTS_ORDER } from "../../../../../services/actions/constructor";
import { DECREASE_COUNT } from "../../../../../services/actions/ingredients";
import { useDispatch } from "react-redux";
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from "react-dnd";
import { TConstructorIngredient } from "../../../../../utils/types";

type TConstructorIngredientType = {
    ingredient: TConstructorIngredient,
    ingredientIndex: number
}

type TDragIngredient = {
    ingredientIndex: number
}

const ConstructorIngredient: FC<TConstructorIngredientType> = ({ ingredient, ingredientIndex }) => {

    const ingredientRef = useRef<HTMLDivElement>( null );
    const dispatch = useDispatch();

    const handleClose = (ingredient: TConstructorIngredient) => {
        dispatch( { type: DELETE_INGREDIENT, id: ingredient.id } );
        dispatch( { type: DECREASE_COUNT, id: ingredient._id } );
    };

    const [ { handler }, dropTarget ] = useDrop( {
        accept: 'constructor-ingredient',
        collect: monitor => ({
            handler: monitor.getHandlerId()
        }),
        hover: (ingredient: TDragIngredient, monitor: DropTargetMonitor) => {
            if ( !ingredientRef.current ) {
                return;
            }

            // индекс элемента, который мы переносим
            const dragIndex = ingredient.ingredientIndex;
            // индекс элемента, НА который мы переносим
            const hoverIndex = ingredientIndex;

            if ( dragIndex === hoverIndex ) {
                return;
            }

            // элемент, НА который мы переносим
            const hoverWrapper = ingredientRef.current?.getBoundingClientRect();
            // середина элемента
            const hoverMiddle = (hoverWrapper.bottom - hoverWrapper.top) / 2;
            // позиция мыши
            const mousePosition = monitor.getClientOffset();
            // расстояние от мыши до верха элемента
            const hoverPosition = (mousePosition as XYCoord).y - hoverWrapper.top;

            if ( (dragIndex < hoverIndex && hoverPosition < hoverMiddle)
                || (dragIndex > hoverIndex && hoverPosition > hoverMiddle) ) {
                return;
            }

            // Меняем порядок ингредиентов в стейте
            dispatch( { type: UPDATE_INGREDIENTS_ORDER, dragIndex, hoverIndex } );
            // Меняем местами элементы
            ingredient.ingredientIndex = hoverIndex;
        }
    } );

    const [ { opacity }, dragRef ] = useDrag( {
        type: 'constructor-ingredient',
        item: () => ({
            ingredient, ingredientIndex
        }),
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0 : 1
        })
    } );

    dragRef( dropTarget( ingredientRef ) );

    return (
        <div className={ `${ style.ingredient } mb-4` } ref={ ingredientRef } data-handler-id={ handler }
             style={ { opacity } }
        >
            <DragIcon type="primary" />
            <ConstructorElement
                extraClass={ `${ style.inactive } ml-2` }
                text={ ingredient.name }
                price={ ingredient.price }
                thumbnail={ ingredient.image }
                handleClose={ () => handleClose( ingredient ) }
            />
        </div>
    );
}

export default ConstructorIngredient;