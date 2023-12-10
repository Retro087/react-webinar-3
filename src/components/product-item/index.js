import React from "react";
import { useEffect } from "react";
import './style.css'
import PropTypes from "prop-types";
import Preloader from "../assets/preloader";
import { translater } from "../../utils";

function ProductItem(props){
    
    useEffect(() => {
        props.closeModalBasket()
    }, [props.productData._id])
    
    if(!props.productData.description || props.isLoading){
        return <Preloader lang={props.lang}/>
    }

    return(
        <div className="ProductItem">   
            <p>{props.productData.description}</p>
            <p>{translater('Страна производитель', props.lang)}: <b>{props.productData.madeIn.title}</b></p>
            <p>{translater('Категория', props.lang)}: <b>{props.productData.category.title}</b></p>
            <p>{translater('Год выпуска', props.lang)}: <b>{props.productData.edition}</b></p>
            <p className="price">{translater('Цена', props.lang)}: <b>{props.productData.price} ₽</b></p>
            <button onClick={() => props.addToBasket(props.productData._id)}>{translater('Добавить', props.lang)}</button>
        </div>
    )   
    
}

ProductItem.propTypes = {
    productData: PropTypes.object,
    closeModalBasket: PropTypes.func,
    addToBasket: PropTypes.func,
    lang: PropTypes.string
}
export default React.memo(ProductItem)