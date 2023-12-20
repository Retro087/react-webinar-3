import React from "react";
import { Link } from "react-router-dom";
import './style.css'
import PropTypes from 'prop-types';

function UserShort(props) {
    return(
        <div className="UserShort">
            {props.isAuth ? 
            <div>
                <Link className="link" to={'/profile'}>{props.name}</Link>
                <button className="btn" onClick={() => props.logout()}>Выход</button>
            </div>
            :<Link to={'/login'}><button>Вход</button></Link>}
      </div>
    )
}

UserShort.propTypes = {
    isAuth: PropTypes.bool,
    name: PropTypes.string,
    logout: PropTypes.func
  };
  
UserShort.defaultProps = {
}

export default React.memo(UserShort)