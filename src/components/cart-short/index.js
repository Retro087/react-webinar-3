import React from "react";
import './style.css'
import { formatPrice, getSum, plural } from "../../utils";
import PropTypes from "prop-types";

function CartShort(props) {
    return(
        <div className="CartShort">
            <div className="CartShort-text">
                В корзине: 
                 {props.cart.length ? <b>{` ${props.cart.length} ${plural(props.cart.length, {one: 'товар', few: 'товара', many: 'товаров'})} / ${formatPrice(props.totalPrice)}`}</b> : <b>{' пусто'}</b>}
            </div>
            <button onClick={() => props.openModal()}>Перейти</button>
        </div>
 
    )
}

CartShort.propTypes = {
    openModal: PropTypes.func,
    cart: PropTypes.array,
    totalPrice: PropTypes.number,
};

export default React.memo(CartShort)