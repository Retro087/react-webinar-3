import React from "react"
import Item from "../item"
import './style.css'
import Head from "../head"
import List from "../list"
import { formatPrice, getSum } from "../../utils"
import Controls from "../controls"
import PropTypes from "prop-types";

function Cart(props){
    return(
        <div className="Cart">
            <Head title={'Корзина'} openModal={props.openModal}/>
            <div className="Cart-body">
                <List list={props.cart} deleteItem={props.deleteItem}/>
                <div className={props.cart.length ? "Cart-sum" : ''}>
                    {props.cart.length ? <><span>Итого</span><span>{ `${formatPrice(props.totalPrice)} `}</span></> : <div className="Cart-empty">Корзина пуста</div>}
                </div>
            </div>                                                
        </div>
    )
}

Cart.propTypes = {
    openModal: PropTypes.func,
    cart: PropTypes.array,
    totalPrice: PropTypes.number
};

export default React.memo(Cart)