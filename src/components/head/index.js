import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import { Link } from "react-router-dom";

function Head({title, children}) {
  return (
      <div className='Head'>
        <div className='Head-place'>
          <h1>{title}</h1>
        </div>
        <div className='Head-place'>{children}</div>
      </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

export default memo(Head);
