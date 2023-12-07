import React from "react";
import { useEffect } from "react";
import './style.css'
import PropTypes from "prop-types";

function ProductItem(props){

    useEffect(() => {
        props.closeModalBasket()
    }, [])

    return(
        <div className="ProductItem">
            <p>{props.text}</p>
            <p>Страна производитель: <b>{props.madeIn}</b></p>
            <p>Категория: <b>{props.category}</b></p>
            <p>Год выпуска: <b>{props.edition}</b></p>
            <p className="price">Цена: <b>{props.price} ₽</b></p>
            <button onClick={() => props.addToBasket(props.id)}>Добавить</button>
        </div>
    )
}

ProductItem.propTypes = {
    text: PropTypes.string,
    madeIn: PropTypes.string,
    category: PropTypes.string,
    edition: PropTypes.number,
    price: PropTypes.number,
    id: PropTypes.number,
    closeModalBasket: PropTypes.func,
    addToBasket: PropTypes.func
}
export default React.memo(ProductItem)