import React from "react";
import { useEffect } from "react";
import './style.css'
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

export default React.memo(ProductItem)