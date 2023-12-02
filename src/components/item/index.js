import React, {useState} from "react";
import PropTypes from "prop-types";
import {formatPrice, plural} from "../../utils";
import './style.css';

function Item(props) {

  const callbacks = {
    onAdd: (e) => {
      e.stopPropagation();
      props.onAddItem(props.item.code);
    },
    deleteItem: (e) => {
      e.stopPropagation();
      props.deleteItem(props.item.code);
    },
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className="Item-price">
        {`${formatPrice(props.item.price)}`}
      </div>
      {props.item.quantity 
      ? <div className='Item-quantity'>
          {`${props.item.quantity} шт`}
        </div>
      : ''
      }
      
      <div className='Item-actions'>
        {props.deleteItem ? 
          <button onClick={callbacks.deleteItem}>
            Удалить
          </button>
          :
          <button onClick={callbacks.onAdd}>
            Добавить
          </button>}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  }).isRequired,
  onAddItem: PropTypes.func,
  deleteItem: PropTypes.func,
};

Item.defaultProps = {
  onAddItem: () => {
  },
}

export default React.memo(Item);
