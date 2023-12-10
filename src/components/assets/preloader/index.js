import React from "react";
import './style.css'
import { translater } from "../../../utils";
import { PropTypes } from "prop-types"

function Preloader ({lang}){
    return(
        <div className="loader">{translater('Загрузка', lang)}...</div>
    )
}

Preloader.propTypes = {
    lang: PropTypes.string
}

export default Preloader