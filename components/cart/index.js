import React from "react"
import Item from "../item"
import './style.css'
import Head from "../head"
import List from "../list"
import { getSum } from "../../utils"
import Controls from "../controls"

function Cart(props){
    return(
        <div className="Cart">
            <div className="Cart-back">
                <div className="Cart-centered">
                    <div className="Cart-modal">
                        <Head title={'Корзина'} openModal={props.openModal}/>
                        <div className="Cart-body">
                            <List list={props.cart} deleteItem={props.deleteItem}/>
                            <div className={props.cart.length ? "Cart-sum" : ''}>
                                {props.cart.length ? <><span>Итого</span><span>{ `${getSum(props.cart)} ₽`}</span></> : <div className="Cart-empty">Корзина пуста</div>}
                            </div>
                        </div>                      
                    </div>
                </div>             
            </div>           
        </div>
    )
}

Cart.propTypes = {
    openModal: PropTypes.func,
    cart: PropTypes.array
};

export default React.memo(Cart)