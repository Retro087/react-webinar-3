import React from "react";
import { Link } from "react-router-dom";
import './style.css'
import { translater } from "../../utils";
import PropTypes from 'prop-types';

function Menu({lang}){
    return(
        <Link to='/' className={'home'}>{translater('Главная', lang)}</Link>
    )
}

Menu.propTypes = {
    lang: PropTypes.string
}

export default React.memo(Menu)