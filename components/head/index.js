import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head(props) {

  return (
    <div className='Head'>
      <h1>{props.title}</h1>
      {props.openModal ? <div className="Head-btn"><button onClick={() => props.openModal()}>Закрыть</button></div> : ''}   
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  openModal: PropTypes.func
};

export default React.memo(Head);
