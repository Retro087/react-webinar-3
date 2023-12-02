import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import CartShort from "../cart-short";

function Controls(props) {
  return (
    <div className='Controls'>
      <CartShort totalPrice={props.totalPrice} openModal={props.openModal} cart={props.cart}/>
    </div>
  )
}

Controls.propTypes = {
  openModal: PropTypes.func,
  cart: PropTypes.array,
  totalPrice: PropTypes.number
};

Controls.defaultProps = {
  openModal: () => {}
}

export default React.memo(Controls);
