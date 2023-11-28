import React from "react";
import './style.css'
import { getSum, plural } from "../../utils";

function CartShort(props) {
    return(
        <div className="CartShort">
            <div className="CartShort-text">
                В корзине: 
                 {props.cart.length ? <b>{` ${props.cart.length} ${plural(props.cart.length, {one: 'товар', few: 'товара', many: 'товаров'})} / ${getSum(props.cart)} ₽`}</b> : <b>{' пусто'}</b>}
            </div>
            <button onClick={() => props.openModal()}>Перейти</button>
        </div>
 
    )
}

CartShort.propTypes = {
    openModal: PropTypes.func,
    cart: PropTypes.array
};

export default React.memo(CartShort)